const mongoose = require("mongoose");

// Create a schema
const RobotSchema = new mongoose.Schema(
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
    },
  },
  { timestamps: true }
);

const Robot = mongoose.model("Robot", RobotSchema);
module.exports = Robot;
