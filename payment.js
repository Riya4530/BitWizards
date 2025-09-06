document.addEventListener("DOMContentLoaded", () => {
  const orderItemsEl = document.getElementById("order-items");
  const orderTotalEl = document.getElementById("order-total");
  const paymentForm = document.getElementById("payment-form");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  // Render cart items in order summary
  orderItemsEl.innerHTML = "";
  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("summary-item");

    div.innerHTML = `
      <span class="order-item-name">
        ${item.name}
      </span>
      <span>Qty: ${item.qty} × Days: ${item.days || 1} × ₹${item.price}/day = ₹${item.price * item.qty * (item.days || 1)}</span>
    `;
    orderItemsEl.appendChild(div);
    total += item.price * item.qty * (item.days || 1);
  });

  orderTotalEl.textContent = `₹${total}`;

  // Payment form submit
  paymentForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("✅ Payment Successful! Thank you for shopping with GreenRent.");
    localStorage.removeItem("cart");
    window.location.href = "order-confo.html"; // back to home
  });
});