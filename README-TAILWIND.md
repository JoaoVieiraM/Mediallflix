# MediallFlix Landing Page - Versão Tailwind CSS

## 🎨 Migração Completa para Tailwind CSS com Nova Paleta de Cores

Esta é a versão atualizada da landing page MediallFlix, completamente migrada para **Tailwind CSS** com a nova paleta de cores da marca.

---

## 📊 Nova Paleta de Cores

A landing page agora usa a paleta de cores oficial da MediallFlix:

| Cor | Código Hex | Uso no Design |
|-----|-----------|---------------|
| **Vermelho Escuro (Borgonha)** | `#8B0000` | Logo, títulos principais, badges de destaque, plano "Mais Popular" |
| **Verde Menta** | `#90EE90` | Ícones de saúde, checkmarks, badges de benefícios, fundos sutis |
| **Azul-Petróleo (Ciano)** | `#008080` | **TODOS os botões CTA**, links importantes, elementos interativos |
| **Branco** | `#FFFFFF` | Background principal, textos em fundos escuros |
| **Preto** | `#000000` | Textos principais, garantindo contraste WCAG AAA |

---

## ✨ Principais Melhorias

### 1. **Tailwind CSS Implementado**
- ✅ CDN do Tailwind CSS 3.4 integrado
- ✅ Configuração customizada inline com as cores da marca
- ✅ Classes utility-first para responsividade perfeita
- ✅ Animações configuradas (float-gentle, pulse-subtle)

### 2. **Responsividade Mobile-First**
- ✅ Breakpoints do Tailwind: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- ✅ Grid responsivo: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- ✅ Texto adaptável: `text-4xl sm:text-5xl lg:text-6xl`
- ✅ Espaçamentos dinâmicos: `p-4 md:p-6 lg:p-8`
- ✅ Menu hamburger funcional em mobile

### 3. **Animações Sutis e Profissionais**
- ✅ Scroll reveal com Intersection Observer
- ✅ Hover effects suaves: `hover:scale-105`, `hover:shadow-xl`
- ✅ Transições elegantes: `transition-all duration-300`
- ✅ Animações customizadas de float para cards
- ✅ Pulse sutil para botão WhatsApp

### 4. **Paleta de Cores Aplicada Estrategicamente**

#### **Vermelho Escuro (#8B0000)**
- Logo MediallFlix (destaque "Flix")
- Badge "Mais de 6.500 convênios"
- Plano "Mais Popular" (background gradient)
- Títulos de seções
- Footer (acento no logo)

#### **Verde Menta (#90EE90)**
- Checkmarks de benefícios
- Ícones de saúde e bem-estar
- Badges de categorias de parceiros
- Fundos sutis em seções de benefícios

#### **Azul-Petróleo (#008080)**
- **TODOS os botões CTA**:
  - "Assinar Agora" (header)
  - "Escolha Seu Plano Agora" (hero)
  - "Quero Economizar Agora" (problem/solution)
  - "Escolher Plano" (planos)
  - Badge "Mais Popular"
- Links importantes
- Ícones de ação

### 5. **Componentes Otimizados**

#### Header/Navbar
- Fixed com backdrop-blur
- Sombra dinâmica no scroll
- Menu mobile responsivo
- Botão CTA em azul-petróleo

#### Hero Section
- Grid responsivo 2 colunas
- Badge com vermelho escuro
- CTAs em azul-petróleo
- Animações de entrada suaves
- Cards flutuantes animados

#### Benefícios
- Cards alternados (left/right layout)
- Hover effects profissionais
- Ícones em verde menta
- Stats com números grandes

#### Planos
- 3 cards com grid responsivo
- Plano "Familiar" destacado (background borgonha)
- Hover: scale + shadow
- Tabela de especialidades responsiva

#### Depoimentos
- Grid de 3 colunas (1 em mobile)
- Avatares coloridos (burgundy, teal, mint)
- Cards com shadow e hover

#### FAQ
- Accordion funcional
- Ícones rotacionam 180° quando aberto
- Transições suaves
- Mobile-friendly

