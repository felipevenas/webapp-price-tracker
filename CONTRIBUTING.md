# 🤝 Contribuindo para o Price Tracker Web App

Obrigado por querer contribuir com o **Price Tracker Web App**! Este documento orienta o processo de desenvolvimento para manter a interface e a estrutura do código organizadas, performáticas e sustentáveis.

---

## 🛠️ Setup de Desenvolvimento

### 1. Clonar e Instalar Dependências
Certifique-se de ter o Node.js LTS instalado localmente.

```bash
# Clone o repositório
git clone https://github.com/felipevenas/webapp-price-tracker.git
cd webapp-price-tracker

# Instale as dependências
npm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` (ou `.env.local`) na raiz do projeto e configure a URL apontando para a sua instância local da **Price Tracker API**:
```env
VITE_API_URL=http://localhost:8000
```

### 3. Rodar em Modo de Desenvolvimento
Suba o servidor de desenvolvimento do Vite:
```bash
npm run dev
```
Acesse a interface pelo endereço fornecido no terminal (geralmente [http://localhost:5173](http://localhost:5173)).

---

## 🛤️ Estrutura de Branches

Adotamos a abordagem de **Trunk-Based Development**. As branches de funcionalidades devem ser criadas a partir de `main`, serem de curta duração e mescladas rapidamente de volta à `main` após aprovação em Pull Request.

Os nomes de branches devem ser escritos **em português** e seguir o padrão de nomenclatura:
- `funcionalidade/nome-da-feature`: Para novas implementações de telas ou componentes.
- `correcao/nome-do-bug`: Para correções de comportamento na UI, quebras de layout ou falhas de conexão com a API.
- `documentacao/nome-do-arquivo`: Para atualizações em manuais ou markdown.
- `melhoria/ajuste-infra`: Para refatorações, atualizações de dependências e melhorias de build.

**Exemplo:** `funcionalidade/grafico-historico` ou `correcao/ajuste-validacao-login`.

---

## ✍️ Convenções de Commit

Nossos commits são escritos **em português** com os prefixos estruturados para clareza no histórico do Git:

| Prefixo | Uso | Exemplo |
|---|---|---|
| `feat:` | Nova funcionalidade para o usuário | `feat: adiciona componente de gráfico de preços com recharts` |
| `fix:` | Correção de bug no código | `fix: corrige envio de correlation id nas chamadas da api` |
| `chore:` | Tarefas de build, dependências ou configurações | `chore: atualiza vite e plugins no package.json` |
| `docs:` | Atualizações na documentação ou README | `docs: detalha fluxo de execução do setup no readme` |
| `style:` | Ajustes puramente visuais, CSS ou formatação (sem mudar comportamento) | `style: ajusta espaçamento e cores do card de produtos` |
| `refactor:` | Refatoração interna de código para melhor legibilidade/performance | `refactor: divide componente dashboard em subcomponentes menores` |

---

## 🧪 Qualidade de Código & Linting

Antes de submeter qualquer código, verifique se a análise estática e o build estão executando sem problemas:

```bash
# Executa a análise estática rápida de estilo/regras usando oxlint
npm run lint

# Executa o build de produção compilando o TypeScript e empacotando com o Vite
npm run build
```
Certifique-se de resolver todos os warnings e errors apontados pelo compilador do TypeScript ou linter.
