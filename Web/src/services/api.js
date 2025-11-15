import axios from 'axios'

// Configuração base do axios
const api = axios.create({
  baseURL: 'https://proweb.leoproti.com.br',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 Fazendo request para: ${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response recebido de: ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('❌ Erro na API:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default api