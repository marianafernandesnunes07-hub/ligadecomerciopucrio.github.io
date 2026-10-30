# Novo site da LCNI PUC-Rio: diário do processo

Registro das decisões, dados importados e pendências do projeto. Atualizar a cada etapa.

## Etapa 0. Levantamento (29/10/2026)

**Fontes usadas**
- Documento "Novo site da Liga de Comércio e Negócios Internacionais | PUC-Rio" (estrutura, textos e diretrizes).
- Site atual no Wix: https://ligadecomercioiri.wixsite.com/lci-pucrio

**Status:** estrutura e dúvidas enviadas para aprovação. Nenhum código escrito ainda.

## Inventário do site atual (Wix)

### Páginas existentes
Página inicial, Publicações (blog), Eventos, Equipe, Contatos.

### Logo
- `LCI g1.png` (ainda com a sigla antiga LCI): https://static.wixstatic.com/media/564580_1813d99e8d4f4a07bae7809fd30f6292~mv2.png

### Publicações (21 posts no blog, todos com "Por:" e "Resumo:" no início)
Categorias no Wix: Artigos, Notícias da Semana, Fatos!

| Data | Título | Autores |
|---|---|---|
| 29/07/2026 | A disputa pelos cabos submarinos: infraestrutura invisível do comércio mundial | Mateus Dias Viana; Juliana Sousa; Guilherme Romano |
| 29/07/2026 | Mercado halal: um caminho estratégico para o crescimento das exportações brasileiras | Luciana Crivellari |
| 29/07/2026 | A tomada de decisão estratégica de armadores frente às barreiras ao transporte marítimo | Isaque Augusto Couto Santos de Oliveira |
| 29/07/2026 | Hospitalidade e globalização: a hotelaria como infraestrutura invisível do comércio e dos negócios internacionais | Mateus Dias Viana |
| 13/07/2026 | Gargalos da competitividade brasileira: uma análise sobre o "custo Brasil" e a internacionalização de médias empresas industriais | Ana Clara Alves Mont'Alvão Fialho |
| 13/07/2026 | Do agronegócio ao petróleo: os pilares do comércio entre Brasil e Emirados Árabes Unidos | Luciana Crivellari |
| 02/07/2026 | O movimento de internacionalização da NFL | Andressa Cardoso do Nascimento |
| 26/06/2026 | O Brasil como hub tecnológico na América Latina | João Daniel Griner |
| 22/06/2026 | Infrações aduaneiras e responsabilidade do importador no direito brasileiro | Guilherme Romano de Siqueira |
| 17/06/2026 | Segurança logística e rotas de comércio: as disputas no Estreito de Ormuz e a competitividade das exportações agrícolas e brasileiras | Ana Clara Alves Mont'Alvão Fialho, Isaque Augusto e Luciana Crivellari |
| 12/06/2026 | Geopolítica da logística e vulnerabilidade do comércio internacional | Isaque Augusto Couto Santos de Oliveira |
| 11/06/2026 | Geopolítica da atenção: plataformas digitais, algoritmos e poder no século XXI | Mateus Dias Viana |
| 09/06/2026 | As relações econômicas entre a África e China | Andressa Cardoso do Nascimento |
| 05/06/2026 | O preço da instabilidade: o comércio marítimo no centro da crise Irã-EUA | Juliana Sousa |
| 29/05/2026 | Facilitação do comércio, eficiência aduaneira e competitividade internacional: uma análise do artigo 10 do AFC | Flávia Luíza Rodrigues |
| 25/05/2026 | O despacho aduaneiro de importação no Brasil e sua modernização com a DUIMP | Guilherme Romano de Siqueira |
| 19/05/2026 | Fintechs e pagamentos internacionais: simplificando transações globais | Andressa Cardoso, Amelie e Flávia Rodrigues |
| 19/12/2025 | Introdução ao comércio marítimo | Juliana Sousa |
| 17/12/2025 | A erosão da hegemonia do dólar: caminhos e desafios da desdolarização do comércio internacional | Mateus Dias Viana, Bento Pimentel, Juliana Sousa |
| 12/12/2025 | O Acordo de Parceria Mercosul-União Europeia e seu desenvolvimento durante os 25 anos | Andressa Cardoso do Nascimento |

Obs.: o Wix mostra só dia e mês nos posts de 2026; o ano foi deduzido pela ordem da lista. Texto completo e imagens de capa de cada post serão baixados na etapa de migração.

### Diretoria 2026.2 (página Equipe)
| Cargo | Nome |
|---|---|
| Presidente | Maria Clara Villanueva |
| Vice-Presidente | Antonella Chacar |
| Diretor de RH | Gabriel Magno |
| Diretor de Conteúdo | Isaque Augusto |
| Diretora de Conteúdo | Ana Clara Fialho |
| Diretora de Marketing | Sarah Liz Moraes |
| Diretora de Marketing | Laura Leite |
| Diretor de Extensão | Matheus Lee |
| Diretora de Extensão | Joice Bezerra |

