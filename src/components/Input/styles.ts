import styled from 'styled-components'

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width:100%;
  color: #F4EDE8;

  &::placeholder {
    color: #666360;
  }

  & + input {
    margin-top: 8px;
  }
`
