import React from 'react'
import { api } from '../utils/api'

type Props = {}

const testemail = (props: Props) => {
  const mutation = api.email.testEmail.useMutation()
  const handleClick = () => {
    mutation.mutate()
  }

  return (
    <button onClick={handleClick}>Click to send test email</button>
  )
}

export default testemail