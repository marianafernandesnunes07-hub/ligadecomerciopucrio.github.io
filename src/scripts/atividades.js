// Slides das atividades em Nossas Áreas.
// Clicar na foto ou na seta da direita leva à próxima atividade; a última volta para a primeira.
// Sem JavaScript, os slides continuam passando com o dedo ou o trackpad.
document.querySelectorAll("[data-atividades]").forEach((bloco) => {
  const trilho = bloco.querySelector(".atividades__trilho");
  const slides = [...trilho.querySelectorAll(".atividade")];
  const controles = bloco.querySelector(".atividades__controles");
  if (!controles || slides.length < 2) return;
  controles.hidden = false;
  const pontos = [...bloco.querySelectorAll(".atividades__ponto")];

  const atual = () => Math.round(trilho.scrollLeft / trilho.clientWidth);
  const irPara = (i) => {
    const n = (i + slides.length) % slides.length;
    trilho.scrollTo({ left: n * trilho.clientWidth, behavior: "smooth" });
  };
  const marcar = () => {
    const i = atual();
    pontos.forEach((p, j) => p.setAttribute("aria-current", j === i ? "true" : "false"));
  };

  bloco.querySelectorAll("[data-direcao]").forEach((b) =>
    b.addEventListener("click", () => irPara(atual() + Number(b.dataset.direcao)))
  );
  pontos.forEach((p, j) => p.addEventListener("click", () => irPara(j)));

  // A foto funciona como "próxima".
  slides.forEach((slide) => {
    const area = slide.querySelector(".atividade__foto-area");
    if (!area) return;
    area.addEventListener("click", () => irPara(atual() + 1));
    area.classList.add("atividade__foto-area--clicavel");
    area.title = "Próxima atividade";
  });

  // Setas do teclado quando o trilho está em foco.
  trilho.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); irPara(atual() + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); irPara(atual() - 1); }
  });

  trilho.addEventListener("scroll", marcar, { passive: true });
  marcar();
});
