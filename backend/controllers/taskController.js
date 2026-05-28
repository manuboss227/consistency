const db =
  require("../config/db");

  const {
  sendReminderEmail
} = require(
  "../services/emailService"
);
// CREATE TASK
const createTask =
  (req, res) => {

    const {
      title,
      category,
      priority,
      due_date
    } = req.body;

    // TEMP TEST USER ID
    const user_id = 7;

    const sql =

      `INSERT INTO tasks
      (user_id, title,
      category, priority,
      due_date)

      VALUES (?, ?, ?, ?, ?)`;

    db.query(

      sql,

      [
        user_id,
        title,
        category,
        priority,
        due_date
      ],

      (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500)
            .json({
              message:
                "Database Error"
            });
        }
       sendReminderEmail(

  "njie96811@gmail.com",

  title,

  due_date
);
        res.status(201)
          .json({
            message:
              "Task created successfully"
          });
      }
    );
};

// GET TASKS
const getTasks =
  (req, res) => {

    const sql =
      "SELECT * FROM tasks";

    db.query(

      sql,

      (err, results) => {

        if (err) {

          console.log(err);

          return res.status(500)
            .json({
              message:
                "Database Error"
            });
        }

        res.status(200)
          .json(results);
      }
    );
};
// DELETE TASK
const deleteTask =
  (req, res) => {

    const taskId =
      req.params.id;

    const sql =
      "DELETE FROM tasks WHERE id = ?";

    db.query(

      sql,

      [taskId],

      (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500)
            .json({
              message:
                "Database Error"
            });
        }

        res.status(200)
          .json({
            message:
              "Task deleted"
            });
      }
    );
};
// UPDATE TASK
const updateTask =
  (req, res) => {

    const taskId =
      req.params.id;

    const {
      title,
      category,
      priority,
      due_date
    } = req.body;

    const sql =

      `UPDATE tasks
       SET title = ?,
       category = ?,
       priority = ?,
       due_date = ?
       WHERE id = ?`;

    db.query(

      sql,

      [
        title,
        category,
        priority,
        due_date,
        taskId
      ],

      (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500)
            .json({
              message:
                "Database Error"
            });
        }

        res.status(200)
          .json({
            message:
              "Task updated"
            });
      }
    );
};
// TOGGLE COMPLETE
const toggleComplete =
  (req, res) => {

    const taskId =
      req.params.id;

    const sql =

      `UPDATE tasks
       SET completed =
       NOT completed
       WHERE id = ?`;

    db.query(

      sql,

      [taskId],

      (err, result) => {

        if (err) {

          console.log(err);

          return res.status(500)
            .json({
              message:
                "Database Error"
            });
        }

        res.status(200)
          .json({
            message:
              "Task updated"
            });
      }
    );
};

module.exports = {

  createTask,

  getTasks,

  deleteTask,

  updateTask,

  toggleComplete
};