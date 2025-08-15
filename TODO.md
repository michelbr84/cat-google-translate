# TODO - Site de Gatos estilo Google

## ✅ Fase 1: Setup e Design System

- [x] Criar TODO.md
- [x] Implementar design system baseado no Google (cores, tipografia, componentes)
- [x] Criar componentes base (Button, Input, Select, etc.)

## 🐛 Correções Críticas

- [x] Corrigir erro 404 na URL da API cataas.com (estrutura de URL malformada)
- [x] Implementar sistema multi-linguagem com contexto React
- [x] Criar seletor de idioma no header
- [x] Detecção automática de idioma baseada em IP
- [x] Fallback para inglês e sistema de idioma aleatório

## 📋 Fase 2: Estrutura Base

- [x] Criar layout principal estilo Google
- [x] Implementar logo "Gato" com multi-linguagem
- [x] Criar barra de pesquisa central
- [x] Implementar detecção de IP/país para linguagem
- [x] Sistema de linguagem aleatória como fallback

## 🐱 Fase 3: Funcionalidades Básicas da API

- [x] Integração com cataas.com API ("Cat as a Service")
- [x] `/cat` - Gato aleatório (comportamento padrão)
- [x] `/cat/:tag` - Gato com tag específica
- [x] `/cat/gif` - Gato GIF aleatório
- [x] `/cat/says/:text` - Gato com texto
- [x] `/cat/:tag/says/:text` - Gato com tag e texto
- [x] Parâmetros de texto (fontSize, fontColor)

## ⚙️ Fase 4: Interface de Controles

- [x] Toggle para escolher entre imagem/GIF
- [x] Campo de texto para personalizar mensagem
- [x] Seletor de cor para texto
- [x] Botões de ação ("Buscar Gato", "Estou com Sorte")

## 🔧 Fase 5: Funcionalidades Avançadas

- [x] Painel de opções avançadas (collapsible)
- [x] Seletor de tipo de imagem (xsmall, small, medium, square)
- [x] Filtros de imagem (blur, mono, negate, custom)
- [x] Controles de brilho, luminosidade, saturação, matiz
- [x] Controles RGB personalizados
- [x] Dimensões customizadas (width/height)
- [x] Opções `html=true` e `json=true` (expostas na UI)
- [x] `html=true`: botão abre nova aba
- [x] `json=true`: botão abre modal com copiar e download

### Melhorias de UX nas avançadas

- [x] Persistir todas as opções avançadas em `localStorage`
- [x] Mostrar dica/tooltip sobre limitação de cor do texto (CATAAS)
- [x] Botão para abrir resultado em nova aba (quando `html=true`)
- [x] Implementado (HTML)
- [x] "Open Image" para abrir a imagem atual em nova aba
- [x] `HTML` e `JSON` mutuamente exclusivos

### Checklist CATAAS Advanced (por endpoint)

- [x] `/cat?type=:type` — Implementado (xsmall, small, medium, square)
- [x] `/cat?filter=:filter` — Implementado (blur, mono, negate, custom)
- [x] `/cat?filter=custom&brightness=:brightness&lightness=:lightness&saturation=:saturation&hue=:hue` — Implementado
- [x] `/cat?filter=custom&r=:red&g=:green&b=:blue` — Implementado
- [x] `/cat?width=:width` e `/cat?height=:height` — Implementado
- [x] `/cat?html=true` — Exposto e funcionando
- [x] `/cat?json=true` — Exposto e funcionando

### Integrações auxiliares

- [x] Autocomplete de tags usando `/api/tags` com cache local (24h)
- [x] Suporte a múltiplas tags separadas por vírgula (ex.: `orange,cute`)

## 🌐 Fase 6: Multi-linguagem

- [x] Implementar traduções para "Gato" em diferentes idiomas
- [x] Sistema de detecção de país por IP
- [x] Funcionalidade de troca aleatória de idioma
- [x] Interface de idioma para todo o site
- [x] Contexto React para gerenciamento de estado de linguagem
- [x] Seletor de idioma no header superior direito

## 📱 Fase 7: Responsividade e Melhorias

- [x] Garantir responsividade mobile (layout, botões e sugestões adaptados)
- [x] Adicionar loading states
- [x] Implementar error handling básico
- [x] Otimizar performance (lazy-loading de imagem e decoding async)
- [x] Adicionar animações suaves em entrada de imagem e ações
- [x] Adicionar skeleton de carregamento para a área da imagem
- [x] Persistir opções avançadas em `localStorage`
- [x] Tooltip/nota de limitação em `fontColor` (CATAAS)
- [x] Pequenos ajustes de A11y (aria-labels, espaçamento header no mobile)

