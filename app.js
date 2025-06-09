const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

// Import routes
const indexRoutes = require("./routes/index");
const taskRoutes = require("./routes/tasks");

const app = express();

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// Custom middleware for local variables
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

// Routes
app.use("/", indexRoutes);
app.use("/tasks", taskRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render("error", {
    title: "404 - Page Not Found",
    message: "The page you are looking for does not exist.",
    error: { status: 404 },
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render("error", {
    title: "Error",
    message: err.message || "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

module.exports = app;
