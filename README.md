Visão geral
----------
av.2Web é um mono-repositório que contém dois projetos intimamente relacionados:
- Aplicativo Mobile (experiência nativa para dispositivos móveis)
- Aplicativo Web (experiência web responsiva)

O objetivo é compartilhar design, comportamentos e (quando apropriado) código entre os projetos mobile e web para que o produto tenha uma experiência consistente entre plataformas.

Estrutura do repositório
------------------------
- /mobile — Aplicativo mobile (recomendado: React Native / Expo)
- /web — Aplicativo web (recomendado: React + Vite / Create React App)
- /shared — Código, utilitários, tipos e assets compartilhados (opcional)
- /docs — Documentação do projeto, notas de design e especificações
- /scripts — Scripts úteis para desenvolvimento e CI

Se alguma pasta estiver ausente para sua configuração (por exemplo /shared), crie-a e atualize os caminhos de importação conforme necessário.

Começando
---------
Requisitos
- Node.js (LTS) — recomendado v16+
- npm ou yarn
- Para mobile: Expo CLI (se usar Expo), Android Studio (emulador Android) e/ou Xcode (simulador iOS) para testes em emuladores
- Para web: um navegador moderno

Início rápido (recomendado)
1. Clone o repositório
   git clone https://github.com/JCesar-Alpha/av.2Web.git
2. Instale as dependências na raiz (se usar gerenciador de workspaces)
   - npm install
   ou
   - yarn install

Instalação por projeto
- Mobile
  cd mobile
  npm install
  # ou
  yarn install

- Web
  cd web
  npm install
  # ou
  yarn install

Desenvolvimento
--------------
Mobile (React Native / Expo)
- Inicie o servidor de desenvolvimento (Expo)
  cd mobile
  expo start
- Executar no emulador Android
  expo run:android
- Executar no simulador iOS (macOS + Xcode)
  expo run:ios

Observações:
- Se você não estiver usando Expo, substitua os comandos pelo react-native CLI do seu projeto:
  - npx react-native run-android
  - npx react-native run-ios
- Use um dispositivo físico escaneando o QR code exibido pelo Expo.

Web (React)
- Inicie o servidor de desenvolvimento (Vite)
  cd web
  npm run dev
  # ou, se for CRA:
  npm start
- Build para produção
  npm run build
- Servir localmente após o build (opcional)
  npx serve dist

Variáveis de ambiente
---------------------
- Cada app pode usar um arquivo .env no diretório do projeto (mobile/.env e web/.env).
- NÃO comite chaves sensíveis. Adicione .env* ao .gitignore.
- Exemplo (mobile/.env)
  API_URL=https://api.example.com
  SENTRY_DSN=seu_sentry_dsn_aqui

Código compartilhado
--------------------
- Se o mono-repositório expõe utilitários/tipos/componentes em /shared, configure os bundlers (Metro para mobile e Vite/Webpack para web) para resolver o pacote compartilhado. Abordagens comuns:
  - Yarn workspaces / npm workspaces
  - Lerna
  - Ferramentas como turborepo ou nx para monorepos maiores

Scripts (exemplos)
------------------
No nível superior, você pode adicionar scripts úteis no package.json para executar ambos os projetos:

- Instalar dependências para todos os workspaces
  npm run bootstrap
- Executar ambos os apps simultaneamente (requer ferramenta como concurrently)
  npm run dev:all

Testes & Qualidade
------------------
- Testes unitários: Jest
  - npm run test
- End-to-end: Detox (mobile) ou Cypress (web)
- Linting: ESLint + Prettier
  - npm run lint
- Verificação de tipos: TypeScript (se usado)
  - npm run typecheck

CI / CD (sugestões)
-------------------
- Execute lint, checagens de tipos e testes unitários em cada PR.
- Publique builds web no seu host estático (Netlify, Vercel, GitHub Pages).
- Para mobile, configure CI para gerar builds de release (recomendado: Fastlane) e distribua via TestFlight / Google Play internal testing.

Contribuindo
-----------
- Faça fork do repositório e crie uma branch de feature (feature/sua-feature)
- Mantenha mudanças limitadas a /web, /mobile ou /shared, a menos que a alteração afete intencionalmente ambos
- Adicione testes para novas funcionalidades e rode a suíte localmente
- Abra um Pull Request descrevendo as mudanças e inclua screenshots ou gravações para alterações de UI

Notas e recomendações
---------------------
- Use componentes compartilhados para cores, espaçamentos e tipografia para manter consistência visual.
- Evite lógica específica de plataforma quando possível; prefira design responsivo e adaptativo.
- Prefira commits pequenos e bem nomeados e mantenha um changelog claro.

Solução de problemas
--------------------
- Se o app mobile não resolver um módulo em /shared: verifique a configuração do Metro resolver. Pode ser necessário adicionar watchFolders ou ajustar extraNodeModules.
- Se o build web falhar ao importar de /shared: garanta que seu bundler esteja configurado para transpilar o código compartilhado (ex.: incluir o caminho shared nas listas de include do Vite/webpack).

Licença
-------
Especifique sua licença aqui (ex.: MIT). Adicione um arquivo LICENSE ao repositório.

Contato
-------
Projeto mantido por JCesar-Alpha (https://github.com/JCesar-Alpha)

Personalize este README para refletir as tecnologias concretas usadas no seu repositório (React Native vs Flutter, Vite vs CRA, Yarn vs npm, etc).