#### Footer
- Grid 4 colunas (1 em mobile)
- Ícones sociais com hover
- Links organizados
- Dark mode (bg-gray-900)

---

## 🚀 Como Usar

### Visualizar o Site

1. Abra o arquivo `index.html` no navegador
2. O Tailwind CSS será carregado via CDN automaticamente
3. Todas as funcionalidades JavaScript estão em `script.js`

### Estrutura de Arquivos

```
landing-page-mediallflix/
├── index.html              # Versão NOVA com Tailwind CSS
├── index-old.html          # Backup da versão anterior
├── script.js               # JavaScript atualizado
├── styles.css              # CSS antigo (não mais usado)
├── styles-old.css          # Backup do CSS antigo
├── package.json            # Configuração Node.js
├── tailwind.config.js      # Configuração Tailwind (não usado com CDN)
├── .gitignore             # Ignora node_modules e dist
├── README-TAILWIND.md     # Este arquivo
└── node_modules/          # Dependências npm
```

---

## 🎯 Classes Tailwind Importantes

### Cores da Marca
```html
<!-- Vermelho Escuro (Borgonha) -->
<div class="bg-burgundy text-burgundy border-burgundy">

<!-- Verde Menta -->
<div class="bg-mint text-mint-dark">

<!-- Azul-Petróleo (CTAs) -->
<button class="bg-teal hover:bg-teal-dark">
```

### Responsividade
```html
<!-- Mobile-first -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
<h1 class="text-4xl sm:text-5xl lg:text-6xl">
<div class="p-4 md:p-6 lg:p-8">
```

### Animações
```html
<!-- Hover Effects -->
<div class="hover:scale-105 hover:shadow-xl transition-all duration-300">

<!-- Animações Customizadas -->
<div class="animate-float-gentle">
<div class="animate-pulse-subtle">
```

---

## 📱 Responsividade

### Desktop (1280px+)
- Layout completo em 3 colunas
- Hero com imagem ao lado
- Grid de planos 3 colunas

### Tablet (768px - 1024px)
- Hero mantém 2 colunas
- Planos em 2 colunas
- Footer em 2 colunas

### Mobile (< 768px)
- Tudo em 1 coluna
- Menu hamburger
- Textos menores
- Espaçamentos reduzidos
- Cards empilhados

---

## ✅ Checklist de Implementação

- [x] Tailwind CSS via CDN configurado
- [x] Paleta de cores customizada (burgundy, mint, teal)
- [x] Todos os componentes migrados para Tailwind
- [x] Header responsivo com menu mobile
- [x] Hero section com animações
- [x] Seção de Benefícios alternada
- [x] Planos com destaque no "Mais Popular"
- [x] Depoimentos em grid responsivo
- [x] FAQ com accordion funcional
- [x] Footer escuro com links organizados
- [x] Botão WhatsApp flutuante
- [x] Scroll reveal animations
- [x] Hover effects em cards e botões
- [x] Script.js atualizado para novas classes
- [x] Mobile-first breakpoints
- [x] Contraste de cores WCAG AAA

---

## 🔧 Melhorias Futuras (Opcionais)

1. **Build Process**:
   - Migrar de CDN para build local
   - Purge de CSS não utilizado
   - Minificação para produção

2. **Imagens Reais**:
   - Substituir SVGs placeholders
   - Adicionar logos de parceiros reais
   - Fotos de depoimentos

3. **Animações Avançadas**:
   - Parallax scroll
   - Micro-interações mais elaboradas
   - Loading states

4. **SEO & Performance**:
   - Lazy loading de imagens
   - Preload de fontes
   - Service Worker para cache

---

## 📞 Suporte

Para dúvidas ou sugestões sobre a implementação:
- Email: contato@mediallflix.com.br
- WhatsApp: (conforme configurado nos links)

---

## 📄 Licença

© 2025 MediallFlix. Todos os direitos reservados.

---

**Desenvolvido com Tailwind CSS, HTML5, JavaScript e muito ❤️**
