import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { useAuth } from '../../hooks/Auth'
import { useToast } from '../../hooks/Toast'

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, AnimationContainer, Background } from './styles';

interface SingInData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  // const { signIn, user } = useAuth()
  const { signIn } = useAuth()
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(async (data: SingInData) => {
    try {
      formRef.current?.setErrors({})

      const schemaValidation = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email(),
        password: Yup.string().required('Senha obrigatório')
      })

      await schemaValidation.validate(data, {
        abortEarly: false
      })

      await signIn({
        email: data.email,
        password: data.password
      })

      history.push('/dashboard')

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
        title: 'Falha no LogIn',
        description: error.message
      })
    }
  }, [signIn, addToast])

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Logo GoBarber" />
          {/* {user && user['name']} */}
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
          // initialData={{ email: 'lucas.fe.pelle@gmail.coma', password: '123' }}
          >
            <h1>Faça seu logon</h1>

            <Input name="email" icon={FiMail} placeholder="E-Mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

            <Button type="submit">Entrar</Button>

            <a href="/forgot">Esqueci minha senha</a>
          </Form>

          <Link to="/register">
            <FiLogIn />
            Criar Conta
        </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>);
}

export default SignIn;
