import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = ({ message = 'Carregando...' }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4">
      <Spinner animation="border" role="status" variant="primary" />
      <span className="mt-2 text-muted">{message}</span>
    </div>
  )
}

export default Loading