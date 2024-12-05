const express = require("express");
const authMiddleware = require("../middleware/auth");
const { placeOrder } = require("../controllers/orderController");

const oderRouter = express();

oderRouter.post('/place', authMiddleware, placeOrder);


module.exports = oderRouter;