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
- [ ] Opções `html=true` e `json=true` (expor na UI)

### Melhorias de UX nas avançadas

- [ ] Persistir todas as opções avançadas em `localStorage`
- [ ] Mostrar dica/tooltip sobre limitação de cor do texto (CATAAS)
- [ ] Botão para abrir resultado em nova aba (quando `html=true`)

### Checklist CATAAS Advanced (por endpoint)

- [x] `/cat?type=:type` — Implementado (xsmall, small, medium, square)
- [x] `/cat?filter=:filter` — Implementado (blur, mono, negate, custom)
- [x] `/cat?filter=custom&brightness=:brightness&lightness=:lightness&saturation=:saturation&hue=:hue` — Implementado
- [x] `/cat?filter=custom&r=:red&g=:green&b=:blue` — Implementado
- [x] `/cat?width=:width` e `/cat?height=:height` — Implementado
- [ ] `/cat?html=true` — Pendente (expor opção na UI)
- [ ] `/cat?json=true` — Pendente (expor opção na UI)

### Integrações auxiliares

- [ ] Autocomplete de tags usando `/api/tags` com cache local (24h)
- [ ] Suporte a múltiplas tags separadas por vírgula (ex.: `orange,cute`)

## 🌐 Fase 6: Multi-linguagem

- [x] Implementar traduções para "Gato" em diferentes idiomas
- [x] Sistema de detecção de país por IP
- [x] Funcionalidade de troca aleatória de idioma
- [x] Interface de idioma para todo o site
- [x] Contexto React para gerenciamento de estado de linguagem
- [x] Seletor de idioma no header superior direito

## 📱 Fase 7: Responsividade e Melhorias

- [ ] Garantir responsividade mobile
- [x] Adicionar loading states
- [x] Implementar error handling básico
- [ ] Otimizar performance
- [ ] Adicionar animações suaves

## 🧪 Fase 7.1: Testes e Observabilidade

- [ ] Testes e2e básicos (navegação, busca, sorte, opções avançadas)
- [ ] Limpar warnings de console e mensagens de extensões no README (nota informativa)
- [ ] Métrica simples de sucesso/erro de carga (dev only)

## 🐾 Correções e Conformidade com a documentação CATAAS

- [x] Ler e seguir a documentação oficial: [cataas.com](https://cataas.com/) e [cataas.com/doc.html](https://cataas.com/doc.html)
- [x] Usar nomes de filtros e tipos conforme docs (filter: blur, mono, negate, custom; type: xsmall, small, medium, square)
- [x] Ajustar UI para múltiplos idiomas via contexto
- [x] A palavra "Gato" muda de idioma de forma independente ao clique
- [x] Remover mensagens de erro visíveis ao usuário em falha de imagem
- [x] Fallback automático para imagem aleatória `/cat` quando a carga falhar
- [ ] Implementar retentativa com backoff se necessário (resiliência extra)

### Limitações/Bugs conhecidos (CATAAS)

- [ ] `fontColor` no endpoint `/cat/says/:text` aparenta aceitar apenas preto/branco no momento. UI envia nomes (ex.: `red`) e converte hex conhecidos (ex.: `#ff0000` → `red`), porém a imagem ainda renderiza o texto em preto. Registrar para investigação.
- [ ] Verificar se somente `white` funciona além de preto; se sim, documentar workaround e indicar limitação na UI.
- [ ] Validar comportamento em combos com `gif`, `filter` e `type` (ex.: `/cat/gif/says/Hello?filter=mono&fontColor=orange&fontSize=20&type=square`).

---

## Próximos passos recomendados

1. Implementar UI para `html=true` e `json=true` nas Opções Avançadas:
   - `html=true`: abrir nova aba com o HTML gerado
   - `json=true`: buscar JSON e exibir em modal com botão de copiar/baixar
2. Adicionar autocomplete de tags via `/api/tags` com cache local (24h) e suporte a múltiplas tags separadas por vírgula
3. Persistir as opções avançadas em `localStorage` para manter preferências do usuário
4. Exibir tooltip sobre a limitação de `fontColor` no `says/:text` e oferecer sugestão de usar branco

## 🎨 Fase 8: Toques Finais

- [ ] Meta tags e SEO
- [ ] Favicon de gato
- [ ] Estados de hover e focus
- [ ] Keyboard navigation
- [ ] Acessibilidade

## 🚀 Fase 9: Deploy e Testes

- [ ] Testes finais em diferentes dispositivos
- [ ] Validação de todas as funcionalidades da API
- [ ] Deploy final

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
