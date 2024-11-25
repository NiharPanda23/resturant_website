const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({success: false, message: "Incorrect Password Please try again"});
    }

    const token = createToken(user._id);
    res.json({success: true, token})

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, secret);
};

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // checks user exists or not
    const exists = await userModel.find({ email });

    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    // checks email format and password strength
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Password must be more than 6 letter",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(200).json({ success: true, token});
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: false, message: err.message });
  }
};

// const deleAccount = async (req, res) =>{

// }

module.exports = { loginUser, signupUser };
