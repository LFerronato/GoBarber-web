import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import api from '../../services/api'

import getValidationErrors from '../../utils/getValidationErrors';

import { useToast } from '../../hooks/Toast'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, AnimatedContainer, Background } from './styles';

interface SignUpData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(async (data: SignUpData) => {
    try {
      formRef.current?.setErrors({})
      const schemaValidation = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email(),
        password: Yup.string().min(6, 'no mínimo 6 dígitos')
      })
      await schemaValidation.validate(data, {
        abortEarly: false
      })

      await api.post('/users', data)

      history.push('/')

      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Você já pode fazer seu logon'
      })

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        formRef.current?.setErrors(getValidationErrors(error))
        return
      }
      console.log(error);
      console.log(error.data);

      // disparar toast
      addToast({
        type: 'error',
        title: 'Falha no Cadastro',
        description: error.message
      })
    }
  }, [addToast, history])

  return (
    <Container>
      <Background />

      <Content>
        <AnimatedContainer>
          <img src={logoImg} alt="Logo GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

            <Button type="submit">Cadastrar</Button>

          </Form>

          <Link to="/">
            <FiArrowLeft />
          Voltar para login
        </Link>
        </AnimatedContainer>
      </Content>

    </Container>);
}

export default SignUp;
