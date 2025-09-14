const loginSection = document.getElementById("loginSection");
const menuSection = document.getElementById("menuSection");
const addressSection = document.getElementById("addressSection");
const userDisplay = document.getElementById("userDisplay");
const menuGrid = document.getElementById("menuGrid");
const orderSummary = document.getElementById("orderSummary");
const popup = document.getElementById("popup");

let currentItem = null;

// 10 Menu items with images
const menuItems = [
  { name: "Paneer Butter Masala", type: "veg", price: 220, img: "imajes/butter-paneer-masala.jpg" },
  { name: "Veg Biryani", type: "veg", price: 200, img: "imajes/Veg-Biryani.jpg" },
  { name: "Butter Chicken", type: "nonveg", price: 280, img: "imajes/butter-chicken.jpg" },
  { name: "Chicken Biryani", type: "nonveg", price: 300, img: "imajes/chicken-biryani.jpg" },
  { name: "Masala Dosa", type: "veg", price: 150, img: "imajes/Masala-dosa.webp" },
  { name: "Chole Bhature", type: "veg", price: 180, img: "imajes/Chole_Bhature.JPG" },
  { name: "Fish Curry", type: "nonveg", price: 320, img: "imajes/Fish-Curry.jpg" },
  { name: "Mutton Curry", type: "nonveg", price: 350, img: "imajes/Mutton-Curry.jpg" },
  { name: "Paneer Tikka", type: "veg", price: 250, img: "imajes/paneer-tikka.jpg" },
  { name: "Egg Curry", type: "nonveg", price: 220, img: "imajes/Egg-Curry.jpg" }
];

// Login
document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password) {
    userDisplay.textContent = username;
    loginSection.classList.add("hidden");
    menuSection.classList.remove("hidden");
    renderMenu("all");
  } else {
    alert("Please enter username and password");
  }
});

// Render menu
function renderMenu(filter) {
  menuGrid.innerHTML = "";
  const filtered = menuItems.filter(item =>
    filter === "all" ? true : item.type === filter
  );

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>₹${item.price}</p>
      <button onclick="orderItem('${item.name}', ${item.price})">Order</button>
    `;
    menuGrid.appendChild(card);
  });
}

// Filter dropdown
document.getElementById("filterSelect").addEventListener("change", (e) => {
  renderMenu(e.target.value);
});

// Order item
function orderItem(name, price) {
  currentItem = { name, price };
  menuSection.classList.add("hidden");
  addressSection.classList.remove("hidden");
  orderSummary.textContent = `You selected: ${name} - ₹${price}`;
}

// Confirm order
document.getElementById("confirmOrderBtn").addEventListener("click", () => {
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const error = document.getElementById("formError");

  if (!phone || !address) {
    error.textContent = "Please enter phone number and address";
    error.classList.remove("hidden");
    return;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    error.textContent = "Enter a valid 10-digit phone number";
    error.classList.remove("hidden");
    return;
  }

  error.classList.add("hidden");
  addressSection.classList.add("hidden");
  popup.classList.remove("hidden");

  setTimeout(() => {
    popup.classList.add("hidden");
    menuSection.classList.remove("hidden");
  }, 2000);
});
