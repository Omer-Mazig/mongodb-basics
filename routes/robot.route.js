// routes/robots.js
const express = require("express");
const router = express.Router();
const {
  getRobotsCount,
  getRobots,
  getRobotById,
  createRobot,
  updateRobot,
  deleteRobot,
} = require("../controllers/robot.controller");

router.get("/", getRobots);
router.get("/count", getRobotsCount);
router.get("/:id", getRobotById);
router.post("/", createRobot);
router.put("/:id", updateRobot);
router.delete("/:id", deleteRobot);

module.exports = router;
