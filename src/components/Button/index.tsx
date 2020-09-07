import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = (props) => {

  return (
    <Container>
      <button {...props}>teste b</button>
    </Container>
  )
}

export default Button
