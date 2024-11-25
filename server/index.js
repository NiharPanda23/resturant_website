const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const foodRouter = require("./routes/foodRoute");
const userRouter = require("./routes/userRouter");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
connectDb();

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hi there");
});

app.listen(3000, () => console.log("Listing on port 3000"));

