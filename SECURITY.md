# 🛡️ Política de Segurança

## Versões Suportadas

Apenas as versões mais recentes da branch principal recebem correções de segurança ativas no Web App. Recomendamos sempre atualizar o repositório local para a última versão estável.

| Versão | Suportada |
|---|---|
| >= 0.1.0 | ✅ Sim |
| < 0.1.0 | ❌ Não |

---

## Como Reportar uma Vulnerabilidade

Agradecemos o esforço para manter este projeto seguro para todos. Se você identificar qualquer falha ou vulnerabilidade de segurança (ex: vazamento de tokens no localStorage/cookies, problemas de validação no cliente, exposição indevida de dados sensíveis ou vulnerabilidades de dependências), por favor **não abra uma issue pública**.

Em vez disso, siga os passos abaixo para relatar o problema de forma responsável:

1.  Envie um e-mail detalhado com a descrição da falha para **felipevenas@gmail.com** (ou o e-mail do mantenedor do repositório).
2.  Descreva detalhadamente o problema técnico e, se possível, forneça um código de prova de conceito (PoC), capturas de tela ou os passos exatos para reproduzir a falha.
3.  Nossa equipe de desenvolvimento revisará o relatório e responderá dentro de 48 horas para alinhar a correção.

---

## Processo de Resolução

Assim que confirmarmos a vulnerabilidade:

1.  Desenvolveremos a correção em um ambiente privado isolado.
2.  Faremos o merge da correção diretamente na branch `main`.
3.  Registraremos os detalhes da correção no `CHANGELOG.md` na nova release do patch de segurança.
