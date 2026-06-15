const form = document.querySelector("form");
const btnCalcular = document.querySelector("#btnCalcular");
const pesoInput = document.querySelector("#peso");
const alturaInput = document.querySelector("#altura");
const res = document.querySelector(".res");

const classificacoes = [
  { limite: 17, resultado: "Muito abaixo do peso" },
  { limite: 18.5, resultado: "Abaixo do peso" },
  { limite: 25, resultado: "Peso Normal" },
  { limite: 30, resultado: "Acima do peso" },
  { limite: 35, resultado: "Obesidade I" },
  { limite: 40, resultado: "Obesidade II (severa)" },
  { limite: Infinity, resultado: "Obesidade III (mórbida)" },
];

function buscarResultado(imc) {
  return classificacoes.find((classificacao) => imc < classificacao.limite).resultado;
}

function mostrarResultado(peso, altura, imc, resultado) {
  res.innerHTML = `
    <div class="status">
      <p>Peso</p>
      <p>Altura</p>
      <p>IMC</p>
      <p>Resultado</p>
    </div>
    <div class="parametro">
      <p>${peso}</p>
      <p>${altura}</p>
      <p>${imc}</p>
      <p>${resultado}</p>
    </div>
  `;
}

function calcular(event) {
  event.preventDefault();

  const peso = Number(pesoInput.value);
  const altura = Number(alturaInput.value) / 100;

  if (!Number.isFinite(peso) || !Number.isFinite(altura) || peso <= 0 || altura <= 0) {
    res.textContent = "ERRO";
    return;
  }

  const imc = peso / altura ** 2;
  const imcFormatado = imc.toFixed(2);
  const resultado = buscarResultado(Number(imcFormatado));

  mostrarResultado(pesoInput.value, altura, imcFormatado, resultado);

  pesoInput.value = "";
  alturaInput.value = "";
  btnCalcular.value = "Refazer";
}

form.addEventListener("submit", calcular);
