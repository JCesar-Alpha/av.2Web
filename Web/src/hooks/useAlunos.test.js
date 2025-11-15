import { renderHook, waitFor } from '@testing-library/react'
import useAlunos from './useAlunos'
import alunosService from '../services/alunosService'

// Mock do serviço
vi.mock('../services/alunosService')

describe('useAlunos Hook', () => {
  test('should fetch alunos on mount', async () => {
    const mockAlunos = [
      { id: 1, nome: 'João Silva', email: 'joao@email.com', ativo: true }
    ]
    
    alunosService.getAll.mockResolvedValue(mockAlunos)

    const { result } = renderHook(() => useAlunos())

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.alunos).toEqual(mockAlunos)
    expect(result.current.error).toBeNull()
  })

  test('should handle error state', async () => {
    const mockError = new Error('Erro de rede')
    alunosService.getAll.mockRejectedValue(mockError)

    const { result } = renderHook(() => useAlunos())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.alunos).toEqual([])
    expect(result.current.error).toEqual(mockError)
  })
})