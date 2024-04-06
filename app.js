const express = require("express");
const app = express();
const stripe = require("stripe")("");

const cors = require("cors");
app.use(express.json());
app.use(cors());

// checkout  api
app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  //   console.log(product);
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.dish,
      },
      unit_amount: product.price * 100,
    },
    quantity: product.qnty,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  // lio
  res.json({ id: session.id });
});

app.listen(7000, () => {
  console.log("server start");
});
