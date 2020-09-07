import { ValidationError } from 'yup'

interface ErrorResponse {
  [key: string]: string
}

export default function getValidationErrors(err: ValidationError): ErrorResponse {
  const validationErrors: ErrorResponse = {}

  err.inner.forEach(e => {
    validationErrors[e.path] = e.message
  })

  return validationErrors
}
