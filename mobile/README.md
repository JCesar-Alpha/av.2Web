# 📱 Sistema de Gerenciamento de Alunos - Mobile

Um aplicativo mobile desenvolvido em React Native com Expo para gerenciamento de alunos de uma instituição educacional.

## 📋 Descrição

Este aplicativo mobile permite visualizar informações acadêmicas de alunos cadastrados no sistema, fornecendo uma interface nativa e intuitiva para dispositivos iOS e Android. O app consome dados da API REST em `https://proweb.leoproti.com.br/alunos` e oferece funcionalidades como listagem de alunos, visualização de detalhes e navegação fluida.

## 🔄 **ATUALIZAÇÃO IMPORTANTE - Nova Estrutura de Dados**

O aplicativo foi atualizado para trabalhar com a nova estrutura de dados dos alunos:

```json
{
  "id": 193,
  "nome": "Diogo Lana",
  "turma": "1",
  "curso": "CC",
  "matricula": "202451060708"
}
```

### **Campos Atualizados:**
- ✅ **nome**: Nome completo do aluno
- ✅ **turma**: Código da turma
- ✅ **curso**: Sigla do curso (CC, ES, SI, ADM, DG)
- ✅ **matricula**: Número de matrícula do aluno

## ✨ Funcionalidades

- 📚 **Listagem de Alunos**: Visualize todos os alunos cadastrados
- 👤 **Detalhes do Aluno**: Acesse informações completas de cada aluno
- 🔄 **Atualização Pull-to-Refresh**: Atualize a lista puxando para baixo
- ⚡ **Loading States**: Indicadores visuais durante carregamento
- 🚫 **Tratamento de Erros**: Mensagens informativas para problemas de conexão
- 📱 **Design Responsivo**: Interface adaptada para diferentes tamanhos de tela
- 🎨 **Material Design**: Componentes seguindo as diretrizes do Material Design

## 🛠️ Tecnologias Utilizadas

### Framework e Runtime
- **React Native** `0.72.3` - Framework para desenvolvimento mobile
- **Expo** `~49.0.0` - Plataforma para desenvolvimento React Native
- **React** `18.2.0` - Biblioteca JavaScript para interfaces

### Navegação
- **React Navigation** `^6.1.0` - Navegação entre telas
- **Stack Navigator** `^6.3.0` - Navegação em pilha

### UI/UX
- **React Native Paper** `^5.9.1` - Componentes Material Design
- **React Native Vector Icons** `^10.0.0` - Ícones vetoriais
- **React Native Screens** `~3.22.0` - Otimização de telas

### HTTP e API
- **Axios** `^1.6.0` - Cliente HTTP para requisições
- **API Base URL**: `https://proweb.leoproti.com.br`
- **Endpoint**: `/alunos` para operações CRUD

## 📁 Estrutura do Projeto

```
mobile/
├── App.js                     # Componente raiz da aplicação
├── app.json                   # Configurações do Expo
├── package.json               # Dependências e scripts
├── assets/                    # Recursos estáticos (ícones, imagens)
└── src/
    ├── components/            # Componentes reutilizáveis
    │   ├── AlunoCard/        # Card para exibir dados do aluno
    │   ├── Layout/           # Layout padrão da aplicação
    │   └── Loading/          # Componente de carregamento
    ├── hooks/                # Hooks customizados
    │   ├── useAlunos.js      # Hook para gerenciar lista de alunos
    │   └── useAlunoDetails.js # Hook para detalhes do aluno
    ├── navigation/           # Configuração de navegação
    │   └── AppNavigator.js   # Navegador principal
    ├── screens/              # Telas da aplicação
    │   ├── Home/            # Tela inicial com lista de alunos
    │   ├── AlunoDetails/    # Tela de detalhes do aluno
    │   └── NotFound/        # Tela de erro 404
    ├── services/            # Serviços e configurações de API
    │   ├── api.js           # Configuração do Axios
    │   └── alunosService.js # Serviços relacionados aos alunos
    └── utils/               # Utilitários e constantes
        ├── constants.js     # Constantes da aplicação
        └── helpers.js       # Funções auxiliares
```

## 🚀 Como Executar

### Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **Dispositivo físico** com o app Expo Go ou **Emulador** (iOS/Android)

### Passo a passo

