const express = require('express');
const {addToCart, removeFromCart, userCartData} = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth')
const cartRouter = express();

cartRouter.get('/list', authMiddleware, userCartData);
cartRouter.post('/add', authMiddleware, addToCart);
cartRouter.delete('/remove', authMiddleware, removeFromCart);

module.exports = cartRouter