# QA Luma Store Automation

Automação de testes end-to-end para a Luma Store usando Playwright e TypeScript.

> This is a challenge by [Coodesh](https://coodesh.com/)

## 📋 Sobre o Projeto

Este projeto implementa testes automatizados para validar funcionalidades críticas da Luma Store (https://demo.hyva.io), incluindo navegação, busca de produtos, gerenciamento de carrinho e processo de checkout.

## 🚀 Tecnologias Utilizadas

- **[Playwright](https://playwright.dev/)** - Framework de automação de testes
- **[TypeScript](https://www.typescriptlang.org/)** - Linguagem de programação
- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **Page Object Model** - Padrão de design para organização dos testes

## 🎯 Por que Playwright?

### Vantagens do Playwright:

1. **Suporte Multi-Navegador**: Testa em Chromium, Firefox e WebKit com uma única API
2. **Auto-Waiting Inteligente**: Reduz flakiness com esperas automáticas para elementos
3. **Interceptação de Rede**: Capacidade nativa de interceptar e monitorar requisições/respostas
4. **Debugging Poderoso**: Playwright Inspector, trace viewer e screenshots automáticos
5. **TypeScript First-Class**: Suporte completo com tipos fortes
6. **Performance**: Execução rápida com paralelização nativa
7. **Relatórios Integrados**: HTML reports e JUnit XML out-of-the-box

### Comparação com outras ferramentas:

**Selenium:**
- ❌ Requer configuração manual de drivers
- ❌ Waits explícitos necessários
- ❌ Sem interceptação de rede nativa
- ✅ Mais maduro e amplamente adotado

**Cypress:**
- ❌ Limitado ao navegador (sem Firefox/Safari real)
- ❌ Não suporta múltiplas abas/janelas nativamente
- ❌ Execução apenas no navegador
- ✅ Excelente DX e debugging

**Robot Framework:**
- ❌ Sintaxe menos familiar para desenvolvedores
- ❌ Menos performático
- ✅ Ótimo para testes de aceitação com stakeholders não-técnicos

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Instalar navegadores do Playwright
npx playwright install
```

## 🧪 Execução dos Testes

```bash
# Executar todos os testes
npm test

# Executar apenas testes obrigatórios
npm test tests/required

# Executar em modo headed (com interface)
npm test -- --headed

# Executar em navegador específico
npm test -- --project=chromium

# Executar teste específico
npm test -- tests/required/home.spec.ts

# Abrir relatório HTML
npx playwright show-report
```

## 📁 Estrutura do Projeto

```
.
├── pages/                  # Page Objects
│   ├── HomePage.ts
│   ├── ProductPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── AccountPage.ts
├── tests/
│   ├── required/          # Testes obrigatórios
│   │   ├── home.spec.ts
│   │   ├── search.spec.ts
│   │   ├── cart.spec.ts
│   │   └── checkout.spec.ts
│   └── optional/          # Testes diferenciais
├── utils/                 # Utilitários
│   └── test-data.ts      # Gerador de dados de teste
├── playwright.config.ts
└── package.json
```

## ✅ Casos de Teste Implementados

### Obrigatórios:
- ✅ **Home Page**: Validação de carregamento (< 10s), título, menu, busca e categorias
- ✅ **Search**: Busca por "shirt" com validação de resultados e estrutura de produtos
- ✅ **Cart**: Adicionar produto ao carrinho com validação de contador e itens
- ✅ **Checkout**: Fluxo completo com preenchimento de formulário e seleção de método de envio

### Diferenciais (Opcionais):
- ⏳ Busca avançada com interceptação de API
- ⏳ Criação de conta com tratamento de CAPTCHA
- ⏳ Seleção aleatória de produto do catálogo
- ⏳ Adicionar avaliação em produto

## 🔧 Configuração

O projeto está configurado para:
- **Base URL**: https://demo.hyva.io
- **Navegadores**: Chromium, Firefox, WebKit
- **Relatórios**: HTML e JUnit XML
- **Screenshots**: Apenas em falhas
- **Vídeos**: Retidos apenas em falhas
- **Traces**: Retidos apenas em falhas
- **Paralelização**: 4 workers

## 📊 Geração de Dados de Teste

O projeto utiliza a API [randomuser.me](https://randomuser.me) para gerar dados realistas de teste. Em caso de indisponibilidade da API, o sistema utiliza dados de fallback automaticamente, garantindo que os testes sempre possam ser executados.

## 🏗️ Padrões de Design

### Page Object Model (POM)

Cada página da aplicação é representada por uma classe que encapsula:
- **Localizadores**: Seletores de elementos
- **Ações**: Métodos para interagir com a página
- **Validações**: Verificações específicas da página

**Benefícios:**
- Reduz duplicação de código
- Facilita manutenção quando a UI muda
- Melhora legibilidade dos testes
- Promove reutilização

## 📈 Relatórios

Os testes geram automaticamente:
- **HTML Report**: Relatório visual com screenshots e vídeos de falhas
- **JUnit XML**: Para integração com CI/CD
- **Traces**: Para debugging detalhado com Playwright Trace Viewer

## 🤝 Contribuindo

Este é um projeto de desafio técnico. Para sugestões ou melhorias, abra uma issue.

## 📝 Licença

Este projeto foi desenvolvido como parte de um desafio técnico para QA.

---

**Desenvolvido como parte do desafio técnico Coodesh**
