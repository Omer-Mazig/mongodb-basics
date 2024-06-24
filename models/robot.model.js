const mongoose = require("mongoose");

// Create a schema
const robotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    battery: {
      type: Number,
      default: 100,
      min: 0,
      max: 100,
      required: true,
    },
  },
  { timestamps: true }
);

const Robot = mongoose.model("Robot", robotSchema);
module.exports = Robot;
