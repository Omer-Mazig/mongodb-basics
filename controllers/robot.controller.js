// controllers/robotController.js
const Robot = require("../models/robot.model");

// Get robots count
async function getRobotsCount(req, res) {
  const { name } = req.query;
  try {
    const count = await Robot.countDocuments({
      name: { $regex: name, $options: "i" },
    });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get all robots
async function getRobots(req, res) {
  const { name } = req.query;

  try {
    const robots = await Robot.find({
      name: { $regex: name, $options: "i" },
    });
    res.json(robots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get a single robot
async function getRobotById(req, res) {
  try {
    const robot = await Robot.findById(req.params.id);
    if (!robot) return res.status(404).json({ message: "Robot not found" });
    res.json(robot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Create a new robot
async function createRobot(req, res) {
  const robotToAdd = req.body;
  const newRobot = new Robot(robotToAdd);

  try {
    const savedRobot = await newRobot.save();
    res.status(201).json(savedRobot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Update an robot
async function updateRobot(req, res) {
  const { id } = req.params;
  const { name, manufacturer, model, battery } = req.body;

  try {
    const updatedRobot = await Robot.findByIdAndUpdate(
      id,
      { name, manufacturer, model, battery: battery },
      { new: true } // return the modified document rather than the original
    );

    if (!updatedRobot)
      return res.status(404).json({ message: "Robot not found" });

    res.json(updatedRobot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Delete an robot
async function deleteRobot(req, res) {
  const { id } = req.params;
  try {
    const deletedRobot = await Robot.findByIdAndDelete(id);

    if (!deletedRobot) {
      return res.status(404).json({ message: "Robot not found" });
    }

    res.json({ message: "Robot deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getRobotsCount,
  getRobots,
  getRobotById,
  createRobot,
  updateRobot,
  deleteRobot,
};
