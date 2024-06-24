// controllers/robotController.js
const Robot = require("../models/robot.model");

// Get robots count
async function getRobotsCount(req, res) {
  const name = req.query.name || "";
  try {
    const count = await Robot.countDocuments({
      name: { $regex: name, $options: "i" }, // "i" for case-insensitive
    });
    res.json({ count });
  } catch (err) {
    console.log(
      "robot.controller, getRobotsCount. Error while getting robots count",
      err
    );
    res.status(500).json({ message: err.message });
  }
}

// Get all robots
async function getRobots(req, res) {
  const name = req.query.name || "";

  try {
    const robots = await Robot.find({
      name: { $regex: name, $options: "i" }, // "i" for case-insensitive
    })
      .skip(2)
      .limit(2);
    res.json(robots);
  } catch (err) {
    console.log("robot.controller, getRobots. Error while getting robots", err);
    res.status(500).json({ message: err.message });
  }
}

// Get single robot
async function getRobotById(req, res) {
  const { id } = req.params;
  try {
    const robot = await Robot.findById(id);
    res.json(robot);
  } catch (err) {
    if (err.name === "CastError") {
      console.log(
        `robot.controller, getRobotById. Robot not found with id: ${id}`
      );
      return res.status(404).json({ message: "Robot not found" });
    }
    console.log(
      `robot.controller, getRobotById. Error while getting robot with id: ${id}`,
      err.name
    );
    res.status(500).json({ message: err.message });
  }
}

// Delete robot
async function deleteRobot(req, res) {
  const { id } = req.params;
  try {
    const deletedRobot = await Robot.findByIdAndDelete(id);

    if (!deletedRobot) {
      console.log(
        `robot.controller, deleteRobot. Robot not found with id: ${id}`
      );
      return res.status(404).json({ message: "Robot not found" });
    }

    res.json({ message: "Robot deleted" });
  } catch (err) {
    console.log(
      `robot.controller, deleteRobot. Error while deleting robot with id: ${id}`
    );
    res.status(500).json({ message: err.message });
  }
}

// Create new robot
async function createRobot(req, res) {
  const robotToAdd = req.body;
  const newRobot = new Robot(robotToAdd);

  try {
    const savedRobot = await newRobot.save();
    res.status(201).json(savedRobot);
  } catch (err) {
    console.log(
      "robot.controller, createRobot. Error while creating robot",
      err
    );

    if (err.name === "ValidationError") {
      // Mongoose validation error
      console.log(`robot.controller, createRobot. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`robot.controller, createRobot. ${err.message}`);
      res.status(500).json({ message: "Server error while creating robot" });
    }
  }
}

// Update robot
async function updateRobot(req, res) {
  const { id } = req.params;
  const { name, manufacturer, model, battery } = req.body;

  try {
    const updatedRobot = await Robot.findByIdAndUpdate(
      id,
      { name, manufacturer, model, battery },
      { new: true, runValidators: true } // validate before updating
    );

    if (!updatedRobot) {
      console.log(
        `robot.controller, updateRobot. Robot not found with id: ${id}`
      );
      return res.status(404).json({ message: "Robot not found" });
    }

    res.json(updatedRobot);
  } catch (err) {
    console.log(
      `robot.controller, updateRobot. Error while updating robot with id: ${id}`,
      err
    );

    if (err.name === "ValidationError") {
      // Mongoose validation error
      console.log(`robot.controller, updateRobot. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`robot.controller, updateRobot. ${err.message}`);
      res.status(500).json({ message: "Server error while updating robot" });
    }
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
