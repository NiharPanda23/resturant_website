const foodModel = require("../models/foodModel");
const fs = require("fs");

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({success:true, message: "Food added Successfully"}).status(201);
  } catch (error) {
    res.send(error).status(500);
  }
};

const listFood = async(req, res) => {
  try{
    const allFood = await foodModel.find({})
    res.status(200).json(allFood);
  }catch(err){
    res.send(err).status(500);
  }
};

const removeFood = async (req, res) => {
  try {
    const foodItem = await foodModel.findById(req.body.id);

    if (!foodItem) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }
    const filePath = `uploads/${foodItem.image}`;
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
    }
    await foodModel.findByIdAndDelete(req.body.id);

    res.status(200).json({ success: true, message: "Food deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "An error occurred while deleting food" });
  }
};

module.exports = { addFood, listFood, removeFood };
