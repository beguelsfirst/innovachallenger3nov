// ============================================================
// INTEGRAÇÃO REAL COM O BANCO DE DADOS LOCAL (produtosDB)
// ============================================================

// Transformar o banco em array usado pela HOME
const products = Object.values(produtosDB).map(p => ({
  id: p.id,
  title: p.nome,
  price: p.preco,
  img: p.imagens[0] // primeira imagem do produto
}));

// Utilitário para formatação em BRL
const priceBR = v =>
  Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// ============================================================
// CARRINHO (localStorage)
// ============================================================

let cart = JSON.parse(localStorage.getItem("loja_cart") || "{}");

function saveCart() {
  localStorage.setItem("loja_cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = Object.values(cart).reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById("cartCount");
  el.style.display = count > 0 ? "flex" : "none";
  el.textContent = count;
}

// ============================================================
// RENDERIZAÇÃO DOS PRODUTOS
// ============================================================

const grid = document.getElementById("productsGrid");

function renderProducts(list) {
  grid.innerHTML = "";

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" class="thumb product-open" data-id="${p.id}" />

      <div class="prod-title product-open" data-id="${p.id}">
          ${p.title}
      </div>

      <div class="price-row">
        <div class="price">${priceBR(p.price)}</div>
        <button class="add" data-add="${p.id}">Adicionar</button>
      </div>
    `;

    grid.appendChild(card);
  });
}

renderProducts(products);

// ============================================================
// ABRIR PÁGINA DE PRODUTO
// ============================================================

document.body.addEventListener("click", e => {
  const open = e.target.closest(".product-open");
  if (open) {
    const id = open.getAttribute("data-id");
    window.location.href = `Eduarda/produto.html?id=${id}`;
  }
});

// ============================================================
// ADICIONAR AO CARRINHO
// ============================================================

document.body.addEventListener("click", e => {
  const btn = e.target.closest("[data-add]");
  if (!btn) return;

  const id = btn.getAttribute("data-add");

  // Buscar produto no banco real
  const prod = products.find(x => x.id === id);

  if (!cart[id]) cart[id] = { ...prod, qty: 0 };
  cart[id].qty++;

  saveCart();

  btn.textContent = "Adicionado ✓";
  setTimeout(() => (btn.textContent = "Adicionar"), 800);
});

// ============================================================
// BUSCA
// ============================================================

document.getElementById("searchInput").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(q)
  );
  renderProducts(filtered);
});

// ============================================================
// MODAL DO CARRINHO
// ============================================================

const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

function renderCart() {
  cartItems.innerHTML = "";

  const keys = Object.keys(cart);

  if (keys.length === 0) {
    cartItems.innerHTML =
      '<div style="color:var(--muted)">Seu carrinho está vazio.</div>';
    cartTotal.textContent = "R$0,00";
    return;
  }

  let total = 0;

  keys.forEach(k => {
    const it = cart[k];
    total += it.price * it.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${it.img}" class="cart-thumb" />
      <div style="flex:1">
        <div style="font-weight:700">${it.title}</div>
        <div style="color:var(--muted);font-size:13px">
          ${priceBR(it.price)} x ${it.qty}
        </div>
      </div>

      <div class="qty">
        <button class="ghost" data-act="dec" data-id="${k}">-</button>
        <div style="min-width:18px;text-align:center">${it.qty}</div>
        <button class="ghost" data-act="inc" data-id="${k}">+</button>
        <button class="ghost" data-act="remove" data-id="${k}" style="margin-left:6px">
          Remover
        </button>
      </div>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = priceBR(total);
}

document.getElementById("openCart").addEventListener("click", () => {
  renderCart();
  cartModal.style.display = "block";
});

document.getElementById("closeCart").addEventListener("click", () => {
  cartModal.style.display = "none";
});

// Ações internas do carrinho
cartItems.addEventListener("click", e => {
  const btn = e.target.closest("[data-act]");
  if (!btn) return;

  const id = btn.dataset.id;
  const act = btn.dataset.act;

  if (act === "inc") cart[id].qty++;
  if (act === "dec") {
    cart[id].qty--;
    if (cart[id].qty <= 0) delete cart[id];
  }
  if (act === "remove") delete cart[id];

  saveCart();
  renderCart();
});

// ============================================================
// SCROLL AO CLICAR EM “Comprar agora”
// ============================================================

document.getElementById("shopNow").addEventListener("click", () => {
  window.scrollTo({
    top: grid.offsetTop - 20,
    behavior: "smooth"
  });
});

// Inicializar contador do carrinho
updateCartCount();
