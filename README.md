# Padoca Real | Landing page

Proposta de landing page para a Padoca Real (Três Lagoas, MS). Site estático: só HTML, CSS e JavaScript, sem instalar nada.

> Proposta de layout para apresentação. Não é o site oficial da padaria. Logo e fotos pertencem aos seus titulares.

## Como rodar no VS Code

1. Abra a pasta `padoca-real` no VS Code (Arquivo > Abrir Pasta).
2. Instale a extensão **Live Server** (o VS Code vai sugerir, ou procure por "Live Server" de Ritwick Dey).
3. Clique com o botão direito em `index.html` > **Open with Live Server**.

Também funciona só dando dois cliques em `index.html`. A internet é necessária apenas para carregar as fontes do Google (Alfa Slab One e Nunito). Sem internet, a página usa fontes padrão do sistema.

## Estrutura

```
padoca-real/
├── index.html          # estrutura e textos da página
├── css/
│   └── styles.css      # estilos, cores e temas (claro/escuro)
├── js/
│   └── main.js         # botão de tema e animação de entrada
├── assets/img/
│   ├── logo-padoca-real.jpg
│   ├── favicon.png
│   ├── gergelim-recheado.jpg
│   ├── paezinhos-gratinados.jpg
│   └── enrolado-recheado.jpg
└── .vscode/            # sugestão da extensão Live Server
```

## O que editar

**Dados que faltam** (aparecem tracejados na página). Procure por `class="ph"` em `index.html`:

- Preços dos três produtos (`R$ __,__`)
- Horários de funcionamento
- Endereço completo e link do Google Maps
- WhatsApp, Instagram e delivery

Para o botão "Pedir pelo WhatsApp", troque o `href="#visite"` por `https://wa.me/55SEUNUMEROCOMDDD`.

**Textos e nomes dos produtos** são sugestões. Confirme com a padaria.

**Cores e temas**: no início de `css/styles.css` ficam as variáveis de cor.

- `:root[data-theme="light"]` é o tema claro (branco como base).
- `:root[data-theme="dark"]` é o tema escuro (marrom como base).

O tema inicial é o escuro. Para abrir no claro por padrão, troque `data-theme="dark"` por `"light"` na tag `<html>` e `var t='dark'` por `var t='light'` no script do `<head>` de `index.html`. A escolha do visitante fica salva no navegador.

**Novas fotos**: coloque o arquivo em `assets/img/` e troque o `src` da imagem no `index.html`. Prefira JPG com até 1000 px de largura.

## Antes de publicar

- Preencha os campos tracejados e remova o aviso "Proposta de layout" (topo e rodapé) só se a padaria autorizar o uso da marca e das fotos.
- Para colocar no ar, qualquer hospedagem estática serve (GitHub Pages, Netlify, Vercel ou a hospedagem da padaria): basta enviar a pasta inteira.
