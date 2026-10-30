// Configuração do Eleventy (gerador do site).
// Em resumo: lê os arquivos de "src/", monta as páginas e salva o site pronto em "_site/".
// Quem só publica posts não precisa mexer aqui.

import { HtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
  // Corrige automaticamente os links quando o site fica numa subpasta
  // (ex.: usuario.github.io/ligadecomerciopucrio/). Assim, nos arquivos,
  // basta escrever caminhos começando com "/" (ex.: /imagens/posts/foto.jpg).
  eleventyConfig.addPlugin(HtmlBasePlugin);

  // Arquivos copiados sem alteração para o site final.
  eleventyConfig.addPassthroughCopy("src/imagens");
  eleventyConfig.addPassthroughCopy("src/estilos");
  eleventyConfig.addPassthroughCopy("src/scripts");
  // O painel de publicação fica num endereço secreto, sem link em nenhuma página.
  // Quem visita o site não vê nenhum botão de login. /admin/ não existe mais.
  // Para trocar o endereço (ex.: na passagem de gestão), mude só este nome.
  const ENDERECO_PAINEL = "painel-xvt6abgsya";
  eleventyConfig.addPassthroughCopy({ "admin": ENDERECO_PAINEL });

  // Ordena do mais recente para o mais antigo usando o campo "data" do post.
  const porDataDesc = (a, b) => new Date(b.data.data) - new Date(a.data.data);

  // Coleção com todas as publicações (pasta src/conteudos).
  // Arquivos que começam com "_" (como o modelo) são ignorados.
  eleventyConfig.addCollection("publicacoes", (api) =>
    api
      .getFilteredByGlob("src/conteudos/**/*.md")
      .filter((p) => !p.inputPath.split("/").pop().startsWith("_"))
      .sort(porDataDesc)
  );

  // Coleção com todos os eventos (pasta src/eventos).
  eleventyConfig.addCollection("eventos", (api) =>
    api
      .getFilteredByGlob("src/eventos/**/*.md")
      .filter((p) => !p.inputPath.split("/").pop().startsWith("_"))
      .sort(porDataDesc)
  );

  // Filtra uma coleção pela categoria (ex.: "artigos").
  eleventyConfig.addFilter("daCategoria", (lista, categoria) =>
    (lista || []).filter((item) => item.data.categoria === categoria)
  );

  // Formata datas em português. Ex.: 29 de julho de 2026.
  // "mes" mostra só mês e ano. Ex.: dezembro de 2024.
  eleventyConfig.addFilter("dataBR", (valor, formato) => {
    if (!valor) return "";
    const d = new Date(valor);
    const opcoes =
      formato === "mes"
        ? { month: "long", year: "numeric", timeZone: "UTC" }
        : { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" };
    return d.toLocaleDateString("pt-BR", opcoes);
  });

  // Ano atual (usado no rodapé).
  eleventyConfig.addFilter("ano", () => new Date().getFullYear());

  // Data no formato de máquina (usado na tag <time>).
  eleventyConfig.addFilter("dataISO", (valor) =>
    valor ? new Date(valor).toISOString().slice(0, 10) : ""
  );

  // Junta uma lista de autores em texto: "A, B e C".
  eleventyConfig.addFilter("juntarNomes", (lista) => {
    if (!lista) return "";
    if (!Array.isArray(lista)) return lista;
    if (lista.length < 2) return lista.join("");
    return lista.slice(0, -1).join(", ") + " e " + lista.at(-1);
  });

  // Encurta um texto sem cortar palavras no meio.
  eleventyConfig.addFilter("resumir", (texto, limite = 220) => {
    if (!texto || texto.length <= limite) return texto || "";
    return texto.slice(0, texto.lastIndexOf(" ", limite)) + "…";
  });

  return {
    dir: {
      input: "src",
      includes: "_modelos",
      data: "_dados",
      output: "_site",
    },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
    // Permite publicar numa subpasta (ex.: usuario.github.io/repositorio/).
    pathPrefix: process.env.PATH_PREFIX || "/",
  };
}
