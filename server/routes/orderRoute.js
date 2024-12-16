const express = require("express");
const authMiddleware = require("../middleware/auth");
const { placeOrder } = require("../controllers/orderController");

const orderRouter = express();

orderRouter.post("/place", authMiddleware, placeOrder);

module.exports = orderRouter;