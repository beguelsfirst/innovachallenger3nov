/* ============================================================
   SISTEMA DE PRODUTOS DINÂMICO — URL PARAMETER
   ============================================================ */

// Ler parâmetro ID da URL
function getProdutoID() {
    const url = new URL(window.location.href);
    return url.searchParams.get("id");
}

// Carregar produto correspondente
function carregarProduto() {
    const id = getProdutoID();

    if (!id || !produtosDB[id]) {
        document.querySelector(".container-produto").innerHTML = `
            <h2 style="text-align:center; color:#fff;">
                Produto não encontrado 😢
            </h2>
        `;
        return;
    }

    const produto = produtosDB[id];

    // Preenche informações
    document.querySelector(".produto-nome").textContent = produto.nome;
    document.querySelector(".produto-preco").textContent = produto.preco;
    document.querySelector(".produto-descricao").innerHTML = produto.descricao;

    // Imagem principal
    document.querySelector(".produto-imagem img").src = produto.imagens[0];

    // Detalhes
    const lista = document.querySelector(".produto-detalhes ul");
    lista.innerHTML = "";
    produto.detalhes.forEach(det => {
        const li = document.createElement("li");
        li.textContent = det;
        lista.appendChild(li);
    });

    gerarMiniaturas(produto.imagens);
}

/* Miniaturas (estilo Amazon) */
function gerarMiniaturas(imagens) {
    const container = document.createElement("div");
    container.classList.add("miniaturas-container");

    imagens.forEach((src, index) => {
        const thumb = document.createElement("img");
        thumb.src = src;
        thumb.classList.add("miniatura");
        thumb.onclick = () => trocarImagemPrincipal(src);

        container.appendChild(thumb);
    });

    document.querySelector(".produto-imagem").appendChild(container);
}

function trocarImagemPrincipal(src) {
    const img = document.querySelector(".produto-imagem img");
    img.style.opacity = "0";

    setTimeout(() => {
        img.src = src;
        img.style.opacity = "1";
    }, 200);
}

/* Aviso ao adicionar ao carrinho */
function adicionarCarrinho() {
    const aviso = document.getElementById("aviso");
    aviso.classList.add("ativo");
    setTimeout(() => aviso.classList.remove("ativo"), 2500);
}

document.addEventListener("DOMContentLoaded", carregarProduto);
