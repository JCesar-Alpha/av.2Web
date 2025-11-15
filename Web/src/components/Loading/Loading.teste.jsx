import { render, screen } from '@testing-library/react'
import Loading from './Loading'

describe('Loading Component', () => {
  test('renders with default message', () => {
    render(<Loading />)
    
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  test('renders with custom message', () => {
    const customMessage = 'Buscando alunos...'
    render(<Loading message={customMessage} />)
    
    expect(screen.getByText(customMessage)).toBeInTheDocument()
  })

  test('has spinner with correct attributes', () => {
    render(<Loading />)
    
    const spinner = screen.getByRole('status')
    expect(spinner).toHaveClass('spinner-border')
    expect(spinner).toHaveAttribute('role', 'status')
  })
})