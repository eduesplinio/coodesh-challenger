# QA Luma Store Automation

> This is a challenge by [Coodesh](https://coodesh.com/)

Automação de testes end-to-end para a Luma Store usando Playwright e TypeScript.

## Tecnologias

- **Playwright** - Framework de automação
- **TypeScript** - Linguagem
- **ESLint + Prettier** - Qualidade de código
- **Husky + lint-staged** - Git hooks
- **GitHub Actions** - CI/CD

## Por que Playwright?

- Suporte multi-navegador (Chromium, Firefox, WebKit)
- Auto-waiting inteligente (reduz flakiness)
- Interceptação de rede nativa
- TypeScript first-class
- Execução paralela e rápida
- Relatórios HTML e JUnit integrados

## Instalação

```bash
npm install
npx playwright install
```

## Execução

```bash
npm test                              # Todos os testes
npm test tests/required               # Apenas obrigatórios
npm test -- --headed                  # Com interface
npm test -- --project=chromium        # Navegador específico
npm run test:report                   # Ver relatório HTML
```

## Qualidade de Código

```bash
npm run lint                          # ESLint + Prettier
npm run format                        # Formatar código
```

## Estrutura

```
├── pages/              # Page Objects
├── tests/
│   ├── required/      # Testes obrigatórios
│   └── optional/      # Testes diferenciais
├── utils/             # Utilitários
└── .github/workflows/ # CI/CD
```

## Testes Implementados

**Obrigatórios:**

- Home Page (carregamento < 10s, navegação, busca)
- Search (busca por "shirt" com validação)
- Cart (adicionar produto e validar)
- Checkout (fluxo completo)

**Opcionais:**

- Account Creation (com tratamento de CAPTCHA)
- Random Product (seleção aleatória do catálogo)
- Product Review (adicionar avaliação)
- Advanced Search (interceptação de API)

## CI/CD

Pipeline com 3 jobs:

1. **Prettier** - Validação de formatação
2. **ESLint** - Validação de código
3. **Playwright Tests** - Execução dos testes (Chromium)

Triggers: push e pull requests na branch `main`

## Dados de Teste

Utiliza API [randomuser.me](https://randomuser.me) com fallback automático para garantir execução dos testes.

---

**Desenvolvido por Eduardo Esplinio para o desafio técnico Coodesh**
