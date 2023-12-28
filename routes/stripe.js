const express = require("express");
const router = express.Router();
const Order = require("../models/order");

const {createSession}=require("../controllers/stripe.controller");
const { default: Stripe } = require("stripe");
const isAuthenticated = require("../middlewares/isAuthenticated");

const stripe = Stripe(
  "sk_test_51N90TmCmDfnXlQ6glt0vFDaIfQiVJs7HHli4ME2hv6ulwwqTJVNcysFELhgrAT37kdIxylh67PmPpz5Bccq5dee800Rl2THMbw"
);

router.post("/create-checkout-session",isAuthenticated,createSession)

// stripe listen --forward-to localhost:4000/api/stripe/webhook

// create order function
const createOrder = async (customer, data) => {
  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    course:customer.metadata.course,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (err) {
    console.log(err);
  }
};


// stripe webhook
let endpointSecret
// "whsec_ce8552cde6b46ee9fecb4ef1c2fdaa010b3940487aa422da7fcd0a30ecffa492";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    console.log("comming webhook")
   

    let sig = req.headers["stripe-signature"];
  
    let data;
    let eventType;

    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("webhook verifided");
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          createOrder(customer, data);
        })
        .catch((err) => console.log(err.message));
    }
    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
  }
);

module.exports = router;
