import { useState, useEffect } from 'react'
import alunosService from '../services/alunosService'

const useAlunoDetails = (id) => {
  const [aluno, setAluno] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAluno = async (alunoId) => {
    if (!alunoId) return

    try {
      setLoading(true)
      setError(null)
      const data = await alunosService.getById(alunoId)
      setAluno(data)
    } catch (err) {
      setError(err)
      console.error('Erro no hook useAlunoDetails:', err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchAluno(id)
  }

  useEffect(() => {
    if (id) {
      fetchAluno(id)
    }
  }, [id])

  return {
    aluno,
    loading,
    error,
    refetch
  }
}

export default useAlunoDetails