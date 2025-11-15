import { renderHook, waitFor } from '@testing-library/react'
import useAlunoDetails from './useAlunoDetails'
import alunosService from '../services/alunosService'

// Mock do serviço
vi.mock('../services/alunosService')

describe('useAlunoDetails Hook', () => {
  const mockAluno = {
    id: 1,
    nome: 'João Silva',
    email: 'joao@email.com',
    telefone: '(11) 99999-9999',
    ativo: true,
    dataNascimento: '2000-01-01',
    endereco: 'Rua das Flores, 123'
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should fetch aluno details when id is provided', async () => {
    alunosService.getById.mockResolvedValue(mockAluno)

    const { result } = renderHook(() => useAlunoDetails('1'))

    expect(result.current.loading).toBe(true)
    expect(result.current.aluno).toBeNull()

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.aluno).toEqual(mockAluno)
    expect(result.current.error).toBeNull()
    expect(alunosService.getById).toHaveBeenCalledWith('1')
  })

  test('should not fetch when id is not provided', () => {
    const { result } = renderHook(() => useAlunoDetails(null))

    expect(result.current.loading).toBe(true)
    expect(result.current.aluno).toBeNull()
    expect(alunosService.getById).not.toHaveBeenCalled()
  })

  test('should handle error state', async () => {
    const mockError = new Error('Aluno não encontrado')
    alunosService.getById.mockRejectedValue(mockError)

    const { result } = renderHook(() => useAlunoDetails('999'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.aluno).toBeNull()
    expect(result.current.error).toEqual(mockError)
  })

  test('should refetch data when refetch is called', async () => {
    alunosService.getById.mockResolvedValue(mockAluno)

    const { result } = renderHook(() => useAlunoDetails('1'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Chamar refetch
    result.current.refetch()

    expect(alunosService.getById).toHaveBeenCalledTimes(2)
  })

  test('should update when id changes', async () => {
    const mockAluno2 = {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria@email.com',
      ativo: true
    }

    alunosService.getById
      .mockResolvedValueOnce(mockAluno)
      .mockResolvedValueOnce(mockAluno2)

    const { result, rerender } = renderHook(
      ({ id }) => useAlunoDetails(id),
      { initialProps: { id: '1' } }
    )

    await waitFor(() => {
      expect(result.current.aluno).toEqual(mockAluno)
    })

    // Mudar o ID
    rerender({ id: '2' })

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.aluno).toEqual(mockAluno2)
    })

    expect(alunosService.getById).toHaveBeenCalledWith('2')
  })
})