1. **Clone o repositório** (se aplicável):
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd mobile
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm start
   # ou
   expo start
   ```

4. **Execute no dispositivo**:
   - **Dispositivo físico**: Escaneie o QR code com o app Expo Go
   - **iOS Simulator**: Pressione `i` no terminal
   - **Android Emulator**: Pressione `a` no terminal
   - **Web**: Pressione `w` no terminal

### Scripts Disponíveis

```bash
npm start          # Inicia o servidor de desenvolvimento
npm run android    # Executa no Android
npm run ios        # Executa no iOS
npm run web        # Executa no navegador
npm run build:android  # Build para Android
npm run build:ios     # Build para iOS
```

## 🏗️ Arquitetura

### Padrões Utilizados

- **Component-Based Architecture**: Componentes reutilizáveis e modulares
- **Custom Hooks**: Lógica de negócio separada dos componentes
- **Service Layer**: Camada de serviços para comunicação com API
- **Constants Management**: Centralização de constantes e configurações

### Fluxo de Dados

```
API ← → Services ← → Hooks ← → Components ← → Screens
```

### Componentes Principais

- **App.js**: Componente raiz com providers
- **AppNavigator**: Configuração de navegação
- **Home**: Tela principal com lista de alunos
- **AlunoDetails**: Tela de detalhes do aluno
- **AlunoCard**: Componente de card do aluno
- **useAlunos**: Hook para gerenciar estado dos alunos

## 🎨 Design System

### Cores Principais
- **Primary**: `#007AFF` (Azul iOS)
- **Success**: `#4CAF50` (Verde)
- **Error**: `#F44336` (Vermelho)
- **Warning**: `#FF9800` (Laranja)

### Componentes UI
- **Material Design**: Seguindo diretrizes do Google
- **Responsive Design**: Adaptável a diferentes tamanhos
- **Accessibility**: Componentes acessíveis

## 🔧 Configurações

### API Configuration
```javascript
baseURL: 'https://proweb.leoproti.com.br'
timeout: 15000ms
endpoint: '/alunos'
```

### Estrutura de Dados da API
```javascript
// Objeto Aluno retornado pela API
{
  "id": 193,
  "nome": "Diogo Lana",
  "turma": "1",
  "curso": "CC",
  "matricula": "202451060708"
}
```

### Códigos de Curso
- **CC**: Ciência da Computação
- **ES**: Engenharia de Software
- **SI**: Sistemas de Informação
- **ADM**: Administração
- **DG**: Design Gráfico

### Expo Configuration
- **Nome**: Sistema Educacional
- **Package**: com.sistemaeducacional.mobile
- **Orientação**: Portrait apenas
- **Suporte**: iOS, Android e Web

## 📱 Capturas de Tela

### Tela Inicial
- Lista de alunos com cards informativos
- Pull-to-refresh para atualização
- Botão flutuante de informações

### Tela de Detalhes
- Informações completas do aluno
- Design limpo e organizado
- Navegação intuitiva

### Estados de Loading
- Indicadores visuais durante carregamento
- Mensagens informativas
- Tratamento de erros

## 🧪 Testes

Para executar os testes (quando implementados):
```bash
npm test
```

## 📦 Build e Deploy

### Build para Produção
```bash
# Android
expo build:android

# iOS
expo build:ios
```

### Deploy
Siga as diretrizes do Expo para publicação nas lojas:
- [Google Play Store](https://docs.expo.dev/distribution/app-stores/)
- [Apple App Store](https://docs.expo.dev/distribution/app-stores/)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Convenções de Código

- **ESLint**: Configuração padrão
- **Prettier**: Formatação automática
- **Commit**: Mensagens descritivas em português
- **Components**: PascalCase
- **Files**: camelCase para arquivos JS

## 🐛 Problemas Conhecidos

- Certifique-se de que a API está ativa e acessível
- Verifique a conexão de internet do dispositivo
- Em caso de erro de build, limpe o cache: `expo r -c`

## 📄 Licença

Este projeto é privado e destinado apenas para uso interno.

## 👥 Equipe

Desenvolvido para o Sistema Educacional

---

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique a documentação do [Expo](https://docs.expo.dev/)
- Consulte a documentação do [React Native](https://reactnative.dev/)
- Entre em contato com a equipe de desenvolvimento

---

**Versão**: 1.0.0
**Última atualização**: Novembro 2024