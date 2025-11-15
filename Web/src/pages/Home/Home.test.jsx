import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from './Home'

// Mock do hook useAlunos
vi.mock('../../hooks/useAlunos', () => ({
  default: vi.fn()
}))

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Home Page', () => {
  test('shows loading state', () => {
    useAlunos.mockReturnValue({ 
      alunos: [], 
      loading: true, 
      error: null 
    })
    
    renderWithRouter(<Home />)
    
    expect(screen.getByText('Carregando alunos...')).toBeInTheDocument()
  })

  test('shows error state', () => {
    useAlunos.mockReturnValue({ 
      alunos: [], 
      loading: false, 
      error: { message: 'Erro de rede' } 
    })
    
    renderWithRouter(<Home />)
    
    expect(screen.getByText(/erro ao carregar alunos/i)).toBeInTheDocument()
  })

  test('shows empty state', () => {
    useAlunos.mockReturnValue({ 
      alunos: [], 
      loading: false, 
      error: null 
    })
    
    renderWithRouter(<Home />)
    
    expect(screen.getByText('Nenhum aluno encontrado.')).toBeInTheDocument()
  })
})