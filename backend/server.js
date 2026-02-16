require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();
app.use(cors());
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "gcash", "paymaya"],
    mode: "payment",
    line_items: req.body.cart.map(item => ({
      price_data: {
        currency: "php",
        product_data: { name: item.name },
        unit_amount: item.price * 100
      },
      quantity: item.qty
    })),
    success_url: "http://localhost:5500/success.html",
    cancel_url: "http://localhost:5500/cart.html"
  });

  res.json({ url: session.url });
});

app.listen(3000, () => console.log("Backend running on port 3000"));
