const mongoose = require("mongoose");

// Restaurant schema
const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Restaurant must have a name"],
  },
  city: {
    type: String,
    required: [true, "Please provide city name"],
  },
  rating: {
    type: Number,
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide an image url"],
  },
});

// Restaurant model
module.exports = mongoose.model("Restaurant", RestaurantSchema);
