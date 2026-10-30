const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Header, Footer, AlignmentType,
  HeadingLevel, LevelFormat, Table, TableRow, TableCell, WidthType, ShadingType,
  BorderStyle, PageNumber, PageBreak, ExternalHyperlink,
} = require("docx");

const VINHO = "690C0B", VINHO2 = "7C0023", LARANJA = "F48337", AMARELO = "EEAD15";
const TINTA = "1F1A1A", SUAVE = "5B5050", CLARO = "FAF6F1", LARANJA_CLARO = "FFF4EA";
const TIT = "Georgia", TXT = "Calibri";
const SITE = "https://marianafernandesnunes07-hub.github.io/ligadecomerciopucrio.github.io/";
const ADMIN = SITE + "admin/";
const REPO = "https://github.com/marianafernandesnunes07-hub/ligadecomerciopucrio.github.io";
const logo = fs.readFileSync(__dirname + "/../src/imagens/marca/logo.png");
const W = 9638; // largura útil A4 com margens de 2 cm (DXA)

// ---------- ajudantes ----------
const r = (t, o = {}) => new TextRun({ text: t, font: TXT, size: 22, color: TINTA, ...o });
const b = (t, o = {}) => r(t, { bold: true, ...o });
const p = (partes, o = {}) =>
  new Paragraph({ spacing: { after: 140, line: 300 }, children: typeof partes === "string" ? [r(partes)] : partes, ...o });
const h1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(t)] });
const h2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const item = (partes, nivel = 0) =>
  new Paragraph({ numbering: { reference: "bolinha", level: nivel }, spacing: { after: 80, line: 290 },
    children: typeof partes === "string" ? [r(partes)] : partes });
let lista = 0;
const passos = (linhas) => {
  const ref = "passos" + lista++;
  refsPassos.push(ref);
  return linhas.map((l) => new Paragraph({ numbering: { reference: ref, level: 0 }, spacing: { after: 90, line: 290 },
    children: typeof l === "string" ? [r(l)] : l }));
};
const refsPassos = [];
const link = (texto, url) => new ExternalHyperlink({ link: url, children: [r(texto, { color: VINHO2, underline: {} })] });
const cod = (t) => r(t, { font: "Consolas", size: 20, color: VINHO2 });

// Caixa de destaque (célula única com borda lateral colorida).
function caixa(titulo, conteudo, tipo = "cuidado") {
  const cor = tipo === "cuidado" ? LARANJA : tipo === "dica" ? AMARELO : VINHO;
  const fundo = tipo === "cuidado" ? LARANJA_CLARO : CLARO;
  const nada = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  const filhos = [
    new Paragraph({ spacing: { after: 80 }, children: [b(titulo, { color: tipo === "cuidado" ? "A8460A" : VINHO })] }),
    ...conteudo.map((c) => (c instanceof Paragraph ? c : p(c, { spacing: { after: 60, line: 290 } }))),
  ];
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: [W],
    rows: [new TableRow({ children: [new TableCell({
      width: { size: W, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: fundo, color: "auto" },
      margins: { top: 140, bottom: 140, left: 240, right: 200 },
      borders: { top: nada, bottom: nada, right: nada, left: { style: BorderStyle.SINGLE, size: 24, color: cor } },
      children: filhos,
    })] })],
  });
}
const espaco = () => new Paragraph({ spacing: { after: 120 }, children: [] });

// Tabela simples de duas colunas.
function tabela(cabecalho, linhas, larguras = [3200, W - 3200]) {
  const borda = { style: BorderStyle.SINGLE, size: 4, color: "E6DDD5" };
  const bordas = { top: borda, bottom: borda, left: borda, right: borda };
  const cel = (t, i, topo) => new TableCell({
    width: { size: larguras[i], type: WidthType.DXA }, borders: bordas,
    shading: topo ? { type: ShadingType.CLEAR, fill: VINHO, color: "auto" } : undefined,
    margins: { top: 90, bottom: 90, left: 140, right: 140 },
    children: [new Paragraph({ spacing: { line: 276 }, children: Array.isArray(t) ? t : [topo ? b(t, { color: "FFFFFF" }) : r(t)] })],
  });
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: larguras,
    rows: [new TableRow({ tableHeader: true, children: cabecalho.map((t, i) => cel(t, i, true)) }),
      ...linhas.map((l) => new TableRow({ children: l.map((t, i) => cel(t, i, false)) }))],
  });
}

