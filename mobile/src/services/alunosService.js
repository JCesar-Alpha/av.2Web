import api from './api';

// Dados mock para fallback
const mockAlunos = [
  {
    id: 1,
    nome: "João Silva",
    turma: "101",
    curso: "CC",
    matricula: "202451060001"
  },
  {
    id: 2,
    nome: "Maria Santos",
    turma: "102",
    curso: "ES",
    matricula: "202451060002"
  },
  {
    id: 3,
    nome: "Pedro Oliveira",
    turma: "101",
    curso: "SI",
    matricula: "202451060003"
  },
  {
    id: 4,
    nome: "Ana Costa",
    turma: "103",
    curso: "ADM",
    matricula: "202451060004"
  },
  {
    id: 5,
    nome: "Carlos Lima",
    turma: "102",
    curso: "DG",
    matricula: "202451060005"
  }
];

export const alunosService = {
  getAll: async () => {
    try {
      const response = await api.get('/alunos');
      return response.data;
    } catch (error) {
      console.warn('🔄 Mobile - API indisponível, usando dados mock:', error.message);
      return mockAlunos;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/alunos/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`🔄 Mobile - API indisponível para aluno ${id}, usando dados mock:`, error.message);
      const mockAluno = mockAlunos.find(aluno => aluno.id == id);
      if (mockAluno) {
        return mockAluno;
      }
      throw new Error(`Aluno ${id} não encontrado`);
    }
  },

  create: async (alunoData) => {
    try {
      const response = await api.post('/alunos', alunoData);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao criar aluno: ${error.message}`);
    }
  },

  update: async (id, alunoData) => {
    try {
      const response = await api.put(`/alunos/${id}`, alunoData);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao atualizar aluno ${id}: ${error.message}`);
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/alunos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao deletar aluno ${id}: ${error.message}`);
    }
  }
};

export default alunosService;