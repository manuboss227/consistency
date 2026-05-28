const express =
  require("express");

const cors =
  require("cors");

require("dotenv")
  .config();

require("./config/db");

const authRoutes =
  require("./routes/authRoutes");

const taskRoutes =
  require("./routes/taskRoutes");

const app =
  express();

// Middleware
app.use(cors());

app.use(express.json());

// Routes
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

// Home Route
app.get("/", (req, res) => {

  res.send(
    "TaskForge API Running 🚀"
  );
});

// Start Server
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});