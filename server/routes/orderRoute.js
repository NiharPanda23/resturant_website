const express = require("express");
const authMiddleware = require("../middleware/auth");
const { placeOrder, verifyOrder, userOrder, listOrders, updateOrderStatus } = require("../controllers/orderController");

const orderRouter = express();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/userorder", authMiddleware, userOrder);
orderRouter.get("/list", listOrders);
orderRouter.post("/update", updateOrderStatus);

module.exports = orderRouter;