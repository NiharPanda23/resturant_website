const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const foodRouter = require("./routes/foodRoute");
const userRouter = require("./routes/userRouter");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRoute");
require("dotenv").config();
const app = express();

app.use(express.json());

const corsOptions = {
  origin: [process.env.URL_1, process.env.URL_2]
}

app.use(cors(corsOptions));
connectDb();

const PORT = 3000;

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
  res.send("Hi there");
});

// app.listen(PORT, () => console.log("Listing on port 3000"));