Fotos individuais disponíveis no Wix.

### Eventos
A página do Wix tem apenas 3 imagens, sem texto. Os dados das visitas (C&A, dez/2024; Rio Brasil Terminal, set/2025) vêm do documento.

### Contato
- E-mail: ligadecomercio.iri@gmail.com
- Instagram: dois perfis aparecem (@lci.pucrio no topo, @ligadecomercio.iri no rodapé e em Contatos)
- LinkedIn: link atual é de visualização de administrador (`/mycompany/?viewAsMember=true`)
- Endereço: Rua Marquês de São Vicente, 225, Vila dos Diretórios, Casa 20, Gávea, Rio de Janeiro - RJ

### Conteúdo do Wix que o documento não prevê
- Galeria "Membros 2025.2" (25 fotos)
- Formulário "Seja nosso parceiro"
- Formulário de contato e endereço da sede

## Proposta técnica (aguardando aprovação)

- **Stack:** Eleventy (11ty) + HTML + CSS puro (sem Tailwind) + JS. Cada post é um arquivo `.md` que vira card automaticamente.
- **Publicação:** painel Sveltia CMS em `/admin`. O marketing preenche um formulário (título, categoria, data, autores, capa, texto) e o painel salva no GitHub. Ninguém mexe em código.
- **Hospedagem:** GitHub Pages ou Cloudflare Pages, gratuita e sem backend.
- **Idioma de arquivos e pastas:** português.
- **GitHub:** a Mari precisa conectar o GitHub em claude.ai (Configurações → Conectores) e criar um repositório vazio, de preferência em conta ou organização da liga. Depois disso, enviar o `dono/nome-do-repo`.

### Estrutura de pastas proposta
```
lcni-site/
├── README.md               # o que é, rodar local, publicar, criar post
├── COMO-PUBLICAR.md        # guia de 1 página para o marketing
├── PROCESSO.md             # este diário
├── package.json
├── eleventy.config.js
├── .github/workflows/publicar.yml
├── admin/                  # painel de publicação (index.html, config.yml)
└── src/
    ├── _dados/             # site.json, diretoria.json, depoimentos.json, destaques.json
    ├── _modelos/           # base, post, evento, cabeçalho, rodapé, card
    ├── index.njk  nossas-areas.njk  conteudos.njk  eventos.njk
    ├── conteudos/          # artigos/, analise-de-conjuntura/, business-case/, em-alta/, _modelo-post.md
    ├── eventos/            # visitas-guiadas/, palestras/, semana/, _modelo-evento.md
    ├── imagens/
    ├── estilos/            # tokens.css, base.css, componentes.css, paginas.css
    └── scripts/            # menu.js, filtros-busca.js, depoimentos.js
```

## Decisões
(Preencher conforme forem confirmadas.)

## Pendências (dúvidas enviadas em 29/10/2026)

**Base**
1. Aprovar a stack acima, com o painel de publicação.
2. Existe domínio próprio? Sem domínio, o endereço será do tipo `nome.github.io/lcni`. O Wix sai do ar depois?

**Identidade**
3. O nome é LCI ou LCNI? O logo do Wix usa "LCI" e o documento lista o "logo definitivo" como pendente.
4. Cores: o amarelo foi citado sem código. Há dois vinhos (#690c0b, #7c0023) e dois laranjas (#f48337, #fd7e14): qual é o principal de cada? Tipografia não definida: posso propor?
5. Os depoimentos citam "LCI": manter o texto original?

**Conteúdo migrado**
6. Categorias do Wix (Artigos, Notícias da Semana, Fatos!) x novas. Os 21 posts parecem todos artigos. Análise de Conjuntura, Business Case e Em Alta têm publicações em algum lugar ou começam vazias?
7. Migrar texto completo e capa de cada post? O autor real será separado do texto ("Por: …") num campo próprio.
8. Diretoria: seguir os nomes do Wix? Os links sociais da presidente apontam para outra pessoa (Larissa Alves). Sugestão: não usar redes individuais.
9. Instagram oficial: @lci.pucrio ou @ligadecomercio.iri? Falta o link público do LinkedIn.
10. Descartar o que o documento não prevê: galeria Membros 2025.2, formulário de parceiros, formulário de contato, endereço da sede?

**Lacunas do documento (não inventar texto)**
11. Destaques: as duas visitas são C&A (dez/2024) e Rio Brasil Terminal (set/2025)?
12. Faltam: dados da Semana de Workshops; registros de palestras (incluindo o workshop com 4 profissionais); introdução geral da página Eventos; descrições de Identidade Visual, Business Case e Em Alta no bloco Marketing; frase incompleta sobre organização dos cards de Business Case.
13. Os depoimentos já têm autorização para publicação?

**Próximo passo:** com as respostas, atualizar este arquivo e começar o código pelo cabeçalho e pela página inicial. Pendências entram como espaço marcado, nunca como texto inventado.
