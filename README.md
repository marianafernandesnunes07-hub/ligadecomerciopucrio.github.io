# Site da LCNI PUC-Rio

Site institucional da **Liga de Comércio e Negócios Internacionais** do Instituto de Relações Internacionais da PUC-Rio. Substitui o antigo site no Wix (ligadecomercioiri.wixsite.com/lci-pucrio).

- **Para publicar posts e eventos:** leia o [COMO-PUBLICAR.md](COMO-PUBLICAR.md). Não precisa saber programar.
- **Histórico de decisões e pendências:** [PROCESSO.md](PROCESSO.md).

## Como funciona

O site é **estático**: não tem servidor nem banco de dados, por isso a hospedagem é gratuita (GitHub Pages).

- Cada post é um arquivo de texto (`.md`) dentro de `src/conteudos/<categoria>/`.
- Cada evento é um arquivo `.md` dentro de `src/eventos/<categoria>/`.
- Diretoria, depoimentos e contatos ficam em arquivos `.json` dentro de `src/_dados/`.
- O [Eleventy](https://www.11ty.dev/) junta tudo e gera as páginas. Um post novo aparece sozinho na seção certa.
- Sempre que algo muda na branch `main`, o GitHub monta e publica o site em 1 ou 2 minutos (arquivo `.github/workflows/publicar.yml`).

## Estrutura de pastas

```
├── admin/                    painel de publicação (Sveltia CMS)
│   ├── index.html
│   └── config.yml            campos dos formulários do painel
├── src/
│   ├── _dados/               conteúdo fixo, editável sem mexer em HTML
│   │   ├── site.json         nome, e-mail, redes sociais, logo
│   │   ├── diretoria.json    nomes, cargos e fotos da gestão atual
│   │   ├── depoimentos.json
│   │   └── categorias.json   nomes e textos de introdução das categorias
│   ├── _modelos/             moldes das páginas (cabeçalho, rodapé, post, cards)
│   ├── index.njk             página inicial
│   ├── nossas-areas.njk
│   ├── conteudos.njk         lista de publicações com filtros e busca
│   ├── eventos.njk
│   ├── conteudos/            um .md por publicação, separado por categoria
│   │   └── _modelo-post.md   modelo para copiar
│   ├── eventos/              um .md por evento, separado por categoria
│   │   └── _modelo-evento.md
│   ├── imagens/              posts/, eventos/, diretoria/, marca/
│   ├── estilos/              tokens.css (cores e fontes), base, componentes, paginas
│   └── scripts/              menu.js, filtros-busca.js, depoimentos.js
├── eleventy.config.js        configuração do gerador
└── .github/workflows/publicar.yml
```

## Rodar no seu computador

Precisa do [Node.js](https://nodejs.org/) 20 ou mais novo.

```bash
npm install      # só na primeira vez
npm run dev      # abre o site em http://localhost:8080 e atualiza ao salvar
npm run build    # gera o site pronto na pasta _site/
```

## Publicar

1. Na primeira vez, no GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Depois disso, qualquer alteração na branch `main` publica sozinha. O andamento aparece na aba **Actions**.
3. Endereço: `https://marianafernandesnunes07-hub.github.io/ligadecomerciopucrio/`

**Domínio próprio:** em Settings → Pages → Custom domain. Depois, em `.github/workflows/publicar.yml`, troque `PATH_PREFIX` para `/` e atualize `site_url` em `admin/config.yml`.

## Criar um post

Resumo (o passo a passo completo está no [COMO-PUBLICAR.md](COMO-PUBLICAR.md)):

- **Pelo painel:** abra `<endereço do site>/admin/`, entre com o GitHub, escolha a categoria e clique em "Novo".
- **À mão:** copie `src/conteudos/_modelo-post.md` para a pasta da categoria, renomeie e preencha.

## Mudar cores, fontes e textos

- Cores e fontes: `src/estilos/tokens.css`.
- Textos institucionais (Quem somos, valores, áreas): direto em `src/index.njk` e `src/nossas-areas.njk`.
- Avisos "A completar" (caixas tracejadas): somem do site quando `mostrarPendencias` vira `false` em `src/_dados/site.json`.

## Acessibilidade

O site segue a WCAG 2.1 AA: contraste conferido em todas as combinações de cor, navegação completa por teclado com foco visível, link "Pular para o conteúdo", menu do celular acessível e texto alternativo nas imagens. Ao publicar uma imagem, preencha sempre a descrição dela.
