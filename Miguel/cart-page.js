// cart vem do cart.js (global)
function priceBR(v){
  return v.toLocaleString('pt-BR',{ style:'currency', currency:'BRL' });
}

const left = document.getElementById('cartItems');
const subtotalEl = document.getElementById('subtotal');
const shipEl = document.getElementById('ship');
const totalEl = document.getElementById('total');

function render(){
  left.innerHTML = '';
  const keys = Object.keys(cart);

  if(keys.length === 0){
    left.innerHTML = '<div class="muted">Seu carrinho está vazio.</div>';
    subtotalEl.textContent = 'R$0,00';
    shipEl.textContent = 'R$0,00';
    totalEl.textContent = 'R$0,00';
    return;
  }

  let subtotal = 0;

  keys.forEach(k=>{
    const it = cart[k];
    subtotal += it.price * it.qty;

    const row = document.createElement('div');
    row.className='cart-row';

    row.innerHTML = `
      <img src="..${it.img}" alt="${it.title}">
      <div style="flex:1;min-width:0">
        <div style="font-weight:700">${it.title}</div>
        <div class="muted">Quantidade: ${it.qty}</div>

        <div style="display:flex;align-items:center;gap:8px;margin-top:8px">
          <button class="qty-btn" data-act="dec" data-id="${k}">-</button>
          <div style="min-width:34px;text-align:center">${it.qty}</div>
          <button class="qty-btn" data-act="inc" data-id="${k}">+</button>
          <button class="secondary" data-act="remove" data-id="${k}" style="margin-left:8px">Remover</button>
        </div>
      </div>
      <div style="font-weight:800">${priceBR(it.price * it.qty)}</div>
    `;

    left.appendChild(row);
  });

  const shipping = subtotal >= 500 ? 0 : 29.90;
  const total = subtotal + shipping;

  subtotalEl.textContent = priceBR(subtotal);
  shipEl.textContent = priceBR(shipping);
  totalEl.textContent = priceBR(total);
}

render();

// HANDLERS
left.addEventListener('click', e=>{
  const btn = e.target.closest('[data-act]');
  if(!btn) return;

  const id = btn.getAttribute('data-id');
  const act = btn.getAttribute('data-act');

  if(act==='inc') cart[id].qty += 1;
  if(act==='dec'){
    cart[id].qty -= 1;
    if(cart[id].qty <=0) delete cart[id];
  }
  if(act==='remove'){
    if(confirm('Remover item?')) delete cart[id];
  }

  saveCart();
  render();
});

document.getElementById('backBtn').addEventListener('click', ()=>{
  window.location = '../index.html';
});
