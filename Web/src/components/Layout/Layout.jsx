import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link, useLocation, Outlet } from 'react-router-dom'

const Layout = () => {
  const location = useLocation()

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">
            🎓 Sistema Educacional
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                as={Link}
                to="/"
                active={location.pathname === '/'}
              >
                Lista de Alunos
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main>
        <Outlet />
      </main>

      <footer className="mt-5 py-4 bg-light text-center">
        <Container>
          <p className="mb-0 text-muted">
            Desenvolvido para estudo de caso - {new Date().getFullYear()}
          </p>
        </Container>
      </footer>
    </>
  )
}

export default Layout