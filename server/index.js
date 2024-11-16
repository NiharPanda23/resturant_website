const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const foodRouter = require("./routes/foodRoute");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());
connectDb();

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hi there");
});

app.listen(3000, () => console.log("Listing on port 3000"));

// nihar12318 id
// DuXzrBQzsoZwNs9p
//mongodb+srv://nihar12318:<db_password>@cluster0.55gey.mongodb.net/?
