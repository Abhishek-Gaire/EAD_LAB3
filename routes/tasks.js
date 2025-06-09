const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { taskValidation } = require("../middleware/validation");

// GET /tasks - List all tasks
router.get("/", taskController.getAllTasks);

// GET /tasks/create - Show create form
router.get("/create", taskController.showCreateForm);

// POST /tasks - Create new task
router.post("/", taskValidation, taskController.createTask);

// GET /tasks/:id - Show specific task
router.get("/:id", taskController.showTask);

// GET /tasks/:id/edit - Show edit form
router.get("/:id/edit", taskController.showEditForm);

// PUT /tasks/:id - Update task
router.put("/:id", taskValidation, taskController.updateTask);

// DELETE /tasks/:id - Delete task
router.delete("/:id", taskController.deleteTask);

// PATCH /tasks/:id/toggle - Toggle task completion
router.patch("/:id/toggle", taskController.toggleTask);

module.exports = router;
