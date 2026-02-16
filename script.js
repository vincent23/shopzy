const products = [
  {id: 1, name:"Wireless Earbuds", price:999, image:"images/earbuds.jpg"},
  {id: 2, name:"Smart Watch", price:1499, image:"images/watch.avif"},
  {id: 3, name:"USB Charger", price:349, image:"images/usb.jpg"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts(){
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach(p => {
    list.innerHTML += `
    <div class="product">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>₱${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(i => i.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart!");
}

function updateCartCount(){
  const count = cart.reduce((sum,i) => sum + i.qty,0);
  document.getElementById("cartCount").innerText = count;
}

renderProducts();
updateCartCount();