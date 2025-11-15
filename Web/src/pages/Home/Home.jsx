import React from 'react'
import { Container } from 'react-bootstrap'
import AlunosTable from '../../components/AlunosTable/AlunosTable.jsx'

const Home = () => {
  return (
    <Container fluid className="py-4">
      <AlunosTable />
    </Container>
  )
}

export default Home