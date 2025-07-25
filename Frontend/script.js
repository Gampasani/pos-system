/*
let cart = [];

function addItem() {
  const input = document.getElementById('stockName');
  const name = input.value || "Custom Item";
  addToCart(name, 1.00);
  input.value = "";
}

function addPreset(name, price) {
  addToCart(name, price);
}

function addToCart(name, price) {
  const id = Date.now();
  const item = {
    id,
    name,
    qty: 1,
    price,
    tax: parseFloat((price * 0.08).toFixed(2))
  };
  cart.push(item);
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) item.qty = 1;
  renderCart();
}

function renderCart() {
  const tbody = document.getElementById('cartBody');
  tbody.innerHTML = "";
  let subtotal = 0, tax = 0, totalItems = 0;

  cart.forEach(item => {
    const total = ((item.price + item.tax) * item.qty).toFixed(2);
    subtotal += item.price * item.qty;
    tax += item.tax * item.qty;
    totalItems += item.qty;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.qty}</td>
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${item.tax.toFixed(2)}</td>
      <td>$${total}</td>
      <td>
        <button onclick="updateQty(${item.id}, 1)">+</button>
        <button onclick="updateQty(${item.id}, -1)">-</button>
      </td>
      <td><button onclick="removeItem(${item.id})">X</button></td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("itemCount").textContent = totalItems;
  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("tax").textContent = tax.toFixed(2);
  document.getElementById("total").textContent = (subtotal + tax).toFixed(2);
  document.getElementById("payBtn").textContent = `Pay $${(subtotal + tax).toFixed(2)}`;
}

function pay() {
  if (cart.length === 0) {
    alert("Cart is empty. Please add items before paying.");
    return;
  }

  const totalAmount = (cart.reduce((sum, item) => sum + (item.price + item.tax) * item.qty, 0)).toFixed(2);
  alert(`Payment of $${totalAmount} successful!`);

  cart = [];
  renderCart();
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function showLogin() {
  document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
}

function handleLogin() {
  const username = document.getElementById("loginUser").value;
  const password = document.getElementById("loginPass").value;

  if (!username || !password) {
    alert("Please enter username and password.");
    return;
  }

  alert("Logged in successfully!");
  closeLogin();
}
*/
let cart = [];

// Fetch product info from backend using name
async function fetchProductByName(name) {
  try {
    const res = await fetch("http://localhost:5000/api/products");
    const products = await res.json();
    const match = products.find(p => p.productName.toLowerCase() === name.toLowerCase());
    return match;
  } catch (err) {
    console.error("Error fetching product:", err);
    return null;
  }
}

async function addPreset(name) {
  const product = await fetchProductByName(name);
  if (product) {
    addToCart(product.productName, parseFloat(product.salePrice));
  } else {
    alert("Product not found in database.");
  }
}

async function addItem() {
  const input = document.getElementById('stockName');
  const name = input.value || "Custom Item";
  const product = await fetchProductByName(name);
  if (product) {
    addToCart(product.productName, parseFloat(product.salePrice));
  } else {
    alert("Item not found in database.");
  }
  input.value = "";
}

function addToCart(name, price) {
  const id = Date.now();
  const item = {
    id,
    name,
    qty: 1,
    price,
    tax: parseFloat((price * 0.08).toFixed(2))
  };
  cart.push(item);
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty < 1) item.qty = 1;
  renderCart();
}

function renderCart() {
  const tbody = document.getElementById('cartBody');
  tbody.innerHTML = "";
  let subtotal = 0, tax = 0, totalItems = 0;

  cart.forEach(item => {
    const total = ((item.price + item.tax) * item.qty).toFixed(2);
    subtotal += item.price * item.qty;
    tax += item.tax * item.qty;
    totalItems += item.qty;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.qty}</td>
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${item.tax.toFixed(2)}</td>
      <td>$${total}</td>
      <td>
        <button onclick="updateQty(${item.id}, 1)">+</button>
        <button onclick="updateQty(${item.id}, -1)">-</button>
      </td>
      <td><button onclick="removeItem(${item.id})">X</button></td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("itemCount").textContent = totalItems;
  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("tax").textContent = tax.toFixed(2);
  document.getElementById("total").textContent = (subtotal + tax).toFixed(2);
  document.getElementById("payBtn").textContent = `Pay $${(subtotal + tax).toFixed(2)}`;
}

async function pay() {
  if (cart.length === 0) {
    alert("Cart is empty. Please add items before paying.");
    return;
  }

  const totalAmount = cart.reduce((sum, item) => sum + (item.price + item.tax) * item.qty, 0).toFixed(2);

  for (const item of cart) {
    await fetch("http://localhost:5000/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: item.name, qty: item.qty })
    });
  }

  alert(`Payment of $${totalAmount} successful!`);
  cart = [];
  renderCart();
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function showLogin() {
  document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
}

function handleLogin() {
  const username = document.getElementById("loginUser").value;
  const password = document.getElementById("loginPass").value;

  if (!username || !password) {
    alert("Please enter username and password.");
    return;
  }

  alert("Logged in successfully!");
  closeLogin();
}
