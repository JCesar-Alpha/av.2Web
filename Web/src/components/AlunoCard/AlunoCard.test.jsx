import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import AlunoCard from './AlunoCard'

const mockAluno = {
  id: 1,
  nome: 'João Silva',
  email: 'joao@email.com',
  telefone: '(11) 99999-9999',
  ativo: true
}

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('AlunoCard Component', () => {
  test('renders aluno information correctly', () => {
    renderWithRouter(<AlunoCard aluno={mockAluno} />)
    
    expect(screen.getByText('João Silva')).toBeInTheDocument()
    expect(screen.getByText('joao@email.com')).toBeInTheDocument()
    expect(screen.getByText('(11) 99999-9999')).toBeInTheDocument()
    expect(screen.getByText('Ativo')).toBeInTheDocument()
  })

  test('shows inactive badge when aluno is not active', () => {
    const inactiveAluno = { ...mockAluno, ativo: false }
    renderWithRouter(<AlunoCard aluno={inactiveAluno} />)
    
    expect(screen.getByText('Inativo')).toBeInTheDocument()
  })

  test('has link to aluno details page', () => {
    renderWithRouter(<AlunoCard aluno={mockAluno} />)
    
    const link = screen.getByRole('link', { name: /ver detalhes/i })
    expect(link).toHaveAttribute('href', '/aluno/1')
  })

  test('handles missing email and phone', () => {
    const alunoWithoutContact = {
      id: 2,
      nome: 'Maria Santos',
      email: null,
      telefone: null,
      ativo: true
    }
    
    renderWithRouter(<AlunoCard aluno={alunoWithoutContact} />)
    
    expect(screen.getByText('Não informado')).toBeInTheDocument()
  })
})