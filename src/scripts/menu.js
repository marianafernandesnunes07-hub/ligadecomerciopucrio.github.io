// Abre e fecha o menu no celular.
// A classe "js" no <html> avisa ao CSS que o JavaScript está funcionando;
// sem ela, o menu fica sempre visível (assim ninguém fica sem navegação).
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const botao = document.querySelector(".cabecalho__botao-menu");
  const nav = document.querySelector(".cabecalho__nav");
  if (!botao || !nav) return;
  const rotulo = botao.querySelector(".visualmente-oculto");

  function definirAberto(aberto) {
    botao.setAttribute("aria-expanded", String(aberto));
    nav.classList.toggle("aberto", aberto);
    rotulo.textContent = aberto ? "Fechar menu" : "Abrir menu";
  }

  botao.addEventListener("click", () => {
    definirAberto(botao.getAttribute("aria-expanded") !== "true");
  });

  // Fecha com a tecla Esc e devolve o foco ao botão.
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && nav.classList.contains("aberto")) {
      definirAberto(false);
      botao.focus();
    }
  });

  // Fecha ao clicar num link (ex.: "Contato" leva para a mesma página).
  nav.addEventListener("click", (evento) => {
    if (evento.target.closest("a")) definirAberto(false);
  });
});
