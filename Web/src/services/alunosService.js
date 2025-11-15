import api from './api'

// Dados mockados para desenvolvimento (nova estrutura da API)
let mockAlunos = [
  {
    id: 1,
    nome: 'João Silva',
    turma: '101',
    curso: 'ES',
    matricula: '202451060001'
  },
  {
    id: 2,
    nome: 'Maria Santos',
    turma: '102',
    curso: 'CC',
    matricula: '202451060002'
  },
  {
    id: 3,
    nome: 'Pedro Oliveira',
    turma: '103',
    curso: 'SI',
    matricula: '202451060003'
  },
  {
    id: 4,
    nome: 'Ana Costa',
    turma: '104',
    curso: 'DG',
    matricula: '202451060004'
  },
  {
    id: 5,
    nome: 'Carlos Lima',
    turma: '105',
    curso: 'ADM',
    matricula: '202451060005'
  }
]

// Serviços para Alunos
export const alunosService = {
  // Buscar todos os alunos
  getAll: async () => {
    try {
      const response = await api.get('/alunos')
      return response.data
    } catch (error) {
      console.error('Erro ao buscar alunos:', error)
      // Fallback para dados mockados em caso de erro
      await new Promise(resolve => setTimeout(resolve, 500))
      return [...mockAlunos]
    }
  },

  // Buscar aluno por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/alunos/${id}`)
      return response.data
    } catch (error) {
      console.warn('API não disponível, usando dados mockados')
      await new Promise(resolve => setTimeout(resolve, 300))
      const aluno = mockAlunos.find(a => a.id == id)
      if (!aluno) {
        throw new Error('Aluno não encontrado')
      }
      return aluno
    }
  },

  // Criar novo aluno
  create: async (alunoData) => {
    try {
      const response = await api.post('/alunos', alunoData)
      return response.data
    } catch (error) {
      console.warn('API não disponível, usando dados mockados')
      await new Promise(resolve => setTimeout(resolve, 400))
      const newId = Math.max(...mockAlunos.map(a => a.id)) + 1
      const newAluno = {
        id: newId,
        ...alunoData
      }
      mockAlunos.push(newAluno)
      return newAluno
    }
  },

  // Atualizar aluno
  update: async (id, alunoData) => {
    try {
      const response = await api.put(`/alunos/${id}`, alunoData)
      return response.data
    } catch (error) {
      console.warn('API não disponível, usando dados mockados')
      await new Promise(resolve => setTimeout(resolve, 400))
      const index = mockAlunos.findIndex(a => a.id == id)
      if (index === -1) {
        throw new Error('Aluno não encontrado')
      }
      const updatedAluno = {
        ...mockAlunos[index],
        ...alunoData,
        id: parseInt(id)
      }
      mockAlunos[index] = updatedAluno
      return updatedAluno
    }
  },

  // Deletar aluno
  delete: async (id) => {
    try {
      const response = await api.delete(`/alunos/${id}`)
      return response.data
    } catch (error) {
      console.warn('API não disponível, usando dados mockados')
      await new Promise(resolve => setTimeout(resolve, 300))
      const index = mockAlunos.findIndex(a => a.id == id)
      if (index === -1) {
        throw new Error('Aluno não encontrado')
      }
      mockAlunos.splice(index, 1)
      return { success: true, message: 'Aluno removido com sucesso' }
    }
  }
}

export default alunosService