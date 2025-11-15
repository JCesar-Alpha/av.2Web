import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, Button, Row, Col, Badge, Alert } from 'react-bootstrap'
import Loading from '../../components/Loading/Loading.jsx'
import useAlunoDetails from '../../hooks/useAlunosDetails.js'

const AlunoDetails = () => {
  const { id } = useParams()
  const { aluno, loading, error } = useAlunoDetails(id)

  if (loading) return <Loading message="Carregando dados do aluno..." />

  if (error) return (
    <Alert variant="danger">
      <Alert.Heading>Erro ao carregar aluno</Alert.Heading>
      <p>{error.message}</p>
      <Button as={Link} to="/" variant="outline-danger">
        Voltar para lista
      </Button>
    </Alert>
  )

  if (!aluno) return (
    <Alert variant="warning">
      <Alert.Heading>Aluno não encontrado</Alert.Heading>
      <p>O aluno solicitado não existe ou foi removido.</p>
      <Button as={Link} to="/" variant="outline-warning">
        Voltar para lista
      </Button>
    </Alert>
  )

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Detalhes do Aluno</h1>
        <Button as={Link} to="/" variant="outline-primary">
          ← Voltar para lista
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">{aluno.nome}</h4>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>ID:</strong> {aluno.id}</p>
              <p><strong>Email:</strong> {aluno.email || 'Não informado'}</p>
              <p><strong>Telefone:</strong> {aluno.telefone || 'Não informado'}</p>
              <p><strong>CPF:</strong> {aluno.cpf || 'Não informado'}</p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Status:</strong>{' '}
                <Badge bg={aluno.ativo ? 'success' : 'secondary'}>
                  {aluno.ativo ? 'Ativo' : 'Inativo'}
                </Badge>
              </p>
              <p><strong>Data de Nascimento:</strong> {aluno.dataNascimento || 'Não informada'}</p>
              <p><strong>Endereço:</strong> {aluno.endereco || 'Não informado'}</p>
            </Col>
          </Row>

          {aluno.observacoes && (
            <div className="mt-3">
              <h5>Observações</h5>
              <p className="text-muted">{aluno.observacoes}</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

export default AlunoDetails