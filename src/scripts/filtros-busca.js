// Filtros por categoria e busca por palavra-chave na página Conteúdos.
// Tudo acontece no navegador: o script só esconde e mostra os cards que já estão na página.
(() => {
  const form = document.querySelector(".filtros");
  if (!form) return;
  form.hidden = false; // o formulário só aparece quando o script funciona

  const botoes = form.querySelectorAll(".filtro");
  const campo = form.querySelector("#busca");
  const aviso = form.querySelector(".filtros__resultado");
  const secoes = document.querySelectorAll("[data-secao]");

  // Remove acentos e deixa minúsculo, para "comercio" achar "comércio".
  const normalizar = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

  let categoriaAtual = "todas";

  // Se o endereço vier com #artigos, #em-alta etc., já começa filtrado.
  const doEndereco = location.hash.slice(1);
  if ([...botoes].some((b) => b.dataset.filtro === doEndereco)) categoriaAtual = doEndereco;

  function aplicar() {
    const termos = normalizar(campo.value.trim()).split(/\s+/).filter(Boolean);
    let total = 0;

    secoes.forEach((secao) => {
      const categoriaOk = categoriaAtual === "todas" || secao.dataset.secao === categoriaAtual;
      let visiveisNaSecao = 0;

      secao.querySelectorAll(".card").forEach((card) => {
        const texto = normalizar(card.dataset.busca || "");
        const buscaOk = termos.every((t) => texto.includes(t));
        const mostrar = categoriaOk && buscaOk;
        card.hidden = !mostrar;
        if (mostrar) visiveisNaSecao++;
      });

      // Esconde a seção inteira se ela não tem resultados (ou não é a categoria escolhida).
      secao.hidden = !categoriaOk || (termos.length > 0 && visiveisNaSecao === 0);
      total += visiveisNaSecao;
    });

    botoes.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filtro === categoriaAtual)));
    aviso.textContent =
      termos.length || categoriaAtual !== "todas"
        ? total === 1 ? "1 publicação encontrada." : `${total} publicações encontradas.`
        : "";
  }

  botoes.forEach((botao) =>
    botao.addEventListener("click", () => {
      categoriaAtual = botao.dataset.filtro;
      const hash = categoriaAtual === "todas" ? " " : "#" + categoriaAtual;
      history.replaceState(null, "", hash.trim() || location.pathname);
      aplicar();
    })
  );
  campo.addEventListener("input", aplicar);
  form.addEventListener("submit", (e) => e.preventDefault());

  aplicar();
})();