// ---------- capa ----------
const capa = [
  new Paragraph({ spacing: { before: 1400, after: 400 }, alignment: AlignmentType.LEFT,
    children: [new ImageRun({ type: "png", data: logo, transformation: { width: 130, height: 130 } })] }),
  new Paragraph({ spacing: { after: 120 }, children: [r("LIGA DE COMÉRCIO E NEGÓCIOS INTERNACIONAIS · IRI PUC-RIO", { color: "A8460A", bold: true, size: 20, characterSpacing: 20 })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: "Guia do site da LCNI", font: TIT, size: 64, bold: true, color: VINHO })] }),
  new Paragraph({ spacing: { after: 400 }, border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: LARANJA, space: 12 } },
    children: [new TextRun({ text: "Cuidados e passo a passo para adicionar, editar e remover informações", font: TIT, size: 30, color: SUAVE })] }),
  p([b("Para quem: "), r("membros de Marketing e de qualquer GT que publiquem no site, e para a diretoria que gerencia os acessos.")]),
  p([b("Site: "), link(SITE, SITE)]),
  p([b("Painel de publicação: "), link(ADMIN, ADMIN)]),
  p([b("Versão: "), r("outubro de 2026, gestão 2026.2")]),
  new Paragraph({ spacing: { before: 500, after: 160 }, children: [new TextRun({ text: "Neste guia", font: TIT, size: 30, bold: true, color: VINHO })] }),
  ...["1. Como o site funciona", "2. Acessos e segurança", "3. Publicar, editar e remover posts", "4. Eventos",
      "5. Diretoria, depoimentos e contatos", "6. Boas práticas de conteúdo", "7. Se algo der errado", "8. Passagem de gestão"]
    .map((t) => new Paragraph({ spacing: { after: 60 }, children: [r(t, { color: VINHO2 })] })),
  new Paragraph({ children: [new PageBreak()] }),
];

