// Carrossel das palestras: setas para passar para o lado.
// Sem JavaScript, o trilho continua rolando para o lado com o dedo ou o trackpad.
document.querySelectorAll("[data-carrossel]").forEach((carrossel) => {
  const trilho = carrossel.querySelector(".carrossel__trilho");
  const controles = carrossel.querySelector(".carrossel__controles");
  const [anterior, proximo] = carrossel.querySelectorAll(".carrossel__botao");

  // Liga ou desliga cada seta conforme a posição (e esconde se tudo couber na tela).
  const atualizar = () => {
    const sobra = trilho.scrollWidth - trilho.clientWidth;
    controles.hidden = sobra <= 2;
    anterior.disabled = trilho.scrollLeft <= 2;
    proximo.disabled = trilho.scrollLeft >= sobra - 2;
  };

  carrossel.querySelectorAll(".carrossel__botao").forEach((botao) => {
    botao.addEventListener("click", () => {
      const item = trilho.querySelector(".carrossel__item");
      const passo = item ? item.getBoundingClientRect().width + 24 : trilho.clientWidth;
      trilho.scrollBy({ left: passo * Number(botao.dataset.direcao), behavior: "smooth" });
    });
  });

  trilho.addEventListener("scroll", atualizar, { passive: true });
  window.addEventListener("resize", atualizar);
  atualizar();
});
