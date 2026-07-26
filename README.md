# 💻 Price Tracker | Interface Moderna para Monitoramento de Preços

> Interface web responsiva e de alta performance desenvolvida em React 19, TypeScript e Vite 8. O Web App é estilizado com Tailwind CSS v4, utiliza Recharts para exibição de históricos visuais de variação de preços de produtos monitorados, validação rígida de formulários com React Hook Form + Zod, e integração assíncrona com a Price Tracker API via Axios.

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white)
![Oxlint](https://img.shields.io/badge/Oxlint-1.71-f97316)
![Workflow](https://img.shields.io/badge/Workflow-Trunk--Based-2ea44f)
![License](https://img.shields.io/badge/license-Propriet%C3%A1ria-red)

---

## 📖 Propósito

O **Price Tracker** é a interface do usuário final do ecossistema Price Tracker. Ele permite que os usuários visualizem de forma amigável os produtos que estão monitorando, cadastrem novas URLs para monitoramento, acompanhem o histórico de variações de preços através de gráficos interativos e gerenciem suas contas de forma rápida e segura. A interface se comunica diretamente com a **Price Tracker API** para autenticação JWT e sincronização de dados em tempo real.

---

## 🌟 Funcionalidades Focadas na UX/UI

- **Dashboard Central**: Exibição de cards de produtos monitorados contendo imagens, preços atuais, preços-alvo e percentuais de desconto ou aumento.
- **Gráficos Interativos (Recharts)**: Visualização rica do histórico de preços com linhas de tendência, facilitando a identificação de promoções reais ou "metade do dobro".
- **Design System com Tailwind CSS v4**: Interface totalmente responsiva (mobile-first), com paleta de cores moderna, micro-animações nas interações e suporte a transições fluidas.
- **Formulários e Validação Rígida**: Cadastro de produtos e autenticação validados no cliente utilizando Zod e React Hook Form, prevenindo requisições inválidas para a API.
- **Roteamento Seguro (React Router)**: Proteção de rotas privadas (Dashboard, Cadastro) exigindo autenticação do usuário. Redirecionamento automático para tela de login em caso de expiração do token.
- **Feedback em Tempo Real (React Hot Toast)**: Notificações não-bloqueantes e elegantes de sucesso, erro e carregamento nas principais interações da plataforma.

---

## 📁 Estrutura do Projeto

```
webapp-price-tracker/
├── public/                       # Assets estáticos globais (favicon, etc.)
├── src/
│   ├── assets/                   # Imagens e mídias estáticas do design
│   ├── components/               # Componentes globais compartilhados (botões, inputs, cards)
│   ├── config/                   # Configuração do cliente Axios e injeção do token JWT
│   ├── context/                  # Contextos globais (ex: Autenticação, Tema)
│   ├── features/                 # Submódulos de telas e lógica agrupados por funcionalidade
│   │   ├── auth/                 # Login e cadastro de usuários
│   │   ├── dashboard/            # Listagem de produtos monitorados
│   │   └── products/             # Cadastro e detalhamento (histórico) do produto
│   ├── hooks/                    # Custom Hooks globais reutilizáveis (ex: useAuth)
│   ├── layouts/                  # Layouts de página estruturais (ex: AppLayout com Sidebar)
│   ├── routes/                   # Definição e gerenciamento das rotas públicas e privadas
│   ├── utils/                    # Funções utilitárias (formatadores de moeda, datas, etc.)
│   ├── App.css                   # Ajustes finos de estilo do App
│   ├── App.tsx                   # Componente raiz que configura rotas e provedores
│   ├── index.css                 # Folha de estilo global integrando o Tailwind v4
│   └── main.tsx                  # Ponto de entrada do React
├── index.html                    # Template HTML principal
├── package.json                  # Manifesto de dependências e scripts npm
├── tsconfig.json                 # Configurações do compilador TypeScript
├── vite.config.ts                # Configuração do bundler Vite e plugins
└── README.md                     # Documentação oficial do projeto
```

---

## 🏷️ Stack Tecnológica

### Core & Estado
| Tecnologia | Versão | Propósito |
|---|---|---|
| React | 19.x | Biblioteca para construção de interfaces SPA reativas |
| TypeScript | 6.x | Tipagem estática para maior previsibilidade e segurança de código |
| React Router Dom | 7.x | Gerenciamento de rotas e navegação SPA |
| Axios | 1.x | Cliente HTTP baseado em Promises para comunicação com a API |

### UX, Estilo & Validação
| Tecnologia | Versão | Propósito |
|---|---|---|
| Tailwind CSS | v4.0.x | Framework utilitário de CSS com otimizações em build time |
| Recharts | 3.x | Biblioteca de gráficos vetoriais interativos e reativos |
| Lucide React | 1.x | Pacote de ícones SVG limpos e consistentes |
| React Hook Form | 7.x | Gerenciamento de estado de formulários de alta performance |
| Zod | 4.x | Esquema de validação estática de dados e inputs |
| React Hot Toast | 2.x | Notificações toast bonitas e leves em tempo real |

---

## 🚀 Instalação e Execução

### Pré-requisitos
- **Node.js LTS** (recomendado versão 18 ou superior) instalado
- **Price Tracker API** rodando localmente (opcional, para integração completa)

### Execução Local

```bash
# 1. Clonar o repositório
git clone https://github.com/felipevenas/webapp-price-tracker.git
cd webapp-price-tracker

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
# Crie um arquivo .env na raiz do projeto contendo a URL da API:
echo "VITE_API_URL=http://localhost:8000" > .env

# 4. Iniciar o servidor de desenvolvimento (Vite)
npm run dev
```

O projeto estará acessível em: [http://localhost:5173](http://localhost:5173)

### Outros Scripts Úteis

- **Análise Estática (Linting):** `npm run lint` — Utiliza o **Oxlint** para validações ultra-rápidas de boas práticas e correção de erros.
- **Build de Produção:** `npm run build` — Compila o código TypeScript e otimiza o bundle final gerando arquivos na pasta `dist/`.
- **Visualização do Build:** `npm run preview` — Roda um servidor local servindo a pasta de produção compilada para validações pré-deploy.

---

## 🤝 Contribuição — fluxo Trunk-Based

Este projeto adota o modelo de **Trunk-Based Development**. Feature branches devem ser curtas e mescladas na branch `main` após aprovação em Pull Request.

### Convenções de Commit
| Prefixo | Uso | SemVer correspondente |
|---|---|---|
| `feat:` | Nova funcionalidade de interface ou componente | MINOR |
| `fix:` | Correção de bug visual ou de comportamento | PATCH |
| `chore:` | Ajuste de build, dependências ou configurações | - |
| `docs:` | Atualizações na documentação | - |
| `style:` | Ajustes estéticos, CSS, espaçamentos ou formatação | - |
| `refactor:` | Refatoração interna de componentes | - |

---

## 📄 Licença

Software proprietário — todos os direitos reservados.
**&copy; 2026 Price Tracker Web App**
