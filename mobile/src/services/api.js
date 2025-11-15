import axios from 'axios';

const api = axios.create({
  baseURL: 'https://proweb.leoproti.com.br',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(`🔄 Mobile - Fazendo request para: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ Mobile - Response recebido de: ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Mobile - Erro na API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;