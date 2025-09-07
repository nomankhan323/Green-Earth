const api = {
    allPlants: "https://openapi.programming-hero.com/api/plants",
    categories: "https://openapi.programming-hero.com/api/categories",
    category: (id) => `https://openapi.programming-hero.com/api/category/${id}`,
    plant: (id) => `https://openapi.programming-hero.com/api/plant/${id}`,
};

const categoriesEl = document.getElementById("categories")
const cardsEl = document.getElementById("cards");
const spinnerEl = document.getElementById("spinner");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const modalEl = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");
document.getElementById("year").textContent = new Date().getFullYear();

let carts = {};
let currentCategory = "all";


// spinner 
const showSpinner = () => spinnerEl.classList.remove("hidden");
const hideSpinner = () => spinnerEl.classList.add("hidden");

async function loadCategories() {
    try {
        const res = await fetch(api.categories);
        const data = await res.json();
        const categories = data.categories || data.data;
        renderCategories(categories);
    }
    catch (err) {
        console.error(err);
    }
}


function renderCategories(categories) {
    categoriesEl.innerHTML = "";

    const allBtn = document.createElement("button");
    allBtn.textContent = "All trees";
    allBtn.className = "px-3 py-2 rounded-lg bg-green-600 text-white";
    allBtn.addEventListener("click", () => {
        currentCategory = "all";
        loadAllPlants();
        highlightCategory(allBtn);
        renderCart();
    });
    categoriesEl.appendChild(allBtn);

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat.name || cat.category_name;
        btn.className = "px-3 py-2 rounded-lg bg-green-200 hover:bg-green-300";
        btn.addEventListener("click", () => {
            currentCategory = cat.id;
            loadPlantsByCategory(cat.id);
            highlightCategory(btn)
            renderCart();
        });
        categoriesEl.appendChild(btn);
    });
}

function highlightCategory(selectedBtn) {
    document.querySelectorAll("#categories button")
        .forEach(b => b.classList.remove("bg-green-600", "text-white"));
    selectedBtn.classList.add("bg-green-600", "text-white");
}

async function loadAllPlants() {
    showSpinner();
    try {
        const res = await fetch(api.allPlants);
        const data = await res.json();
        renderCards(data.plants);
    }
    catch (err) {
        console.error(err);
    }
    finally {
        hideSpinner();
    }
}

async function loadPlantsByCategory(id) {
    showSpinner();
    try {
        const res = await fetch(api.category(id));
        const data = await res.json();

        const plants = data.plants || data.data?.plants || [];
        if (plants.length > 0) {
            renderCards(plants);
        }
        else {
            cardsEl.innerHTML = "<p>No plants found in this category.</p>";
        }
    }
    catch (err) {
        console.error("Error loading plants by category:", err);
        cardsEl.innerHTML = "<p>Failed to load plants.</P>";
    }
    finally {
        hideSpinner();
    }
}


function renderCards(plants) {
    cardsEl.innerHTML = "";
    plants.forEach(plant => {
        const div = document.createElement("div");
        div.className = "bg-white shadow rounded-lg p-4 text-center";

        const addBtn = document.createElement("button");
        addBtn.textContent = "Add to cart";
        addBtn.className = "mt-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800";
        addBtn.addEventListener("click", () => addToCart(plant));

        div.innerHTML = `
        <img src="${plant.image}" class="h-32 w-full object-cover rounded mb-2">
        <h4 class="text-lg font-bold text-green-900 cursor-pointer">${plant.name}</h4>
        <p class="text-slate-600 text-sm">${plant.category}</p>
        <p class="font-semibold text-green-800">৳${plant.price}</p>
        `;

        div.querySelector("h4").addEventListener("click", () => openModal(plant.id));

        div.appendChild(addBtn);
        cardsEl.appendChild(div);
    });
}


async function openModal(id) {
    try {
        const res = await fetch(api.plant(id));
        const data = await res.json();
        const plant = data.plant;
        modalContent.innerHTML = `
            <img src="${plant.image}" class="h-40 w-full object-cover rounded mb-2">
            <h4 class="text-xl font-bold text-green-900">${plant.name}</h4>
            <p class="text-slate-600">${plant.description}</p>
            <p class="mt-2 font-semibold">Category: ${plant.category}</p>
            <p class="font-semibold">Price: ৳${plant.price}</p>
    `;
        modalEl.classList.remove("hidden");
    }
    catch (err) {
        console.error(err);
    }
}

modalClose.onclick = () => modalEl.classList.add("hidden");
modalEl.onclick = e => {
    if (e.target === modalEl) modalEl.classList.add("hidden");
};

// cart 
function addToCart(plant) {
    if (!carts[currentCategory]) carts[currentCategory] = [];
    const cart = carts[currentCategory];
    const existing = cart.find(item => item.id === plant.id);
    if (existing) existing.qty++;
    else cart.push({ ...plant, qty: 1 });
    renderCart();
}

function removeFromCart(id) {
    const cart = carts[currentCategory];
    if (!cart) return;
    carts[currentCategory] = cart.filter(item => item.id !== id);
    renderCart();
}
function renderCart() {
    const cart = carts[currentCategory] || [];
    cartItemsEl.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const li = document.createElement("li");
        li.className = "flex justify-between items-center bg-green-50 px-2 py-1 rounded";
        li.innerHTML = `
        <span>${item.name} ৳${item.price} × ${item.qty}</span>
        <button class="text-red-500">❌</button>
        `;
        li.querySelector("button").addEventListener("click", () => removeFromCart(item.id));
        cartItemsEl.appendChild(li);
    });
    cartTotalEl.textContent = "৳" + total;
}

loadCategories();
loadAllPlants();
