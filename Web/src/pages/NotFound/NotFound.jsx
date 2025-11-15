import React from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button } from 'react-bootstrap'

const NotFound = () => {
  return (
    <div className="text-center">
      <Alert variant="warning" className="py-5">
        <h1>404 - Página Não Encontrada</h1>
        <p className="lead mb-4">
          A página que você está procurando não existe.
        </p>
        <Button as={Link} to="/" variant="primary" size="lg">
          Voltar para a Página Inicial
        </Button>
      </Alert>
    </div>
  )
}

export default NotFound