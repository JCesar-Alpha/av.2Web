import { useState, useEffect } from 'react'
import alunosService from '../services/alunosService'

const useAlunos = () => {
  const [alunos, setAlunos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAlunos = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await alunosService.getAll()
      setAlunos(data)
    } catch (err) {
      setError(err)
      console.error('Erro no hook useAlunos:', err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchAlunos()
  }

  useEffect(() => {
    fetchAlunos()
  }, [])

  return {
    alunos,
    loading,
    error,
    refetch
  }
}

export default useAlunos