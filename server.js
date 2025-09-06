const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ✅ Product list (original + 12 new)
let products = [
  // Original
  { name: "DSLR Camera", category: "Electronics", price: 500 },
  { name: "Power Drill", category: "Tools", price: 80 },
  { name: "Camping Tent", category: "Outdoor Gear", price: 200 },
  { name: "Projector", category: "Electronics", price: 800 },
  { name: "Chair", category: "Furniture", price: 100 },
  { name: "Sport shoes", category: "Footwear", price: 150 },
  { name: "Bike", category: "Vehicles", price: 4000 },
  { name: "Activa 3G", category: "Vehicles", price: 3500 },
  { name: "Blazer", category: "Clothing", price: 150 },
  { name: "Fashion Shoes", category: "Footwear", price: 400 },
  { name: "Bag", category: "Accessories", price: 100 },
  { name: "Necklace", category: "Jewelry", price: 5000 },

  // 4 New (previous step)
  { name: "Bluetooth Speaker", category: "Electronics", price: 300 },
  { name: "Ladder", category: "Tools", price: 100 },
  { name: "Sleeping Bag", category: "Outdoor Gear", price: 120 },
  { name: "Dining Table", category: "Furniture", price: 400 },

  // ✅ Latest 8 added
  { name: "Laptop", category: "Electronics", price: 1200 },
  { name: "GoPro Camera", category: "Electronics", price: 700 },
  { name: "Study Table", category: "Furniture", price: 250 },
  { name: "Sofa", category: "Furniture", price: 500 },
  { name: "Mountain Bike", category: "Outdoor Gear", price: 1500 },
  { name: "Fishing Kit", category: "Outdoor Gear", price: 300 },
  { name: "Winter Jacket", category: "Clothing", price: 200 },
  { name: "Designer Dress", category: "Clothing", price: 350 }
];

// ✅ Search API
app.get("/search", (req, res) => {
  const query = (req.query.q || "").toLowerCase();
  const category = req.query.category || "All Categories";

  let results = products.filter((p) =>
    p.name.toLowerCase().includes(query)
  );

  if (category !== "All Categories") {
    results = results.filter((p) => p.category === category);
  }

  res.json(results);
});

// ✅ Cart storage (in-memory)
let cart = [];

app.post("/cart", (req, res) => {
  const { name, price } = req.body;
  cart.push({ name, price });
  res.json({ message: "Added to cart", cart });
});

app.get("/cart", (req, res) => {
  res.json(cart);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
