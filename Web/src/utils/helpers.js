// Formatar data para exibição
export const formatDate = (dateString) => {
  if (!dateString) return 'Não informada'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR')
  } catch (error) {
    return dateString
  }
}

// Formatar telefone
export const formatPhone = (phone) => {
  if (!phone) return 'Não informado'
  
  // Remove caracteres não numéricos
  const cleaned = phone.replace(/\D/g, '')
  
  // Formata conforme o tamanho
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }
  
  return phone
}

// Validar email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}