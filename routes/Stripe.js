const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const Order=require('../models/Order');

const stripe = Stripe("sk_test_51N90TmCmDfnXlQ6glt0vFDaIfQiVJs7HHli4ME2hv6ulwwqTJVNcysFELhgrAT37kdIxylh67PmPpz5Bccq5dee800Rl2THMbw");


router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      
      },
    ],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
  });
  res.send({ url: session.url });
});

module.exports=router;