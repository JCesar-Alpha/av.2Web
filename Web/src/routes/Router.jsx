import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout/Layout.jsx'
import Home from '../pages/Home/Home.jsx'
import AlunoDetails from '../pages/AlunoDetails/AlunoDetails.jsx'
import NotFound from '../pages/NotFound/NotFound.jsx'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="aluno/:id" element={<AlunoDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default Router