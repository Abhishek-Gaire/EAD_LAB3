const express = require("express");
const router = express.Router();

// Home page - redirect to tasks
router.get("/", (req, res) => {
  res.redirect("/tasks");
});

// About page
router.get("/about", (req, res) => {
  res.render("about", {
    title: "About Task Manager",
  });
});

module.exports = router;
