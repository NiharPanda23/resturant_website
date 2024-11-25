const express =  require('express');
const {loginUser, signupUser} = require("../controllers/userController");

const userRouter = express();

userRouter.post("/login", loginUser);
userRouter.post("/signup", signupUser);

module.exports = userRouter;