// ---------- conteúdo ----------
const corpo = [
  h1("1. Como o site funciona"),
  p("O site da LCNI não tem servidor nem mensalidade. Todo o conteúdo fica guardado no GitHub, um serviço gratuito que guarda arquivos e o histórico de todas as mudanças. Sempre que alguém salva uma alteração, o próprio GitHub monta o site de novo e coloca no ar em 1 a 2 minutos."),
  p("Para publicar, ninguém precisa mexer em código. O caminho do dia a dia é o painel de publicação, um formulário com campos como título, data, autores, imagem e texto."),
  tabela(["O que você quer mudar", "Onde fica no painel"], [
    ["Artigos, Análise de Conjuntura, Business Case, Em Alta", "Menu da esquerda, com o nome da categoria"],
    ["Visitas guiadas, palestras, Semana de Comércio", "Eventos: Visitas Guiadas / Palestras / Semana"],
    ["Diretoria (nomes, cargos, fotos)", "Institucional → Diretoria"],
    ["Depoimentos", "Institucional → Depoimentos"],
    ["E-mail, Instagram, LinkedIn, logo", "Institucional → Contatos e configurações"],
    ["Textos institucionais (Quem somos, valores, áreas)", "Fora do painel: pedir a quem cuida do código do site"],
  ]),
  espaco(),

  h1("2. Acessos e segurança"),
  h2("2.1 Quem consegue editar"),
  p("Qualquer pessoa consegue abrir o site e até a página do painel, mas só consegue salvar quem é colaborador(a) do repositório no GitHub e entra com um token válido. Sem isso, o GitHub recusa qualquer alteração."),
  p("O repositório é público, ou seja, qualquer pessoa vê o código e os textos. Isso é necessário para a hospedagem gratuita e não dá permissão de edição a ninguém."),
  caixa("Cuidado com o token", [
    "O token funciona como uma senha. Com ele, qualquer pessoa consegue alterar ou apagar conteúdo do site.",
    new Paragraph({ numbering: { reference: "bolinha", level: 0 }, spacing: { after: 60 }, children: [r("Nunca mande o token em grupo, e-mail, print ou documento compartilhado.")] }),
    new Paragraph({ numbering: { reference: "bolinha", level: 0 }, spacing: { after: 60 }, children: [r("Cada pessoa cria o próprio token. Não use o token de outra pessoa.")] }),
    new Paragraph({ numbering: { reference: "bolinha", level: 0 }, spacing: { after: 60 }, children: [r("Se achar que um token vazou, apague-o na hora (veja a seção 2.3) e crie outro.")] }),
  ]),
  espaco(),
  h2("2.2 Primeiro acesso"),
  ...passos([
    [r("Crie uma conta gratuita em "), link("github.com", "https://github.com"), r(", se ainda não tiver.")],
    [r("Peça para quem administra o repositório te adicionar como colaborador(a) em "), b("Settings → Collaborators"), r(". Você recebe um convite por e-mail: aceite.")],
    [r("Crie o seu token: foto do perfil → "), b("Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token"), r(".")],
    [r("Em "), b("Repository access"), r(", escolha "), b("Only select repositories"), r(" e marque só o repositório do site.")],
    [r("Em "), b("Permissions → Contents"), r(", escolha "), b("Read and write"), r(". Não marque mais nada.")],
    [r("Defina uma validade (sugestão: até o fim da gestão), gere o token e guarde num gerenciador de senhas.")],
  ]),
  h2("2.3 Apagar um token"),
  p([r("Foto do perfil → "), b("Settings → Developer settings → Personal access tokens → Fine-grained tokens"), r(" → abra o token → "), b("Delete"), r(". A partir daí ele para de funcionar.")]),

  h1("3. Publicar, editar e remover posts"),
  h2("3.1 Adicionar um post"),
  ...passos([
    [r("Abra o painel: "), link(ADMIN, ADMIN), r(".")],
    [r("Clique em "), b("Sign In with Token"), r(" e cole o seu token.")],
    [r("No menu da esquerda, escolha a categoria: "), b("Artigos, Análise de Conjuntura, Business Case ou Em Alta"), r(".")],
    [r("Clique em "), b("Novo"), r(" e preencha os campos (tabela abaixo).")],
    [r("Confira a pré-visualização e clique em "), b("Salvar"), r(". Em 1 a 2 minutos o post aparece no site, na seção certa.")],
  ]),
  tabela(["Campo", "Como preencher"], [
    ["Título", "Como deve aparecer no site. Evite tudo em caixa alta."],
    ["Data de publicação", "Define a ordem: os mais recentes aparecem primeiro."],
    ["Autores", "Um nome por item. Use nome e sobrenome."],
    ["Breve descrição", "Duas ou três frases. É o texto do card na página Conteúdos e aparece na busca."],
    ["Imagem de capa", "JPG, até 1200 px de largura, de preferência horizontal."],
    ["Descrição da imagem", "Diga o que aparece na foto. Ajuda quem usa leitor de tela e é obrigatória para acessibilidade."],
    ["Empresa ou tema", "Só em Business Case: a empresa ou o tema analisado."],
    ["Texto", "O corpo do post. Use os botões da barra para subtítulo, negrito, link e imagem."],
  ]),
  espaco(),
  caixa("Dicas para o texto", [
    new Paragraph({ numbering: { reference: "bolinha", level: 0 }, spacing: { after: 60 }, children: [r("Copiou do Word ou do Google Docs? Confira se subtítulos e listas vieram certos na pré-visualização.")] }),
    new Paragraph({ numbering: { reference: "bolinha", level: 0 }, spacing: { after: 60 }, children: [r("Use subtítulos do próprio painel em vez de só deixar a linha em negrito.")] }),
    new Paragraph({ numbering: { reference: "bolinha", level: 0 }, spacing: { after: 60 }, children: [r("Coloque as referências no fim, com o link completo.")] }),
  ], "dica"),
  espaco(),
  h2("3.2 Editar um post"),
  ...passos([
    "Entre no painel e abra a categoria do post.",
    "Use a busca ou role a lista até achar o post e clique nele.",
    [r("Faça a correção e clique em "), b("Salvar"), r(". A versão anterior fica guardada no histórico do GitHub.")],
  ]),
  p([b("Mudar um post de categoria: "), r("o painel não move o post. Crie o post na categoria certa (copiando o texto) e depois remova o antigo.")]),
  h2("3.3 Remover um post"),
  ...passos([
    "Abra o post no painel.",
    [r("Clique no menu do post e escolha "), b("Excluir"), r(" (Delete). Confirme.")],
  ]),
  caixa("Antes de excluir", [
    "Remover tira o post do site, mas ele continua recuperável pelo histórico do GitHub. Mesmo assim, combine com a diretoria antes de apagar artigos antigos: o documento do site pede que as publicações antigas sejam preservadas.",
  ]),
  espaco(),

  h1("4. Eventos"),
  p("Eventos funcionam como os posts, nas opções Eventos: Visitas Guiadas, Eventos: Palestras e Eventos: Semana. Os campos são título, data, convidados ou instituição, foto, descrição da foto e um texto curto."),
  tabela(["Opção", "Para que serve"], [
    ["Mostrar só mês e ano", "Quando não se sabe o dia exato. Ex.: \"dezembro de 2024\"."],
    ["Mostrar nos Destaques", "Coloca a visita na seção Destaques da página inicial. O ideal é ter duas visitas marcadas por vez."],
  ]),
  espaco(),
  p("Para editar ou remover, siga os mesmos passos dos posts (seção 3)."),

  h1("5. Diretoria, depoimentos e contatos"),
  h2("5.1 Diretoria"),
  p([r("Em "), b("Institucional → Diretoria"), r(": troque o campo Gestão (ex.: 2027.1), edite nomes e cargos, envie as novas fotos. Use o botão de adicionar para incluir pessoas e o de remover para tirar quem saiu.")]),
  p("Fotos: de preferência quadradas, rosto centralizado, fundo neutro. O site recorta em círculo."),
  p("A ordem no site é a ordem da lista: Presidência, Vice-Presidência, Conteúdo, Marketing, Extensão e Recursos Humanos."),
  h2("5.2 Depoimentos"),
  p([r("Em "), b("Institucional → Depoimentos"), r(". Só publique depoimentos com autorização da pessoa e sem mudar o sentido do texto original.")]),
  h2("5.3 Contatos e configurações"),
  p([r("Em "), b("Institucional → Contatos e configurações"), r(": e-mail, Instagram, LinkedIn e logo. A opção "), b("Mostrar avisos de conteúdo pendente"), r(" liga e desliga as caixas tracejadas \"A completar\" do site. Desligue antes de divulgar o site oficialmente.")]),

  h1("6. Boas práticas de conteúdo"),
  item([b("Imagens leves: "), r("até 1200 px de largura. Fotos direto do celular deixam o site lento. Dá para reduzir em "), link("squoosh.app", "https://squoosh.app"), r(".")]),
  item([b("Direitos de imagem: "), r("use fotos próprias da Liga ou de bancos gratuitos (Unsplash, Pexels). Não use fotos tiradas do Google.")]),
  item([b("Pessoas em fotos: "), r("confirme que quem aparece concorda com a publicação.")]),
  item([b("Revisão: "), r("peça para outra pessoa ler antes de publicar. Erros publicados aparecem para todo mundo.")]),
  item([b("Padrão de títulos: "), r("só a primeira letra maiúscula (e nomes próprios). Evite caixa alta.")]),
  item([b("Datas: "), r("use a data real de publicação, para manter a ordem certa.")]),
  espaco(),

  h1("7. Se algo der errado"),
  tabela(["Problema", "O que fazer"], [
    ["Salvei e o site não mudou", "Espere 2 minutos e recarregue a página (no celular, feche e abra o navegador). Se continuar igual, veja a linha de baixo."],
    ["Publicação com erro", [r("No GitHub, abra a aba "), b("Actions"), r(" do repositório. Um X vermelho em \"Publicar site\" mostra que algo falhou. Avise quem cuida do site e mande o link dessa página.")]],
    ["O painel não aceita meu token", "O token pode ter vencido ou não ter a permissão Contents: Read and write. Crie outro (seção 2.2)."],
    ["Apaguei algo sem querer", "Nada se perde. O histórico do GitHub guarda todas as versões. Avise quem cuida do site para restaurar."],
    ["Um token vazou", "Apague o token na hora (seção 2.3) e avise a diretoria."],
  ]),
  espaco(),

  h1("8. Passagem de gestão"),
  p("Checklist para fazer a cada troca de gestão:"),
  ...passos([
    "Adicionar como colaboradores os novos membros que vão publicar.",
    [r("Remover dos colaboradores quem saiu da Liga ("), b("Settings → Collaborators"), r(").")],
    "Pedir para quem saiu apagar os próprios tokens.",
    "Atualizar a Diretoria no painel (gestão, nomes, cargos e fotos).",
    "Conferir se e-mail, Instagram e LinkedIn continuam certos.",
    "Repassar este guia para quem entrou.",
    "Garantir que pelo menos duas pessoas da diretoria sejam administradoras do repositório, para o site nunca depender de uma pessoa só.",
  ]),
  espaco(),
  caixa("Links úteis", [
    p([b("Site: "), link(SITE, SITE)], { spacing: { after: 60 } }),
    p([b("Painel: "), link(ADMIN, ADMIN)], { spacing: { after: 60 } }),
    p([b("Repositório no GitHub: "), link(REPO, REPO)], { spacing: { after: 60 } }),
    p([b("Guia técnico (para quem mexe no código): "), r("arquivo README.md no repositório")], { spacing: { after: 0 } }),
  ], "info"),
];

