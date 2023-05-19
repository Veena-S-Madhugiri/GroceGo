const braintree = require("braintree");
const express = require("express");
const router = express.Router();
const verifyToken = require("../Middlewear/Fetch-User");
const Orders = require('../models/Orders')

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHENT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

// Route 1: Token
router.get("/braintree/token", async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        return res.status(500).json({ error: err });
      } else {
        res.status(200).send(response.clientToken);
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Payments
router.post("/braintree/payment", verifyToken, async (req, res) => {
  try {
    const { nonce, cart, selectedAddress } = req.body;
    console.log(selectedAddress);

    const saleRequest = {
      amount: cart.reduce((total, item) => total + item.price, 0),
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    };

    gateway.transaction.sale(saleRequest, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Payment processing failed" });
      } else {
        if (result.success) {
          // Payment successful, process the order

          const order = new Orders({
            
            products: cart,
            payment: result,
            buyer: req.user.id,
            shippingAddress: selectedAddress  
          });
        
          // Save the order
          const savedOrder =  order.save();
          // console.log(savedOrder)
          res.status(200).json({ ok: true });
        } else {
          // Payment failed
          console.error(result.message);
          res.status(500).json({ error: "Payment failed" });
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Oops! Something went wrong" });
  }
});

module.exports = router;
