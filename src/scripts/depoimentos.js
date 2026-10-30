// Mostra só o começo de cada depoimento e cria o botão "Ler depoimento completo".
// Sem JavaScript, o texto aparece inteiro.
document.querySelectorAll(".depoimento").forEach((card) => {
  const texto = card.querySelector(".depoimento__texto");
  texto.classList.add("recolhido");

  // Se o texto já cabe inteiro, não precisa de botão.
  const paragrafo = texto.querySelector("p");
  if (paragrafo.scrollHeight <= paragrafo.clientHeight + 2) {
    texto.classList.remove("recolhido");
    return;
  }

  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "depoimento__botao";
  botao.setAttribute("aria-expanded", "false");
  botao.setAttribute("aria-controls", texto.id);
  botao.textContent = "Ler depoimento completo";
  texto.after(botao);

  botao.addEventListener("click", () => {
    const abrir = botao.getAttribute("aria-expanded") === "false";
    texto.classList.toggle("recolhido", !abrir);
    botao.setAttribute("aria-expanded", String(abrir));
    botao.textContent = abrir ? "Mostrar menos" : "Ler depoimento completo";
  });
});
