const express = require("express");
const {
  createTaskController,
  getAllTasksController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
} = require("../controllers/task.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/tasks", auth, createTaskController);
router.get("/tasks", auth, getAllTasksController);
router.get("/tasks/:id", auth, getTaskController);
router.patch("/tasks/:id", auth, updateTaskController);
router.delete("/tasks/:id", auth, deleteTaskController);

module.exports = router;
