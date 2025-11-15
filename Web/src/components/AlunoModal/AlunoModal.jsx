import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap'

const AlunoModal = ({
  show,
  onHide,
  onSave,
  aluno = null,
  loading = false,
  title = "Aluno"
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    turma: '',
    curso: '',
    matricula: ''
  })
  const [errors, setErrors] = useState({})

  // Atualizar form quando aluno mudar
  useEffect(() => {
    if (aluno) {
      setFormData({
        nome: aluno.nome || '',
        turma: aluno.turma || '',
        curso: aluno.curso || '',
        matricula: aluno.matricula || ''
      })
    } else {
      setFormData({
        nome: '',
        turma: '',
        curso: '',
        matricula: ''
      })
    }
    setErrors({})
  }, [aluno])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpar erro do campo alterado
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }

    if (!formData.turma.trim()) {
      newErrors.turma = 'Turma é obrigatória'
    }

    if (!formData.curso.trim()) {
      newErrors.curso = 'Curso é obrigatório'
    }

    if (!formData.matricula.trim()) {
      newErrors.matricula = 'Matrícula é obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }

  const handleClose = () => {
    setFormData({
      nome: '',
      turma: '',
      curso: '',
      matricula: ''
    })
    setErrors({})
    onHide()
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {aluno ? `Editar ${title}` : `Novo ${title}`}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nome <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  isInvalid={!!errors.nome}
                  placeholder="Digite o nome completo"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nome}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Matrícula <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="matricula"
                  value={formData.matricula}
                  onChange={handleChange}
                  isInvalid={!!errors.matricula}
                  placeholder="202451060708"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.matricula}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Turma <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="turma"
                  value={formData.turma}
                  onChange={handleChange}
                  isInvalid={!!errors.turma}
                  placeholder="101"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.turma}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Curso <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  name="curso"
                  value={formData.curso}
                  onChange={handleChange}
                  isInvalid={!!errors.curso}
                >
                  <option value="">Selecione um curso</option>
                  <option value="CC">Ciência da Computação</option>
                  <option value="ES">Engenharia de Software</option>
                  <option value="SI">Sistemas de Informação</option>
                  <option value="ADM">Administração</option>
                  <option value="DG">Design Gráfico</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.curso}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>          {Object.keys(errors).length > 0 && (
            <Alert variant="danger" className="mt-3">
              <Alert.Heading>Erro no formulário</Alert.Heading>
              <p>Por favor, corrija os campos destacados acima.</p>
            </Alert>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Salvando...
              </>
            ) : (
              aluno ? 'Atualizar' : 'Criar'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AlunoModal