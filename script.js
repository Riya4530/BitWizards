document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchDropdown = document.querySelector('.search-dropdown');
    const cartCount = document.getElementById('cart-count');

    // 🔹 Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // ------------------ SEARCH + CATEGORY FILTER ------------------
    if (searchInput && searchDropdown) {
        searchInput.addEventListener('input', filterProducts);
        searchDropdown.addEventListener('change', () => {
            const category = searchDropdown.value;
            if (category !== "All Categories") {
                window.location.href = `allrentals.html?category=${encodeURIComponent(category)}`;
            } else {
                window.location.href = `allrentals.html`;
            }
        });
    }

    function filterProducts() {
        const query = searchInput.value.toLowerCase();
        const selectedCategory = searchDropdown.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            const productCategory = card.dataset.category ? card.dataset.category.toLowerCase() : "all";

            const matchesName = productName.includes(query);
            const matchesCategory = (selectedCategory === "all categories" || productCategory === selectedCategory);

            card.style.display = (matchesName && matchesCategory) ? "block" : "none";
        });
    }

    // ------------------ CART FUNCTIONALITY ------------------
    function updateCartCount() {
        if (cartCount) {
            const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
            cartCount.textContent = totalQty;
        }
    }

    function setupCartButtons() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const name = button.dataset.product;
                const price = parseInt(button.dataset.price);

                // Check if item already in cart
                const existing = cart.find(item => item.name === name);
                if (existing) {
                    existing.qty += 1;
                } else {
                    cart.push({ name, price, qty: 1 });
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();

                alert(`${name} reserved for ${price}rs/day!`);
            });
        });
    }

    // Init
    setupCartButtons();
    updateCartCount();
});
