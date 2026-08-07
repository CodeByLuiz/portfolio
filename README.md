# Portfólio — Sumi-E Strike

Versão em **HTML, CSS e JavaScript puros** (sem Tailwind/CDN) do hero do
seu portfólio, seguindo o design system descrito em `DESIGN.md`.

## Estrutura

```
portfolio/
├── index.html          → estrutura da página (HTML semântico)
├── css/
│   └── style.css        → todos os estilos, com os tokens do design
│                           system como variáveis CSS (:root)
├── js/
│   ├── shader.js         → fundo animado em WebGL (fumaça/tinta)
│   ├── embers.js          → partículas de brasa flutuantes
│   └── main.js             → ponto de entrada geral (vazio, pronto
│                              para as próximas seções)
└── assets/
    └── (coloque aqui sua foto: portrait.jpg)
```

## Como usar

1. Abra `index.html` direto no navegador — não precisa de build nem
   servidor.
2. Troque o texto "SEU" / "NOME" em `index.html` pelo seu nome.
3. Troque o `src` da imagem em `.hero__portrait-img` pela sua foto
   (recomendado: colocar o arquivo em `assets/portrait.jpg` e apontar
   o `src` para lá, já deixei um comentário no HTML no lugar certo).
4. Os textos de status ("Full Stack Developer") e o subtítulo também
   ficam em `index.html`, dentro da seção `.hero`.

## Como estender

O `DESIGN.md` descreve mais componentes do sistema (sidebar de menu,
cards de skill com barra de energia, timeline vertical, inputs) que
ainda não existem no HTML — só o Hero (Stage 01) foi convertido.
Para adicionar uma nova seção:

1. Crie um novo `<section>` dentro de `<main>` no `index.html`.
2. Adicione as classes e estilos correspondentes em `css/style.css`,
   reaproveitando as variáveis já definidas em `:root` (cores,
   tipografia, espaçamento) — assim tudo continua consistente com o
   design system.
3. Se a seção precisar de interatividade, escreva a lógica em
   `js/main.js` (ou crie um novo arquivo `js/nome-da-secao.js` e
   importe-o em `index.html`, como foi feito com `shader.js` e
   `embers.js`).

## Notas técnicas

- Todas as cores, fontes e espaçamentos do `DESIGN.md` estão
  centralizados como variáveis CSS no topo de `css/style.css` — mude
  ali para atualizar o tema em todo o site.
- `shader.js` e `embers.js` são efeitos puramente decorativos e se
  auto-inicializam; se o navegador não suportar WebGL, o site
  continua funcionando normalmente (só sem o fundo animado).
- `prefers-reduced-motion` é respeitado (reduz as animações para
  quem tem essa preferência ativada no sistema).
