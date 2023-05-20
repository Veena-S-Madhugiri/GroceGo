const verifyToken = require("../Middlewear/Fetch-User");
const Orders = require("../models/Orders");
const express = require("express");
const router = express.Router();

// Route 1


router.get("/getOrders", verifyToken, async (req, res) => {
  try {
    const orders = await Orders.find({ buyer: req.user.id })
     
      .populate("products")
      .populate("buyer", "firstName").populate("shippingAddress");

    return res.status(200).json(orders);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Error while fetching the orders!",
      error,
    });
  }
});


// Route 2
// Cancel orders

router.put("/cancelOrders/:orderId", verifyToken, async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updatedOrder = await Orders.findByIdAndUpdate(orderId, { 
      status: 'Cancelled',
      payment: {
        success: false
      }
    }, { new: true });
    

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }



    res.json({ success: true, message: 'Order Cancelled' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





module.exports = router;