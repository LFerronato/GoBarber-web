import React, { InputHTMLAttributes } from 'react'

import { Container } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

const Input: React.FC<InputProps> = ({ name, ...props }) => {

  return (
    <Container>
      <input {...props}>teste</input>
    </Container>
  )
}

export default Input
