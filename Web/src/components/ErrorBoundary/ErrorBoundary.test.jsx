import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ErrorBoundary from './ErrorBoundary'

// Componente que lança erro para testar o ErrorBoundary
const ThrowError = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>Componente normal</div>
}

// Suprime console.error durante os testes que esperam erros
const originalError = console.error
beforeAll(() => {
  console.error = vi.fn()
})

afterAll(() => {
  console.error = originalError
})

describe('ErrorBoundary Component', () => {
  test('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Componente normal')).toBeInTheDocument()
    expect(screen.queryByText('Algo deu errado!')).not.toBeInTheDocument()
  })

  test('renders error message when child throws error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Algo deu errado!')).toBeInTheDocument()
    expect(screen.getByText(/Ocorreu um erro inesperado na aplicação./i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /tentar novamente/i })).toBeInTheDocument()
  })

  test('resets error state when try again button is clicked', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    // Verifica que o erro está sendo mostrado
    expect(screen.getByText('Algo deu errado!')).toBeInTheDocument()

    // Clica no botão "Tentar novamente"
    const tryAgainButton = screen.getByRole('button', { name: /tentar novamente/i })
    fireEvent.click(tryAgainButton)

    // Re-renderiza com um componente que não lança erro
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )

    // Verifica que o conteúdo normal é mostrado novamente
    expect(screen.getByText('Componente normal')).toBeInTheDocument()
    expect(screen.queryByText('Algo deu errado!')).not.toBeInTheDocument()
  })

  test('displays alert with danger variant', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('alert-danger')
  })

  test('button has outline-danger variant', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const button = screen.getByRole('button', { name: /tentar novamente/i })
    expect(button).toHaveClass('btn-outline-danger')
  })

  test('logs error to console', () => {
    const consoleSpy = vi.spyOn(console, 'error')
    
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(consoleSpy).toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  test('matches snapshot when error occurs', () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )
    expect(container).toMatchSnapshot()
  })

  test('matches snapshot when no error', () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    )
    expect(container).toMatchSnapshot()
  })
})