# Sistema Educacional Web 🎓

Uma aplicação web moderna desenvolvida em React com Vite para gerenciamento completo de alunos, incluindo operações CRUD (Create, Read, Update, Delete).

## 📋 Descrição

Esta aplicação web permite o gerenciamento completo de alunos de um sistema educacional, oferecendo uma interface moderna e intuitiva para visualizar, criar, editar e excluir registros de alunos. A aplicação consome dados de uma API REST e fornece funcionalidades avançadas de busca e filtragem.

## ✨ Funcionalidades

### 🔍 **Visualização e Busca**
- **Tabela Responsiva**: Lista todos os alunos em formato tabular
- **Busca Avançada**: Pesquise por nome, email ou curso
- **Filtros por Status**: Filtre alunos ativos e inativos
- **Informações Detalhadas**: Visualize idade, data de nascimento, contato

### ✏️ **Operações CRUD Completas**
- **➕ Criar**: Cadastre novos alunos com formulário validado
- **📖 Visualizar**: Veja detalhes completos de cada aluno
- **✏️ Editar**: Atualize informações existentes
- **🗑️ Excluir**: Remova alunos com confirmação de segurança

### 🎨 **Interface e UX**
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Bootstrap**: Interface moderna seguindo padrões de design
- **Estados de Loading**: Indicadores visuais durante operações
- **Tratamento de Erros**: Mensagens informativas para problemas
- **Validação de Formulários**: Validação em tempo real dos campos

## 🛠️ Tecnologias Utilizadas

### **Core Framework**
- **React** `^18.2.0` - Biblioteca JavaScript para interfaces
- **Vite** `^4.5.0` - Build tool moderna e rápida
- **React Router DOM** `^6.18.0` - Roteamento SPA

### **UI Framework**
- **Bootstrap** `^5.3.2` - Framework CSS responsivo
- **React Bootstrap** `^2.9.1` - Componentes Bootstrap para React

### **HTTP Client**
- **Axios** `^1.6.0` - Cliente HTTP para requisições à API

### **Desenvolvimento e Testes**
- **ESLint** - Linting e qualidade de código
- **Vitest** - Framework de testes
- **Testing Library** - Testes de componentes React

## 📁 Estrutura do Projeto

```
Web/
├── index.html                 # Template HTML principal
├── package.json              # Dependências e scripts
├── vite.config.js            # Configurações do Vite
├── public/                   # Arquivos estáticos
└── src/
    ├── App.jsx               # Componente raiz
    ├── main.jsx              # Ponto de entrada da aplicação
    ├── components/           # Componentes reutilizáveis
    │   ├── AlunoCard/       # Card de exibição de aluno
    │   ├── AlunoModal/      # Modal para criar/editar aluno
    │   ├── AlunosTable/     # Tabela principal com CRUD
    │   ├── ErrorBoundary/   # Tratamento de erros
    │   ├── Layout/          # Layout principal da aplicação
    │   └── Loading/         # Componente de carregamento
    ├── hooks/               # Hooks customizados
    │   ├── useAlunos.js     # Hook para gerenciar lista de alunos
    │   └── useAlunoDetails.js # Hook para detalhes do aluno
    ├── pages/               # Páginas da aplicação
    │   ├── Home/            # Página inicial com tabela
    │   ├── AlunoDetails/    # Página de detalhes (se necessário)
    │   └── NotFound/        # Página 404
    ├── routes/              # Configuração de rotas
    │   └── Router.jsx       # Roteador principal
    ├── services/            # Serviços e API
    │   ├── api.js           # Configuração do Axios
    │   └── alunosService.js # Serviços CRUD para alunos
    ├── styles/              # Estilos CSS
    │   ├── components.css   # Estilos de componentes
    │   └── globals.css      # Estilos globais
    └── utils/               # Utilitários
        ├── constants.js     # Constantes da aplicação
        └── helpers.js       # Funções auxiliares
```

## 🚀 Como Executar

### Pré-requisitos
- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**

### Passo a passo

1. **Navegue para o diretório do projeto**:
   ```bash
   cd Web
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute em modo de desenvolvimento**:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse a aplicação**:
   - Abra seu navegador e acesse: `http://localhost:3000`

### Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview da build de produção
npm run lint         # Verificação de código
npm test             # Executar testes
npm run test:ui      # Interface de testes
npm run test:coverage # Cobertura de testes
```

## 📊 Estrutura da API

A aplicação está preparada para integrar com a API REST do Swagger em:
`https://proweb.leoproti.com.br/swagger-ui/index.html`

### **Endpoints Esperados**:
```
GET    /api/alunos      # Listar todos os alunos
GET    /api/alunos/:id  # Buscar aluno por ID
POST   /api/alunos      # Criar novo aluno
PUT    /api/alunos/:id  # Atualizar aluno
DELETE /api/alunos/:id  # Excluir aluno
```

### **Estrutura de Dados do Aluno**:
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "telefone": "(11) 99999-9999",
  "dataNascimento": "1995-03-15",
  "status": "ativo",
  "curso": "Engenharia de Software"
}
```

## 🔧 Funcionalidades Detalhadas

### **Tabela de Alunos**
- ✅ Listagem completa com paginação
- ✅ Busca em tempo real por nome, email ou curso
- ✅ Filtro por status (ativo/inativo)
- ✅ Ordenação por colunas
- ✅ Cálculo automático de idade
- ✅ Links diretos para email e telefone

### **Formulário de Aluno**
- ✅ Validação em tempo real
- ✅ Campos obrigatórios marcados
- ✅ Formatação automática de dados
- ✅ Mensagens de erro específicas
- ✅ Modo criar e editar no mesmo modal

### **Operações CRUD**
- ✅ **Create**: Modal com formulário completo
- ✅ **Read**: Visualização em tabela e detalhes
- ✅ **Update**: Edição inline com modal
- ✅ **Delete**: Confirmação de segurança

## 🎨 Design e UX

### **Responsividade**
- 📱 **Mobile**: Layout otimizado para smartphones
- 📱 **Tablet**: Interface adaptada para tablets
- 💻 **Desktop**: Experiência completa para desktops

### **Cores e Tema**
- **Primary**: Bootstrap Blue (`#0d6efd`)
- **Success**: Verde para status ativo
- **Danger**: Vermelho para ações de exclusão
- **Secondary**: Cinza para elementos neutros

### **Componentes Principais**
- **Cards**: Informações organizadas
- **Modals**: Formulários e confirmações
- **Badges**: Status e indicadores
- **Buttons**: Ações e navegação
- **Tables**: Dados estruturados

## 🧪 Testes

### **Testes Implementados**
- ✅ Testes unitários de componentes
- ✅ Testes de integração de hooks
- ✅ Testes de serviços de API
- ✅ Testes de validação de formulários

### **Executar Testes**
```bash
# Testes unitários
npm test

# Testes com interface
npm run test:ui

# Cobertura de testes
npm run test:coverage
```

## 📦 Build e Deploy

### **Build para Produção**
```bash
npm run build
```

### **Preview da Build**
```bash
npm run preview
```

### **Deploy**
Os arquivos de build ficam na pasta `dist/` e podem ser hospedados em:
- **Vercel**
- **Netlify**
- **GitHub Pages**
- **Apache/Nginx**

## 🔄 Dados de Desenvolvimento

Para facilitar o desenvolvimento, a aplicação inclui dados mockados que são utilizados quando a API não está disponível:

- **5 alunos de exemplo** com dados completos
- **Simulação de delays** de rede
- **Tratamento de erros** da API
- **Estados de loading** realistas

## 🐛 Resolução de Problemas

### **API não disponível**
A aplicação automaticamente usa dados mockados quando a API não responde.

### **Erros de CORS**
Configure o servidor da API para aceitar requisições da origem da aplicação web.

### **Problemas de build**
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

## 📝 Convenções de Código

- **ESLint**: Configuração padrão do React
- **Prettier**: Formatação automática
- **Componentes**: PascalCase
- **Arquivos**: camelCase para JS/JSX
- **CSS**: BEM ou classes do Bootstrap

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é privado e destinado apenas para uso interno educacional.

---

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique a documentação do [React](https://react.dev/)
- Consulte a documentação do [Vite](https://vitejs.dev/)
- Consulte a documentação do [Bootstrap](https://getbootstrap.com/)
- Entre em contato com a equipe de desenvolvimento

---

**Versão**: 1.0.0
**Última atualização**: Novembro 2024
**Desenvolvido com**: ❤️ e ☕