## 🧪 Fase 7.1: Testes e Observabilidade

- [x] Testes e2e básicos (navegação, busca) — Playwright configurado e smoke test criado
- [x] Web server automático para e2e (build + preview com porta fixa)
- [x] Teste e2e para "Estou com Sorte" carregando imagem
- [x] Métricas simples (dev only) de sucesso/erro de busca via localStorage/console
- [x] Testes e2e avançados: HTML e JSON (ações e modal)
- [x] CI: workflow GitHub Actions rodando e2e em cada push/PR
- [x] Limpar warnings de console e mensagens de extensões no README (nota informativa)
- [x] Métrica simples de sucesso/erro de carga (dev only) — image onLoad/onError
- [x] Botão "Copy URL" no resultado para compartilhar a URL gerada
- [x] Toast de feedback ao copiar URL (i18n)

## 🐾 Correções e Conformidade com a documentação CATAAS

- [x] Ler e seguir a documentação oficial: [cataas.com](https://cataas.com/) e [cataas.com/doc.html](https://cataas.com/doc.html)
- [x] Usar nomes de filtros e tipos conforme docs (filter: blur, mono, negate, custom; type: xsmall, small, medium, square)
- [x] Ajustar UI para múltiplos idiomas via contexto
- [x] A palavra "Gato" muda de idioma de forma independente ao clique
- [x] Remover mensagens de erro visíveis ao usuário em falha de imagem
- [x] Fallback automático para imagem aleatória `/cat` quando a carga falhar
- [x] Implementar retentativa com backoff (2 tentativas com cache-busting, depois fallback)

### Precisão de `fontColor`

- [x] Restringir seleção de cor a um conjunto fixo e suportado (hex exatos como `#000000`, `#ffffff`, `#0000ff`, `#ff0000`, etc.)
- [x] Padrão inicial ajustado para `#000000` para garantir visibilidade

### Limitações/Bugs conhecidos (CATAAS)

- [x] `fontColor` no endpoint `/cat/says/:text` aparenta aceitar apenas preto/branco na prática. UI envia nomes (ex.: `red`) e converte hex conhecidos (ex.: `#ff0000` → `red`), porém a imagem ainda pode renderizar o texto em preto. Em testes, `white` se mostrou mais confiável. Documentado no README.
- [x] Verificar se somente `white` funciona além de preto; documentado workaround e limitação na UI.
- [x] Validar comportamento em combos com `gif`, `filter` e `type` (ex.: `/cat/gif/says/Hello?filter=mono&fontColor=orange&fontSize=20&type=square`).

## 🎨 Fase 8: Toques Finais

- [x] Meta tags e SEO iniciais (title/description/OG/Twitter)
- [x] Favicon / Apple touch icon
- [x] Estados de hover e focus (inputs/selects restantes)
- [x] Keyboard navigation (sugestões com setas e Enter)
- [x] Teclado: navegação com Select (teste e2e)
- [x] Acessibilidade (contraste final)
- [x] Link do GitHub no footer / Página About com instruções
- [x] Nota sobre warnings de extensões no About

## 🚀 Fase 9: Deploy e Testes

- [ ] Testes finais em diferentes dispositivos
- [ ] Validação de todas as funcionalidades da API
- [x] Deploy final via Lovable:
  - [x] Remover configuração de GitHub Pages
  - [x] Remover `basename` no `BrowserRouter`
  - [x] Simplificar `vite.config.ts` (sem `base`)
  - [x] Reapontar deploy no Lovable (online OK)

### Próximos passos sugeridos

- [x] SEO extra: `canonical`, `meta` de idioma/locale e `sitemap.xml`
- [x] A11y: testes e2e adicionados para `LanguageSelector` e `Switch` (HTML/JSON)
- [x] Observabilidade: anexar trace/screenshots do Playwright nos jobs de CI
- [x] Performance: preload de assets críticos (hero image + canonical dinâmico + preconnect/dns-prefetch CATAAS)
- [x] Robots aponta `sitemap.xml`
- [x] Performance: Lighthouse CI habilitado no GitHub Actions (push + manual + semanal); avaliar preload de fontes/critical CSS após relatório

---

## Linguagens para "Gato"

- Português: Gato
- English: Cat
- Español: Gato
- Français: Chat
- Deutsch: Katze
- Italiano: Gatto
- 日本語: ネコ (Neko)
- 中文: 猫 (Māo)
- Русский: Кот (Kot)
- العربية: قط (Qit)
