import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import NotFound from './NotFound'

// Mock do useNavigate
const mockedNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    Link: actual.Link
  }
})

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('NotFound Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders 404 error message', () => {
    renderWithRouter(<NotFound />)
    
    expect(screen.getByText('404 - Página Não Encontrada')).toBeInTheDocument()
    expect(screen.getByText(/A página que você está procurando não existe./i)).toBeInTheDocument()
  })

  test('renders back to home button', () => {
    renderWithRouter(<NotFound />)
    
    const backButton = screen.getByRole('link', { name: /voltar para a página inicial/i })
    expect(backButton).toBeInTheDocument()
    expect(backButton).toHaveAttribute('href', '/')
  })

  test('has correct alert styling', () => {
    renderWithRouter(<NotFound />)
    
    const alert = screen.getByRole('alert')
    expect(alert).toHaveClass('alert-warning')
  })

  test('has centered content', () => {
    renderWithRouter(<NotFound />)
    
    const container = screen.getByText('404 - Página Não Encontrada').closest('div')
    expect(container).toHaveClass('text-center')
  })

  test('button has correct variant and size', () => {
    renderWithRouter(<NotFound />)
    
    const button = screen.getByRole('link', { name: /voltar para a página inicial/i })
    expect(button).toHaveClass('btn-primary')
    expect(button).toHaveClass('btn-lg')
  })

  test('matches snapshot', () => {
    const { container } = renderWithRouter(<NotFound />)
    expect(container).toMatchSnapshot()
  })
})