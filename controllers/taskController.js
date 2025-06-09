const { PrismaClient } = require("../generated/prisma/client");
const { validationResult } = require("express-validator");

const prisma = new PrismaClient();

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const { status, priority } = req.query;

    let where = {};
    if (status === "completed") where.completed = true;
    if (status === "pending") where.completed = false;
    if (priority) where.priority = priority.toUpperCase();

    const tasks = await prisma.task.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    const taskCounts = await prisma.task.groupBy({
      by: ["completed"],
      _count: {
        completed: true,
      },
    });

    const stats = {
      total: tasks.length,
      completed: taskCounts.find((t) => t.completed)?._count?.completed || 0,
      pending: taskCounts.find((t) => !t.completed)?._count?.completed || 0,
    };

    res.render("tasks/index", {
      title: "Task Manager",
      tasks,
      stats,
      currentFilter: { status, priority },
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).render("error", {
      title: "Error",
      message: "Failed to fetch tasks",
      error,
    });
  }
};

// Show create task form
const showCreateForm = (req, res) => {
  res.render("tasks/create", {
    title: "Create New Task",
    task: {},
    errors: [],
  });
};

// Create new task
const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("tasks/create", {
        title: "Create New Task",
        task: req.body,
        errors: errors.array(),
      });
    }

    const { title, description, priority, dueDate } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        priority: priority || "MEDIUM",
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    res.redirect("/tasks");
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).render("tasks/create", {
      title: "Create New Task",
      task: req.body,
      errors: [{ msg: "Failed to create task. Please try again." }],
    });
  }
};

// Show specific task
const showTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!task) {
      return res.status(404).render("error", {
        title: "404 - Task Not Found",
        message: "The task you are looking for does not exist.",
        error: { status: 404 },
      });
    }

    res.render("tasks/show", {
      title: `Task: ${task.title}`,
      task,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).render("error", {
      title: "Error",
      message: "Failed to fetch task",
      error,
    });
  }
};

// Show edit task form
const showEditForm = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!task) {
      return res.status(404).render("error", {
        title: "404 - Task Not Found",
        message: "The task you are looking for does not exist.",
        error: { status: 404 },
      });
    }

    res.render("tasks/edit", {
      title: `Edit Task: ${task.title}`,
      task,
      errors: [],
    });
  } catch (error) {
    console.error("Error fetching task for edit:", error);
    res.status(500).render("error", {
      title: "Error",
      message: "Failed to fetch task for editing",
      error,
    });
  }
};

// Update task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("tasks/edit", {
        title: `Edit Task`,
        task: { id: parseInt(id), ...req.body },
        errors: errors.array(),
      });
    }

    const { title, description, priority, dueDate } = req.body;

    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description: description || null,
        priority: priority || "MEDIUM",
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    res.redirect(`/tasks/${task.id}`);
  } catch (error) {
    console.error("Error updating task:", error);
    if (error.code === "P2025") {
      return res.status(404).render("error", {
        title: "404 - Task Not Found",
        message: "The task you are trying to update does not exist.",
        error: { status: 404 },
      });
    }

    res.status(500).render("tasks/edit", {
      title: "Edit Task",
      task: { id: parseInt(req.params.id), ...req.body },
      errors: [{ msg: "Failed to update task. Please try again." }],
    });
  }
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id: parseInt(id) },
    });

    res.redirect("/tasks");
  } catch (error) {
    console.error("Error deleting task:", error);
    if (error.code === "P2025") {
      return res.status(404).render("error", {
        title: "404 - Task Not Found",
        message: "The task you are trying to delete does not exist.",
        error: { status: 404 },
      });
    }

    res.status(500).render("error", {
      title: "Error",
      message: "Failed to delete task",
      error,
    });
  }
};

// Toggle task completion
const toggleTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        completed: !task.completed,
      },
    });

    res.json({ success: true, task: updatedTask });
  } catch (error) {
    console.error("Error toggling task:", error);
    res.status(500).json({ error: "Failed to toggle task" });
  }
};

module.exports = {
  getAllTasks,
  showCreateForm,
  createTask,
  showTask,
  showEditForm,
  updateTask,
  deleteTask,
  toggleTask,
};
