const express = require("express");
const authMiddleware = require("../middleware/auth");
const { placeOrder, verifyOrder, userOrder } = require("../controllers/orderController");

const orderRouter = express();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder)
orderRouter.get("/userorder", authMiddleware, userOrder)

module.exports = orderRouter;