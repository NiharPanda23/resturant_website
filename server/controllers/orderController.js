const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const Stripe = require("stripe");

const stripeKey = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(stripeKey);

const placeOrder = async (req, res) => {
  const frontEnd_url = "http://localhost:5173";
  try {
    const { items, amount, address, deliveryCharge } = req.body;
    const newOrder = new orderModel({
      userID: req.user.userID,
      items: items,
      amount: amount,
      address: address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.user.userID, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "INR",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100 * 84.72),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "INR",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: Math.round(deliveryCharge * 100 * 84.72),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontEnd_url}/verify?success=true&orderId={newOrder._id}`,
      cancel_url: `${frontEnd_url}/verify?success=false&orderId={newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

module.exports = { placeOrder };
