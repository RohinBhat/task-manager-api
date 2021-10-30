const asyncHandler = require("express-async-handler");
const Task = require("../models/task");

const createTaskController = asyncHandler(async (req, res) => {
  const task = new Task({
    author: req.user._id,
    ...req.body,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=updatedAt:desc
const getAllTasksController = asyncHandler(async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    // const tasks = await Task.find({ author: req.user._id });
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const getTaskController = asyncHandler(async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, author: req.user._id });
    if (!task) {
      return res.status(404).send({
        error: "Task not found",
      });
    }
    res.send(task);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const updateTaskController = asyncHandler(async (req, res) => {
  const allowedUpdates = ["description", "completed"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid updates",
    });
  } else {
    try {
      const task = await Task.findOne({
        _id: req.params.id,
        author: req.user._id,
      });

      if (!task) {
        return res.status(404).send({
          error: "Task not found",
        });
      }

      updates.forEach((update) => (task[update] = req.body[update]));
      await task.save();

      res.send(task);
    } catch (error) {
      res.status(500).send();
      console.log({ error: error.message });
    }
  }
});

const deleteTaskController = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!task) {
      return res.status(404).send({
        error: "Task not found",
      });
    }

    res.send(task);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = {
  createTaskController,
  getAllTasksController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
};
