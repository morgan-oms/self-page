<div align="center">

# Morgan Oliveira — site pessoal e blog

**Portfólio e caderno público de pesquisas e estudos de um engenheiro de software mobile.**

[![Astro](https://img.shields.io/badge/Astro-v6-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com)
[![Idiomas](https://img.shields.io/badge/idiomas-EN%20·%20PT%20·%20ES-1E88E5)](#idiomas)

**[morganoms.dev](https://morganoms.dev)** · [LinkedIn](https://www.linkedin.com/in/morgan-oliveira/) · [GitHub](https://github.com/morgan-oms) · [Instagram](https://www.instagram.com/morganoms.dev/)

![Página inicial do site em português](./docs/preview.png)

</div>

## Sobre o projeto

Sou o Morgan, engenheiro de software mobile. Trabalho com produtos de crédito em Flutter, Kotlin e Swift e faço mestrado em Engenharia da Computação na Universidade de Pernambuco, pesquisando modelagem de esquemas NoSQL.

Este repositório é o meu espaço próprio na internet. Ele existe para duas coisas:

1. **Me apresentar.** Um lugar só meu, rápido e bem cuidado, que reúne quem eu sou, onde trabalhei, o que estudei e os projetos que construí. É o link que vai no LinkedIn, no GitHub e em cada conversa com recrutadores e colegas.
2. **Registrar o que eu aprendo.** Por muito tempo minhas anotações ficaram espalhadas entre repositórios, artigos e rascunhos pela metade. O blog é onde elas ganham forma: engenharia mobile, a pesquisa do mestrado e qualquer estudo que valha a pena escrever.

## O que eu almejo

- **Publicar com frequência.** Escrever um post tem que ser tão simples quanto criar um arquivo `.mdx` e dar `git push`. Sem painel, sem banco de dados, sem atrito.
- **Mostrar projetos como estudos de caso.** Cada projeto conta o problema, as decisões técnicas, a stack e o resultado, em vez de ser só um link para um repositório.
- **Alcançar pessoas em três idiomas.** O site existe em inglês, português e espanhol, para conversar com o mercado de fora sem deixar de lado quem está perto.
- **Ser rápido e leve.** As páginas são HTML gerado no build, com JavaScript só onde há interação. A própria performance já diz algo sobre como eu trabalho.
- **Custar quase nada para manter.** Hospedagem no plano gratuito da Cloudflare, poucas dependências e conteúdo versionado junto com o código.

## O que tem no site

- **Página inicial** com apresentação, sobre mim, habilidades, experiência profissional, formação, projetos e contato.
- **Projetos** em cards com imagem, stack e link para o código, além de um botão para ver todos os repositórios.
- **Blog** em MDX, com destaque de código, navegação entre posts e paginação.
- **Três idiomas** com seletor na barra inferior, que leva para a mesma página no outro idioma.
- **Tema claro e escuro.**
- **SEO** com Open Graph, sitemap com as versões de cada idioma, `hreflang` e dados estruturados nos posts.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | [Astro 6](https://astro.build): páginas estáticas e ilhas de interatividade |
| Interface | [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com) e [Motion](https://motion.dev) |
| Conteúdo | MDX com coleções tipadas (Zod) e destaque de código com Shiki |
| Hospedagem | [Cloudflare Workers](https://workers.cloudflare.com) via `@astrojs/cloudflare` |
| Linguagem | TypeScript |
| Pacotes | [pnpm](https://pnpm.io) |

## Como rodar

**Pré-requisitos:** Node.js 22.12 ou mais recente e pnpm (`corepack enable` ou `npm i -g pnpm`).

```bash
git clone git@github.com:morgan-oms/self-page.git
cd self-page
pnpm install
pnpm dev
```

Abra <http://localhost:4321>. As páginas atualizam sozinhas ao salvar um arquivo.

### Comandos

| Comando | O que faz |
| --- | --- |
| `pnpm install` | Instala as dependências |
| `pnpm dev` | Sobe o servidor de desenvolvimento em `localhost:4321` |
| `pnpm build` | Gera a versão de produção em `dist/` |
| `pnpm preview` | Roda a versão de produção localmente |
| `pnpm astro check` | Verifica os tipos do projeto |

### Problemas comuns

- **"Invalid hook call" ou "file does not exist… optimize deps" no navegador:** o cache do Vite ficou desatualizado, o que costuma acontecer ao rodar `pnpm build` com o `pnpm dev` ligado. Pare o servidor, rode `rm -rf node_modules/.vite` e suba de novo.
- **"Ignored build scripts" no `pnpm install`:** o `pnpm-workspace.yaml` já libera os pacotes que precisam disso (esbuild, sharp e workerd). Se aparecer outro pacote, adicione-o em `allowBuilds`.

## Onde editar o conteúdo

| Arquivo | O que controla |
| --- | --- |
| [`src/data/resume.tsx`](src/data/resume.tsx) | Bio, experiências, formação, habilidades, projetos e redes sociais, nos três idiomas |
| [`src/data/config.ts`](src/data/config.ts) | URL do site, SEO, cores do tema e tamanho da fonte |
| [`src/i18n/ui.ts`](src/i18n/ui.ts) | Textos fixos da interface (botões, títulos, mensagens) em cada idioma |
| `src/content/blog/<idioma>/` | Posts do blog |
| `public/` | Foto, logos, imagens dos projetos e favicon |

Os textos que mudam com o idioma são escritos lado a lado:

```tsx
description: {
  en: "Mobile Software Engineer building credit products…",
  "pt-br": "Engenheiro de Software Mobile criando produtos de crédito…",
  es: "Ingeniero de Software Móvil que desarrolla productos de crédito…",
},
```

## Escrevendo um post

1. Crie o arquivo em `src/content/blog/<idioma>/<slug>.mdx`. O idioma é `en`, `pt-br` ou `es`.
2. Para traduzir, use o **mesmo nome de arquivo** nas outras pastas. É o nome que liga as versões entre si.
3. Preencha o cabeçalho:

```mdx
---
title: "Por que criei este blog"
publishedAt: "2026-11-08"
summary: "Uma frase que aparece na lista de posts e nas redes sociais."
image: "/blog/capa.png" # opcional
---

O conteúdo vai aqui. MDX completo: componentes, blocos de código, tudo.
```

4. Rode `pnpm build && pnpm preview` para conferir e faça o `git push`.

Não é obrigatório traduzir tudo. Se um post não existir em algum idioma, o site mostra a versão original com um aviso. A versão original também fica como canônica para o Google, para não contar como conteúdo duplicado.

## Idiomas

| Idioma | Endereço |
| --- | --- |
| Inglês (padrão) | `/`, `/blog/…` |
| Português | `/pt-br/`, `/pt-br/blog/…` |
| Espanhol | `/es/`, `/es/blog/…` |

A lista de idiomas fica em [`src/i18n/config.ts`](src/i18n/config.ts) e no bloco `i18n` do [`astro.config.mjs`](astro.config.mjs). Os dois precisam estar iguais.

## Estrutura

```
src/
├── content/blog/      # Posts, uma pasta por idioma (en, pt-br, es)
├── data/
│   ├── resume.tsx     # Meus dados, nos três idiomas
│   └── config.ts      # Configurações do site e tema
├── i18n/              # Idiomas: rotas, dicionário de textos e contexto React
├── components/        # Componentes de interface
├── routes/            # Corpo das páginas, compartilhado entre os idiomas
├── pages/             # Rotas: /, /blog e /[locale]/…
├── layouts/           # HTML base, SEO e barra de navegação
└── lib/               # Blog por idioma, paginação e utilitários
public/                # Imagens, logos e favicon
docs/                  # Imagens usadas neste README
```

## Publicação

O site está no ar em **[morganoms.dev](https://morganoms.dev)**, servido pelo **Cloudflare Workers**. O `www.morganoms.dev` aponta para o mesmo Worker.

### Deploy automático

O repositório está conectado ao **Workers Builds**, a integração da Cloudflare com o GitHub:

| Evento | O que acontece |
| --- | --- |
| Push na `main` | Build e publicação em produção, em cerca de um minuto |
| Push em outra branch | Build de prévia, com uma URL própria para revisar antes de publicar |

Configuração em **Workers & Pages → self-page → Settings → Builds**:

| Campo | Valor |
| --- | --- |
| Build command | `pnpm build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |
| Versão do Node | definida no [`.node-version`](.node-version) |

Os logs de cada build ficam na aba **Deployments** do Worker.

### Configuração do Worker

- [`wrangler.jsonc`](wrangler.jsonc) define o nome do Worker (`self-page`), os arquivos estáticos e os domínios. Os *Custom Domains* `morganoms.dev` e `www.morganoms.dev` são criados pela Cloudflare no deploy, junto com o DNS e o certificado HTTPS.
- [`public/_headers`](public/_headers) aplica os cabeçalhos de segurança nas páginas estáticas. As páginas renderizadas no servidor recebem os mesmos cabeçalhos pelo [`src/middleware.ts`](src/middleware.ts).
- Se o domínio mudar, atualize também o `site.url` em [`src/data/config.ts`](src/data/config.ts). É ele que gera os links canônicos, o sitemap e o `hreflang`.

### Deploy manual

Para publicar direto da sua máquina, sem passar pelo GitHub:

```bash
pnpm exec wrangler login
pnpm build && pnpm exec wrangler deploy
```

## Próximos passos

- [x] Publicar na Cloudflare com domínio próprio e deploy automático
- [ ] Redirecionar `www.morganoms.dev` para `morganoms.dev`
- [ ] Criar uma imagem de compartilhamento (Open Graph) própria
- [ ] Adicionar comentários nos posts com [Giscus](https://giscus.app)
- [ ] Adicionar busca estática com [Pagefind](https://pagefind.app)
- [ ] Configurar o Cloudflare Web Analytics
- [ ] Criar um contador de visualizações, uma parte dinâmica que mostra o lado back-end
- [ ] Criar as páginas `/uses` e `/now` e um currículo em PDF
- [ ] Escrever sobre a pesquisa do mestrado (EASE-Doc)

## Créditos

- Construído a partir do template [Starfolio](https://github.com/webrating/starfolio), que por sua vez se inspira no portfólio de [dillionverma](https://github.com/dillionverma/portfolio).
- Ícones de marcas do [Simple Icons](https://simpleicons.org) (CC0) e do [Lucide](https://lucide.dev).

## Licença

O código segue a licença [MIT](LICENSE) herdada do template. Os textos, fotos e posts são pessoais: se quiser reaproveitar o código como base para o seu site, fique à vontade, mas troque o conteúdo pelo seu.
