const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  cartData:{
    type: Object,
    default: {},
  }
});

module.exports = mongoose.model.user || mongoose.model("User", userSchema);
