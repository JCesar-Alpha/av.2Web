import React, { useState, useEffect } from 'react'
import {
  Table,
  Button,
  Badge,
  Alert,
  Card,
  Row,
  Col,
  Form,
  InputGroup,
  Spinner,
  Modal
} from 'react-bootstrap'
import { alunosService } from '../../services/alunosService.js'
import AlunoModal from '../AlunoModal/AlunoModal.jsx'
import Loading from '../Loading/Loading.jsx'

const AlunosTable = () => {
  const [alunos, setAlunos] = useState([])
  const [filteredAlunos, setFilteredAlunos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')

  // Estados do modal
  const [showModal, setShowModal] = useState(false)
  const [editingAluno, setEditingAluno] = useState(null)
  const [modalLoading, setModalLoading] = useState(false)

  // Estado do modal de confirmação de exclusão
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletingAluno, setDeletingAluno] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  // Carregar alunos
  const loadAlunos = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await alunosService.getAll()
      setAlunos(data)
      setFilteredAlunos(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Efeito inicial
  useEffect(() => {
    loadAlunos()
  }, [])  // Filtrar alunos
  useEffect(() => {
    let filtered = alunos

    // Filtro por nome, curso ou matrícula
    if (searchTerm) {
      filtered = filtered.filter(aluno =>
        aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aluno.curso.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aluno.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aluno.turma.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }    // Filtro por curso (removido filtro por status já que não existe mais)
    if (statusFilter !== 'todos') {
      filtered = filtered.filter(aluno => aluno.curso === statusFilter)
    }

    setFilteredAlunos(filtered)
  }, [alunos, searchTerm, statusFilter])

  // Abrir modal para novo aluno
  const handleNewAluno = () => {
    setEditingAluno(null)
    setShowModal(true)
  }

  // Abrir modal para editar aluno
  const handleEditAluno = (aluno) => {
    setEditingAluno(aluno)
    setShowModal(true)
  }

  // Salvar aluno (criar ou atualizar)
  const handleSaveAluno = async (alunoData) => {
    setModalLoading(true)
    try {
      let savedAluno
      if (editingAluno) {
        // Atualizar
        savedAluno = await alunosService.update(editingAluno.id, alunoData)
        setAlunos(prev => prev.map(a => a.id === editingAluno.id ? savedAluno : a))
      } else {
        // Criar
        savedAluno = await alunosService.create(alunoData)
        setAlunos(prev => [...prev, savedAluno])
      }
      setShowModal(false)
      setEditingAluno(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setModalLoading(false)
    }
  }

  // Abrir modal de confirmação de exclusão
  const handleDeleteAluno = (aluno) => {
    setDeletingAluno(aluno)
    setShowDeleteModal(true)
  }

  // Confirmar exclusão
  const handleConfirmDelete = async () => {
    if (!deletingAluno) return

    setDeleteLoading(true)
    try {
      await alunosService.delete(deletingAluno.id)
      setAlunos(prev => prev.filter(a => a.id !== deletingAluno.id))
      setShowDeleteModal(false)
      setDeletingAluno(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setDeleteLoading(false)
    }
  }



  // Função para obter o nome completo do curso
  const getCursoNome = (codigo) => {
    const cursos = {
      'CC': 'Ciência da Computação',
      'ES': 'Engenharia de Software',
      'SI': 'Sistemas de Informação',
      'ADM': 'Administração',
      'DG': 'Design Gráfico'
    }
    return cursos[codigo] || codigo
  }

  // Função para obter a cor do badge do curso
  const getCursoBadgeColor = (codigo) => {
    const cores = {
      'CC': 'primary',
      'ES': 'success',
      'SI': 'info',
      'ADM': 'warning',
      'DG': 'danger'
    }
    return cores[codigo] || 'secondary'
  }

  if (loading && alunos.length === 0) {
    return <Loading message="Carregando alunos..." />
  }

  return (
    <div>
      {/* Cabeçalho */}
      <Row className="mb-4">
        <Col>
          <h1>Gerenciamento de Alunos</h1>
          <p className="text-muted">
            Gerencie os alunos cadastrados no sistema
          </p>
        </Col>
      </Row>

      {/* Filtros e Ações */}
      <Card className="mb-4">
        <Card.Body>
          <Row className="align-items-end">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Buscar</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Nome, curso, turma ou matrícula..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <InputGroup.Text>
                    🔍
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Curso</Form.Label>
                <Form.Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="todos">Todos os Cursos</option>
                  <option value="CC">Ciência da Computação</option>
                  <option value="ES">Engenharia de Software</option>
                  <option value="SI">Sistemas de Informação</option>
                  <option value="ADM">Administração</option>
                  <option value="DG">Design Gráfico</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={3}>
              <div className="d-flex gap-2">
                <Button
                  variant="primary"
                  onClick={handleNewAluno}
                  className="flex-grow-1"
                >
                  ➕ Novo Aluno
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={loadAlunos}
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : '🔄'}
                </Button>
              </div>
            </Col>

            <Col md={2}>
              <div className="text-end">
                <Badge bg="info" pill className="fs-6">
                  {filteredAlunos.length} aluno{filteredAlunos.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Mensagem de erro */}
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          <Alert.Heading>Erro</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}

      {/* Tabela */}
      <Card>
        <Card.Body className="p-0">
          {filteredAlunos.length === 0 ? (
            <div className="text-center p-5">
              <h5 className="text-muted">Nenhum aluno encontrado</h5>
              <p className="text-muted">
                {searchTerm || statusFilter !== 'todos'
                  ? 'Tente alterar os filtros de busca'
                  : 'Clique em "Novo Aluno" para começar'
                }
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <Table striped hover responsive className="mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Matrícula</th>
                    <th>Turma</th>
                    <th>Curso</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAlunos.map(aluno => (
                    <tr key={aluno.id}>
                      <td>
                        <Badge bg="secondary">#{aluno.id}</Badge>
                      </td>
                      <td>
                        <strong>{aluno.nome}</strong>
                      </td>
                      <td>
                        <code className="bg-light px-2 py-1 rounded">
                          {aluno.matricula}
                        </code>
                      </td>
                      <td>
                        <Badge bg="info" pill>
                          Turma {aluno.turma}
                        </Badge>
                      </td>
                      <td>
                        <Badge
                          bg={getCursoBadgeColor(aluno.curso)}
                          pill
                        >
                          {getCursoNome(aluno.curso)}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEditAluno(aluno)}
                            title="Editar aluno"
                          >
                            ✏️
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteAluno(aluno)}
                            title="Excluir aluno"
                          >
                            🗑️
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Modal de Formulário */}
      <AlunoModal
        show={showModal}
        onHide={() => {
          setShowModal(false)
          setEditingAluno(null)
        }}
        onSave={handleSaveAluno}
        aluno={editingAluno}
        loading={modalLoading}
        title="Aluno"
      />

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        show={showDeleteModal}
        onHide={() => {
          if (!deleteLoading) {
            setShowDeleteModal(false)
            setDeletingAluno(null)
          }
        }}
        backdrop="static"
      >
        <Modal.Header closeButton={!deleteLoading}>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deletingAluno && (
            <div>
              <p>Tem certeza de que deseja excluir o aluno:</p>
              <div className="bg-light p-3 rounded">
                <strong>{deletingAluno.nome}</strong><br />
                <span className="text-muted">Matrícula: {deletingAluno.matricula}</span><br />
                <span className="text-muted">Curso: {getCursoNome(deletingAluno.curso)}</span>
              </div>
              <Alert variant="warning" className="mt-3 mb-0">
                <strong>Atenção:</strong> Esta ação não pode ser desfeita.
              </Alert>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowDeleteModal(false)
              setDeletingAluno(null)
            }}
            disabled={deleteLoading}
          >
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <>
                <Spinner size="sm" className="me-2" />
                Excluindo...
              </>
            ) : (
              'Excluir'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AlunosTable