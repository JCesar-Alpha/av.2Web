import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './Layout'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Layout Component', () => {
  test('renders navbar with brand and navigation', () => {
    renderWithRouter(<Layout>Conteúdo</Layout>)
    
    expect(screen.getByText('🎓 Sistema Educacional')).toBeInTheDocument()
    expect(screen.getByText('Lista de Alunos')).toBeInTheDocument()
  })

  test('renders children content', () => {
    renderWithRouter(<Layout><div>Conteúdo específico</div></Layout>)
    
    expect(screen.getByText('Conteúdo específico')).toBeInTheDocument()
  })

  test('renders footer with current year', () => {
    renderWithRouter(<Layout>Conteúdo</Layout>)
    
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(`Desenvolvido para estudo de caso - ${currentYear}`)).toBeInTheDocument()
  })
})