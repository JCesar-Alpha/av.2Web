import React from 'react'
import { Alert, Button } from 'react-bootstrap'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary capturou um erro:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="danger" className="m-3">
          <Alert.Heading>Algo deu errado!</Alert.Heading>
          <p>Ocorreu um erro inesperado na aplicação.</p>
          <Button 
            variant="outline-danger" 
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Tentar novamente
          </Button>
        </Alert>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary