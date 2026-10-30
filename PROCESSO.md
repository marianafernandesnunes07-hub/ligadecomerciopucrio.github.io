# Novo site da LCNI PUC-Rio: diário do processo

Registro das decisões, do que foi importado e do que ainda falta. Atualizar a cada etapa.

## Etapa 0. Levantamento (29/10/2026)

Fontes: documento "Novo site da Liga de Comércio e Negócios Internacionais | PUC-Rio" e o site antigo no Wix (https://ligadecomercioiri.wixsite.com/lci-pucrio). Estrutura e dúvidas enviadas para a Mari.

## Etapa 1. Primeira versão completa (30/10/2026)

A Mari pediu para subir o projeto inteiro. As dúvidas da Etapa 0 ainda não tinham resposta, então as decisões abertas foram tomadas de forma **provisória** (lista abaixo) e o que o documento não informa aparece no site como caixa tracejada **"A completar"**. Nenhum texto institucional foi inventado: todos vêm do documento ou do Wix.

### O que foi feito
- Site em Eleventy + HTML + CSS + JS puro, sem backend. Páginas: Início, Nossas Áreas, Conteúdos (filtros por categoria e busca por palavra-chave), Eventos e página individual de cada post.
- Painel de publicação (Sveltia CMS) em `/admin/`, com formulários para posts, eventos, diretoria, depoimentos e contatos.
- Publicação automática no GitHub Pages a cada alteração (`.github/workflows/publicar.yml`).
- README.md, COMO-PUBLICAR.md (guia para o Marketing) e modelos copiáveis de post e de evento.
- Conferido: contraste WCAG AA de todas as combinações de cor, menu do celular, navegação por teclado, filtros, busca, layout em 390 px e 1366 px sem rolagem lateral.

### Migração do Wix
O texto completo dos posts foi exportado pelo navegador do app (a rede do servidor bloqueia o Wix) e convertido para Markdown.

- **109 publicações** migradas com texto integral, data original, capa e imagens internas (2023: 35, 2024: 36, 2025: 21, 2026: 17).
- 1 post do sitemap do Wix não tinha conteúdo e ficou de fora: `e-commerce-transfronteiriço-compras-internacionais-e-os-desafios-alfandegários`.
- Autores foram tirados da linha "Por:" / "Texto por:" de cada post. 3 posts não têm essa linha e ficaram sem autor no card.
- Cada post guarda o endereço antigo no campo `origemWix`.
- Diretoria 2026.2: nomes, cargos e fotos do Wix.
- Logo atual (`LCI g1.png`) em `src/imagens/marca/logo.png`.
- 3 palestras de 2023 cadastradas a partir dos cartazes que estavam na página Eventos do Wix (BRICS com Alexandre Souto, aula com Jonas Vieira, aulão com Carlos Frederico Coelho).
- Imagens reduzidas para no máximo 1200 px (de 100 MB para cerca de 21 MB).

### Decisões provisórias (confirmar ou trocar)
| Tema | Decisão provisória | Onde trocar |
|---|---|---|
| Stack | Eleventy + Sveltia CMS + GitHub Pages | |
| Nome e sigla | LCNI, como no documento. Logo ainda é o antigo, com "LCI" | `src/_dados/site.json`, `src/imagens/marca/logo.png` |
| Amarelo | `#eead15`, tirado do amarelo do logo atual | `src/estilos/tokens.css` |
| Vinho / laranja | `#690c0b` principal, `#7c0023` em links e hover; `#f48337` em detalhes gráficos, `#fd7e14` no foco do teclado. Para texto laranja sobre fundo claro foi criado `#a8460a`, porque o laranja da marca não passa no contraste | `src/estilos/tokens.css` |
| Tipografia | Fraunces (títulos) e Source Sans 3 (texto), gratuitas no Google Fonts | `src/estilos/tokens.css` e `src/_modelos/base.njk` |
| Instagram | @ligadecomercio.iri (o que aparece na página de Contatos do Wix) | `src/_dados/site.json` |
| LinkedIn | https://www.linkedin.com/company/ligadecomercio/ (link do Wix sem os parâmetros de administrador) | `src/_dados/site.json` |
| Categorias dos posts antigos | "Notícias da Semana" → Análise de Conjuntura (13); "Fatos!" → Em Alta (9); todo o resto → Artigos (87). Business Case começa vazio | mover o arquivo entre as pastas de `src/conteudos/` |
| Depoimentos | Texto original do documento, mantendo "LCI" | `src/_dados/depoimentos.json` |
| Redes individuais da diretoria | Não usadas (o link da presidente no Wix apontava para outra pessoa) | |
| Conteúdo do Wix fora do documento | Não migrado: galeria Membros 2025.2, formulário de parceiros, formulário de contato, endereço da sede | |
| Destaques | Visitas C&A (dez/2024) e Rio Brasil Terminal (set/2025), textos da seção 4.1 do documento | `src/eventos/visitas-guiadas/` |
| Títulos dos posts | Mantidos como no Wix, inclusive os em caixa alta e os com prefixo "Artigo -" | |
| Duplicados | "Reconstruindo o Comércio Internacional com o Meio Ambiente" existe duas vezes no Wix (versões um pouco diferentes). As duas foram migradas | apagar uma em `src/conteudos/artigos/` |

### Pendências (aparecem como "A completar" no site)
1. Semana de Workshops: data, temas e convidados (Destaques e página Eventos).
2. Palestras de 2024 em diante e o workshop de 1 dia com 4 profissionais.
3. Texto de introdução geral da página Eventos.
4. Descrições de Identidade Visual, Business Case e Em Alta no bloco Marketing (Nossas Áreas).
5. Fotos das visitas guiadas (C&A e Rio Brasil Terminal).
6. Logo definitivo da LCNI.
7. Autorização dos depoimentos para publicação.
8. Frase incompleta do documento sobre os cards de Business Case. Por enquanto o card mostra título, empresa ou tema (campo opcional), data, autores e descrição.

Para esconder todas as caixas "A completar" de uma vez: `mostrarPendencias: false` em `src/_dados/site.json`.

## Etapa 2. Site no ar e ajustes (30/10/2026)

### Endereços
- Site: https://marianafernandesnunes07-hub.github.io/ligadecomerciopucrio.github.io/
- Painel de publicação: https://marianafernandesnunes07-hub.github.io/ligadecomerciopucrio.github.io/admin/
- Repositório: https://github.com/marianafernandesnunes07-hub/ligadecomerciopucrio.github.io

### O que aconteceu
- A Mari renomeou o repositório de `ligadecomerciopucrio` para `ligadecomerciopucrio.github.io`. Esse nome **não** deixa o site na raiz: o GitHub só faz isso quando o repositório se chama exatamente `<conta-dona>.github.io`. Por isso o endereço tem o nome do repositório como subpasta.
- As primeiras publicações falharam com erro 404 ("Ensure GitHub Pages has been enabled") porque o Pages ainda não estava ligado. Resolvido em Settings → Pages → Source: **GitHub Actions**. Desde então cada alteração na `main` publica sozinha.
- O workflow (`.github/workflows/publicar.yml`) agora detecta sozinho se o site fica na raiz (repositório `conta.github.io`) ou numa subpasta. O painel (`admin/config.yml`) e os guias foram atualizados com o nome novo.
- A pedido da Mari, os parágrafos passaram a ocupar toda a largura do conteúdo em todas as páginas (`--largura-texto: 100%` em `tokens.css`). Quem somos e Nosso Propósito agora têm título em cima e texto embaixo. Para voltar a estreitar o texto dos posts, trocar para `42rem`.

### Segurança (resposta dada à Mari)
- Qualquer pessoa abre o site e a página do painel, mas só salva quem é colaborador(a) do repositório e entra com um token com permissão Contents: Read and write.
- O repositório é público (necessário para o Pages gratuito): todos veem o código, ninguém edita sem permissão.
- Na troca de gestão: remover quem saiu em Settings → Collaborators, pedir que apaguem os tokens e adicionar quem entrou.

### Guia em Word
- `guia/Guia do site da LCNI.docx`: guia de cuidados e de como adicionar, editar e remover informações, na identidade da Liga (logo, vinho, laranja, amarelo; fontes Georgia e Calibri). 6 páginas: como o site funciona, acessos e segurança, posts, eventos, diretoria/depoimentos/contatos, boas práticas, problemas comuns e checklist de passagem de gestão.
- Para gerar de novo depois de editar o texto: `node guia/gerar-guia.js` (precisa do pacote `docx`: `npm install docx`).

### Arquivos temporários no Mac da Mari (podem ser apagados)
- Em Downloads: `wixposts.json`, `wiximgs1.json`, `wiximgs2.json`, `lcni.json` e dois arquivos ocultos que começam com `.Q6L2SF6YDW`.
- A pasta `Projetos/lcni-wix-export`.

### Próximos passos sugeridos
1. Responder as pendências da Etapa 1 (decisões provisórias e caixas "A completar").
2. Criar uma organização da Liga no GitHub (ex.: `lcni-pucrio`) e transferir o repositório como `lcni-pucrio.github.io`, para ter endereço curto e não depender de conta pessoal. Depois, atualizar `repo` e `site_url` em `admin/config.yml`.
3. Testar o painel com um token antes de passar para o Marketing.
4. Ter pelo menos duas pessoas da diretoria como administradoras do repositório.

## Etapa 3. Ajustes de layout pedidos pela Mari (30/10/2026)

- **Página inicial**: títulos de Quem somos e Nosso Propósito centralizados (classe `titulo-secao--centro`). A partir de Nossos Valores, tudo continua alinhado à esquerda.
- **Valores**: sem os números 01, 02, 03; só os nomes.
- **Destaques**: todo card tem foto no topo. Sem foto, aparece um espaço tracejado "Foto a completar" (some com `mostrarPendencias: false`). A foto da Semana fica em `src/_dados/semana.json` (painel: Institucional → Foto da Semana).
- **Depoimentos**: campo de foto opcional (`foto` em `depoimentos.json`, imagens em `src/imagens/depoimentos/`). Sem foto, aparecem as iniciais num círculo vinho.
- **Diretoria**: fotos quadradas (cantos levemente arredondados) e mais espaço entre elas.
- **Eventos**: Visitas Guiadas e Semana com foto à esquerda e texto à direita (no celular, foto em cima). Palestras viraram carrossel com setas, da mais recente para a mais antiga; as setas só aparecem quando há mais palestras do que cabem na tela. Script em `src/scripts/carrossel.js`.
- Novas pendências: fotos dos depoimentos e foto da Semana.
- **Cabeçalho das páginas internas** (Conteúdos, Eventos e Nossas Áreas): faixa vinho com título branco (`.cabecalho-pagina`). Em Conteúdos e Eventos, o resto da página fica no off-white de Nosso Propósito (`fundo: claro` no topo do arquivo da página).

## Como retomar numa conversa nova
Pedir para o Claude ler este PROCESSO.md (no Projeto "Site Liga de Comércio PUC-Rio" ou no repositório) e conectar o repositório `marianafernandesnunes07-hub/ligadecomerciopucrio.github.io`.
