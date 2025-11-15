import React from 'react'
import { Card, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AlunoCard = ({ aluno }) => {
  const { id, nome, email, telefone, ativo } = aluno

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="h5">{nome}</Card.Title>
          <Badge bg={ativo ? 'success' : 'secondary'}>
            {ativo ? 'Ativo' : 'Inativo'}
          </Badge>
        </div>
        
        <Card.Text className="text-muted flex-grow-1">
          <strong>Email:</strong> {email || 'Não informado'}
          <br />
          <strong>Telefone:</strong> {telefone || 'Não informado'}
        </Card.Text>
        
        <Button 
          as={Link} 
          to={`/aluno/${id}`}
          variant="outline-primary" 
          size="sm"
          className="mt-auto"
        >
          Ver Detalhes
        </Button>
      </Card.Body>
    </Card>
  )
}

export default AlunoCard