// seed.js
// This script seeds the database with sample data.
// This is for development purposes only and should not be used in production.

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Robot = require("./models/robot.model");

dotenv.config(); // Load environment variables

// Sample data
const robots = [
  {
    id: "R12346",
    name: "CleanBot",
    manufacturer: "CleanTech Corp",
    model: "CB-1000",
    battery: 92,
  },
  {
    id: "R12348",
    name: "GuardBot",
    manufacturer: "SecureBot Inc.",
    model: "GB-500",
    battery: 60,
  },
  {
    id: "R12349",
    name: "ChefBot",
    manufacturer: "Cooking Robotics",
    model: "CB-200",
    battery: 80,
  },
  {
    id: "R12350",
    name: "DeliveryBot",
    manufacturer: "QuickDeliveries",
    model: "DB-300",
    battery: 75,
  },
  {
    id: "R12351",
    name: "GuideBot",
    manufacturer: "Tourism Robotics",
    model: "GB-100",
    battery: 85,
  },
];

// Insert sample data into the database
async function seedDB() {
  await connectDB(); // Connect to the database
  try {
    await Robot.deleteMany({});
    await Robot.insertMany(robots);
    console.log("Database seeded");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close(); // Close the database connection
  }
}

seedDB();
