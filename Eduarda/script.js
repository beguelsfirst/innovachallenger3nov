/* ============================================================
   SISTEMA DE PRODUTOS DINÂMICO — CARROSSEL + MINIATURAS
   ============================================================ */

function getProdutoID() {
    const url = new URL(window.location.href);
    return url.searchParams.get("id");
}

function carregarProduto() {
    const id = getProdutoID();
    if (!id || !produtosDB[id]) {
        document.querySelector(".container-produto").innerHTML = `
            <h2 style="text-align:center; color:#fff;">
                Produto não encontrado 😢
            </h2>`;
        return;
    }

    const produto = produtosDB[id];

    document.querySelector(".produto-nome").textContent = produto.nome;
    document.querySelector(".produto-preco").textContent = produto.preco;
    document.querySelector(".produto-descricao").innerHTML = produto.descricao;

    gerarCarrossel(produto.imagens);
    preencherDetalhes(produto.detalhes);
}

function preencherDetalhes(detalhes) {
    const lista = document.querySelector(".produto-detalhes ul");
    lista.innerHTML = "";
    detalhes.forEach(texto => {
        const li = document.createElement("li");
        li.textContent = texto;
        lista.appendChild(li);
    });
}

/* ============================================================
   CARROSSEL DE IMAGENS
   ============================================================ */
let indexAtual = 0;

function gerarCarrossel(imagens) {
    const track = document.getElementById("carousel-track");
    const miniaturas = document.getElementById("miniaturas");

    track.innerHTML = "";
    miniaturas.innerHTML = "";

    imagens.forEach((src, index) => {
        // slide
        const img = document.createElement("img");
        img.src = src;
        track.appendChild(img);

        // miniatura
        const thumb = document.createElement("img");
        thumb.src = src;

        thumb.onclick = () => irParaSlide(index);
        if (index === 0) thumb.classList.add("ativo");

        miniaturas.appendChild(thumb);
    });

    // botões
    document.getElementById("btn-prev").onclick = slideAnterior;
    document.getElementById("btn-next").onclick = proximoSlide;

    // arraste mouse/touch
    configurarArraste(track);

    atualizarCarrossel();
}

function irParaSlide(n) {
    indexAtual = n;
    atualizarCarrossel();
}

function proximoSlide() {
    const total = document.querySelectorAll("#carousel-track img").length;
    indexAtual = (indexAtual + 1) % total;
    atualizarCarrossel();
}

function slideAnterior() {
    const total = document.querySelectorAll("#carousel-track img").length;
    indexAtual = (indexAtual - 1 + total) % total;
    atualizarCarrossel();
}

function atualizarCarrossel() {
    const track = document.getElementById("carousel-track");
    const largura = track.querySelector("img").clientWidth;

    track.style.transform = `translateX(${-indexAtual * largura}px)`;

    document.querySelectorAll("#miniaturas img").forEach((img, i) => {
        img.classList.toggle("ativo", i === indexAtual);
    });
}

/* ============================================================
   SUPORTE A ARRASTE / SWIPE
   ============================================================ */
function configurarArraste(track) {
    let startX = 0;
    let endX = 0;

    track.addEventListener("mousedown", e => startX = e.clientX);
    track.addEventListener("mouseup", e => {
        endX = e.clientX;
        checarArraste();
    });

    track.addEventListener("touchstart", e => startX = e.touches[0].clientX);
    track.addEventListener("touchend", e => {
        endX = e.changedTouches[0].clientX;
        checarArraste();
    });

    function checarArraste() {
        const diff = endX - startX;

        if (diff > 50) slideAnterior();
        if (diff < -50) proximoSlide();
    }
}

/* ============================================================
   AVISO AO ADICIONAR AO CARRINHO
   ============================================================ */
function adicionarCarrinho() {
    const aviso = document.getElementById("aviso");
    aviso.classList.add("ativo");
    setTimeout(() => aviso.classList.remove("ativo"), 2500);
}

document.addEventListener("DOMContentLoaded", carregarProduto);
