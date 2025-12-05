// ============================================================
// CARRINHO GLOBAL — usado por TODAS as páginas
// ============================================================

let cart = JSON.parse(localStorage.getItem("loja_cart") || "{}");

function saveCart() {
  localStorage.setItem("loja_cart", JSON.stringify(cart));
}

function priceBR(v) {
  return Number(v).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (!el) return;

  const total = Object.values(cart).reduce((s, i) => s + i.qty, 0);
  el.style.display = total > 0 ? "flex" : "none";
  el.textContent = total;
}

// atualizar quantidade sempre que carregar a página
updateCartCount();
