import { describe, test, expect, vi } from 'vitest'
import axios from 'axios'
import { getAlunos, getAlunoById } from './alunosService'

// Mock do axios
vi.mock('axios')

describe('alunosService', () => {
  test('getAlunos should return alunos data', async () => {
    const mockAlunos = [
      { id: 1, nome: 'João Silva', email: 'joao@email.com' }
    ]
    
    axios.get.mockResolvedValue({ data: mockAlunos })

    const alunos = await getAlunos()
    
    expect(alunos).toEqual(mockAlunos)
    expect(axios.get).toHaveBeenCalledWith('https://proweb.leoproti.com.br/api/alunos')
  })

  test('getAlunoById should return specific aluno', async () => {
    const mockAluno = { id: 1, nome: 'João Silva' }
    
    axios.get.mockResolvedValue({ data: mockAluno })

    const aluno = await getAlunoById(1)
    
    expect(aluno).toEqual(mockAluno)
    expect(axios.get).toHaveBeenCalledWith('https://proweb.leoproti.com.br/api/alunos/1')
  })
})