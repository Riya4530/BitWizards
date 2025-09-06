document.addEventListener("DOMContentLoaded", () => {
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartItemsEl.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td>
          <input type="number" min="1" value="${item.qty}" data-index="${index}" class="qty-input">
        </td>
        <td>
          <input type="number" min="1" value="${item.days || 1}" data-index="${index}" class="days-input">
        </td>
        <td>${item.price * item.qty * (item.days || 1)}</td>
        <td><button class="remove-btn" data-index="${index}">Remove</button></td>
      `;

      total += item.price * item.qty * (item.days || 1);
      cartItemsEl.appendChild(row);
    });

    cartTotalEl.textContent = total;
    localStorage.setItem("cart", JSON.stringify(cart));
  }


  cartItemsEl.addEventListener("input", e => {
    if (e.target.classList.contains("qty-input")) {
      const index = e.target.dataset.index;
      cart[index].qty = parseInt(e.target.value);
      renderCart();
    } else if (e.target.classList.contains("days-input")) {
      const index = e.target.dataset.index;
      cart[index].days = parseInt(e.target.value);
      renderCart();
    }
  });

  cartItemsEl.addEventListener("click", e => {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      renderCart();
    }
  });

  document.getElementById("checkout-btn").addEventListener("click", () => {
    alert("Proceeding to checkout 🚀");
  });

  renderCart();
});