const express =
  require("express");

const router =
  express.Router();

const taskController =
  require("../controllers/taskController");

// TEST GET
router.get("/", (req, res) => {

  res.send("Tasks route works");

});

// CREATE TASK
router.post(
  "/",
  taskController.createTask
);

// GET TASKS
router.get(
  "/all",
  taskController.getTasks
);

// DELETE TASK
router.delete(
  "/:id",
  taskController.deleteTask
);

// UPDATE TASK
router.put(
  "/:id",
  taskController.updateTask
);
// TOGGLE COMPLETE
router.put(
  "/complete/:id",
  taskController.toggleComplete
);
module.exports =
  router;