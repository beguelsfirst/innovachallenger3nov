// =========================================
// SCRIPT PRINCIPAL - Página de Produto
// =========================================

const produtos = [
  {
    id: "1",
    nome: "Camiseta Tech Azul",
    descricao: "Camiseta esportiva feita com tecido respirável e design moderno. Ideal para treinos ou uso casual.",
    preco: 89.9,
    imagem: "https://via.placeholder.com/500x500/0077ff/ffffff?text=Camiseta+Tech",
    detalhes: ["100% poliéster", "Secagem rápida", "Tecido leve e confortável"]
  },
  {
    id: "2",
    nome: "Tênis Laranja Pro",
    descricao: "Tênis de corrida com amortecimento avançado e solado antiderrapante. Estilo e performance no mesmo produto.",
    preco: 299.9,
    imagem: "https://via.placeholder.com/500x500/ff7a00/ffffff?text=Tênis+Pro",
    detalhes: ["Solado de borracha", "Palmilha anatômica", "Ideal para corridas longas"]
  },
  {
    id: "3",
    nome: "Mochila Preta Urbana",
    descricao: "Design moderno com compartimentos inteligentes e zíper reforçado. Ideal para o dia a dia urbano.",
    preco: 159.9,
    imagem: "https://via.placeholder.com/500x500/121212/ffffff?text=Mochila+Urbana",
    detalhes: ["Compartimento para notebook", "Material resistente à água", "Design ergonômico"]
  },
  // 🆕 PRODUTO DE TESTE ADICIONADO
  {
    id: "4",
    nome: "Garrafa Térmica Verde",
    descricao: "Mantém sua bebida quente ou fria por até 12 horas. Ideal para viagens, estudos ou trabalho.",
    preco: 119.9,
    imagem: "https://via.placeholder.com/500x500/2ecc71/ffffff?text=Garrafa+T%C3%A9rmica+Verde",
    detalhes: ["Capacidade: 750ml", "Aço inoxidável", "Tampa com vedação dupla", "Sem BPA"]
  }
];

// Captura o ID da URL
function obterIDProduto() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Carrega o produto correspondente
function carregarProduto() {
  const id = obterIDProduto();
  const produto = produtos.find(p => p.id === id);

  if (!produto) {
    document.querySelector("main").innerHTML = `
      <h2 style="text-align:center; color:var(--cor-laranja)">
        Produto não encontrado 😢
      </h2>`;
    return;
  }

  // Preenche os dados do produto
  document.getElementById("produto-nome").textContent = produto.nome;
  document.getElementById("produto-descricao").textContent = produto.descricao;
  document.getElementById("produto-preco").textContent = `R$ ${produto.preco.toFixed(2)}`;
  document.getElementById("produto-imagem").src = produto.imagem;
  document.getElementById("produto-imagem").alt = produto.nome;

  const detalhesLista = document.getElementById("produto-detalhes");
  detalhesLista.innerHTML = "";
  produto.detalhes.forEach(det => {
    const li = document.createElement("li");
    li.textContent = det;
    detalhesLista.appendChild(li);
  });

  // Ação de adicionar ao carrinho com feedback visual
  const btn = document.getElementById("btn-adicionar");
  btn.addEventListener("click", () => {
    const qtd = parseInt(document.getElementById("quantidade").value);
    mostrarMensagem(`${qtd}x ${produto.nome} adicionado(s) ao carrinho! 🛒`);
  });
}

// Função para exibir uma mensagem temporária na tela
function mostrarMensagem(texto) {
  const aviso = document.createElement("div");
  aviso.textContent = texto;
  aviso.className = "aviso";
  document.body.appendChild(aviso);

  setTimeout(() => {
    aviso.classList.add("ativo");
  }, 50);

  setTimeout(() => {
    aviso.classList.remove("ativo");
    setTimeout(() => aviso.remove(), 300);
  }, 2000);
}

// Inicializa
window.addEventListener("DOMContentLoaded", carregarProduto);