// ---------- documento ----------
const doc = new Document({
  creator: "LCNI PUC-Rio",
  title: "Guia do site da LCNI",
  styles: {
    default: { document: { run: { font: TXT, size: 22, color: TINTA } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: TIT, size: 36, bold: true, color: VINHO },
        paragraph: { spacing: { before: 480, after: 200 }, outlineLevel: 0, keepNext: true,
          border: { top: { style: BorderStyle.SINGLE, size: 18, color: LARANJA, space: 10 } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: TIT, size: 26, bold: true, color: VINHO2 },
        paragraph: { spacing: { before: 300, after: 120 }, outlineLevel: 1, keepNext: true } },
    ],
  },
  numbering: {
    config: [
      { reference: "bolinha", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { run: { color: LARANJA }, paragraph: { indent: { left: 400, hanging: 260 } } } }] },
      ...Array.from({ length: 12 }, (_, i) => ({ reference: "passos" + i, levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
        alignment: AlignmentType.LEFT, style: { run: { color: VINHO, bold: true }, paragraph: { indent: { left: 440, hanging: 340 } } } }] })),
    ],
  },
  sections: [
    { properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } }, titlePage: true },
      headers: {
        default: new Header({ children: [new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "E6DDD5", space: 6 } },
          children: [new ImageRun({ type: "png", data: logo, transformation: { width: 26, height: 26 } }),
            r("   Guia do site da LCNI", { color: VINHO, bold: true, size: 18 })] })] }),
        first: new Header({ children: [new Paragraph({ children: [] })] }),
      },
      footers: {
        default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT,
          children: [r("Liga de Comércio e Negócios Internacionais · IRI PUC-Rio    ", { color: SUAVE, size: 16 }),
            new TextRun({ children: [PageNumber.CURRENT], font: TXT, size: 18, bold: true, color: VINHO })] })] }),
        first: new Footer({ children: [new Paragraph({ children: [] })] }),
      },
      children: [...capa, ...corpo] },
  ],
});

Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(__dirname + "/Guia do site da LCNI.docx", buf); console.log("ok"); });
