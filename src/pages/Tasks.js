import React, {
  useEffect,
  useState,
  useCallback
} from "react";

import axios from "axios";

import "./Tasks.css";

import alarmSound
from "../sounds/alarm.mp3";


import {
  toast
} from "react-toastify";

function Tasks() {

  // STATES
  const [tasks, setTasks] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [priority, setPriority] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const [editingId,
    setEditingId
  ] = useState(null);

  const [search,
    setSearch
  ] = useState("");

  const [filter,
    setFilter
  ] = useState("all");

  const [darkMode,
  setDarkMode
] = useState(

  localStorage.getItem(
    "darkMode"
  ) === "true"
);

  // AUDIO
  const [alarm] =
    useState(() => {

      const audio =
        new Audio(alarmSound);

      audio.preload =
        "auto";

      return audio;
    });

  // FETCH TASKS
  const fetchTasks =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(

            "https://consistency-4.onrender.com/api/tasks/all",

            {

              headers: {

                Authorization:
                  token
              }
            }
          );

        if (
          Array.isArray(res.data)
        ) {

          setTasks(
            res.data
          );

        } else {

          setTasks([]);
        }

      }

      catch (error) {

        console.log(error);
      }
    };

  // CHECK REMINDERS
  const checkReminders =
    useCallback(() => {

      tasks.forEach((task) => {

        const dueTime =

          Date.parse(
            task.due_date
          );

        const now =
          Date.now();

        const difference =

          dueTime - now;

        // 30 SECONDS BEFORE
        if (

          difference > 0 &&

          difference <= 30000
        ) {

          // PLAY SOUND
          alarm.currentTime = 0;

          alarm.play()

            .then(() => {

              console.log(
                "Alarm ringing"
              );
            })

            .catch((err) => {

              console.log(
                err
              );
            });

          // NOTIFICATION
          if (
            Notification.permission
            === "granted"
          ) {

            new Notification(

              "⏰ Task Reminder",

              {

                body:
                  `${task.title}
                  is due now!`
              }
            );
          }
        }
      });

    }, [tasks, alarm]);

  // INITIAL LOAD
  useEffect(() => {

    fetchTasks();

    if (
      Notification.permission
      !== "granted"
    ) {

      Notification
        .requestPermission();
    }

  }, []);

  // AUTO CHECK
  useEffect(() => {

    const interval =

      setInterval(() => {

        checkReminders();

      }, 1000);

    return () =>
      clearInterval(interval);

  }, [checkReminders]);
useEffect(() => {

  localStorage.setItem(

    "darkMode",

    darkMode
  );

}, [darkMode]);
  // ADD TASK
  const handleAddTask =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        // UPDATE
        if (editingId) {

          await axios.put(

            `https://consistency-4.onrender.com/api/tasks/${editingId}`,

            {

              title,
              category,
              priority,
              due_date:
                dueDate
            },

            {

              headers: {

                Authorization:
                  token
              }
            }
          );

          toast.success(
            "Task updated!"
          );

          setEditingId(null);
        }

        // CREATE
        else {

          await axios.post(

            "https://consistency-4.onrender.com/api/tasks",

            {

              title,
              category,
              priority,
              due_date:
                dueDate
            },

            {

              headers: {

                Authorization:
                  token
              }
            }
          );

          toast.success(
            "Task created!"
          );
        }

        // CLEAR FORM
        setTitle("");

        setCategory("");

        setPriority("");

        setDueDate("");

        // REFRESH
        setTimeout(() => {

          fetchTasks();

        }, 300);

      }

      catch (error) {

        console.log(error);
      }
    };

  // DELETE
  const handleDelete =
    async (id) => {

      try {

        await axios.delete(

          `https://consistency-4.onrender.com/api/tasks/${id}`,

          {

            headers: {

              Authorization:
                localStorage.getItem(
                  "token"
                )
            }
          }
        );

        toast.success(
          "Task deleted!"
        );

        fetchTasks();

      }

      catch (error) {

        console.log(error);
      }
    };

  // EDIT
  const handleEdit =
    (task) => {

      setEditingId(
        task.id
      );

      setTitle(
        task.title
      );

      setCategory(
        task.category
      );

      setPriority(
        task.priority
      );

      setDueDate(

        new Date(
          task.due_date
        )

        .toISOString()

        .slice(0, 16)
      );
    };

  // COMPLETE
  const handleComplete =
    async (id) => {

      try {

        await axios.put(

          `https://consistency-4.onrender.com/api/tasks/complete/${id}`,

          {},

          {

            headers: {

              Authorization:
                localStorage.getItem(
                  "token"
                )
            }
          }
        );

        toast.success(
          "Task updated!"
        );

        fetchTasks();

      }

      catch (error) {

        console.log(error);
      }
    };

  // COUNTDOWN
  const getTimeRemaining =
    (dueDate) => {

      const total =

        Date.parse(dueDate)

        - Date.now();

      const days =
        Math.floor(

          total /

          (1000 * 60 * 60 * 24)
        );

      const hours =
        Math.floor(

          (
            total /

            (1000 * 60 * 60)
          ) % 24
        );

      const minutes =
        Math.floor(

          (
            total /

            (1000 * 60)
          ) % 60
        );

      const seconds =
        Math.floor(

          (
            total / 1000
          ) % 60
        );

      if (total <= 0) {

        return "Overdue ⚠️";
      }

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

  // FILTER TASKS
  const filteredTasks =

    tasks.filter((task) => {

      const matchesSearch =

        task.title
          .toLowerCase()

          .includes(
            search.toLowerCase()
          );

      if (filter === "completed") {

        return (
          matchesSearch &&
          task.completed
        );
      }

      if (filter === "pending") {

        return (
          matchesSearch &&
          !task.completed
        );
      }

      if (filter === "overdue") {

        return (

          matchesSearch &&

          !task.completed &&

          new Date(
            task.due_date
          ) < new Date()
        );
      }

      if (filter === "high") {

        return (

          matchesSearch &&

          task.priority
          === "High"
        );
      }

      return matchesSearch;
    });

  return (

    <div

      className={`tasks-container
        ${darkMode
          ? "dark"
          : ""}
      `}
    >

      {/* HEADER */}

      <div
        style={{

          display: "flex",

          justifyContent:
            "space-between",

          alignItems:
            "center",

          flexWrap: "wrap",

          gap: "15px"
        }}
      >

        <h1 className="tasks-title">

          Manage Your Productivity 🚀

        </h1>

        <button

          onClick={() =>

            setDarkMode(
              !darkMode
            )
          }

          style={{

            padding:
              "10px 15px",

            border: "none",

            borderRadius:
              "10px",

            cursor: "pointer",

            background:
              darkMode
                ? "#111827"
                : "#2563eb",

            color: "white"
          }}
        >

          {
            darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"
          }

        </button>

      </div>

      {/* FORM */}

      <form
        className="task-form"

        onSubmit={
          handleAddTask
        }
      >

        <input
          type="text"

          placeholder="Task title"

          value={title}

          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }

          required
        />

        <input
          type="text"

          placeholder="Category"

          value={category}

          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        />

        <select
          value={priority}

          onChange={(e) =>
            setPriority(
              e.target.value
            )
          }
        >

          <option value="">
            Select Priority
          </option>

          <option value="Low">
            Low
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="High">
            High
          </option>

        </select>

        <input
          type="datetime-local"

          value={dueDate}

          onChange={(e) =>
            setDueDate(
              e.target.value
            )
          }
        />

        <button type="submit">

          {
            editingId
              ? "Update Task"
              : "Add Task"
          }

        </button>

      </form>

      {/* SEARCH + FILTER */}

      <div
        style={{

          marginTop: "30px",

          display: "flex",

          gap: "15px",

          flexWrap: "wrap"
        }}
      >

        <input
          type="text"

          placeholder="Search tasks..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          style={{

            padding: "10px",

            borderRadius: "8px",

            border:
              "1px solid #ccc",

            flex: 1
          }}
        />

        <select

          value={filter}

          onChange={(e) =>
            setFilter(
              e.target.value
            )
          }

          style={{

            padding: "10px",

            borderRadius: "8px"
          }}
        >

          <option value="all">
            All
          </option>

          <option value="completed">
            Completed
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="overdue">
            Overdue
          </option>

          <option value="high">
            High Priority
          </option>

        </select>

      </div>

      {/* TASKS */}

      <div className="tasks-grid">

        {

          filteredTasks.map((task) => (

            <div

              key={task.id}

              className={`task-card
                ${task.completed
                  ? "completed"
                  : ""}
              `}
            >

              <h3>

                {task.title}

              </h3>

              <p>

                Category:
                {" "}
                {task.category}

              </p>

              <p
                className={`priority
                ${task.priority.toLowerCase()}`}
              >

                Priority:
                {" "}
                {task.priority}

              </p>

              <p>

                Due:
                {" "}

                {
                  new Date(
                    task.due_date
                  ).toLocaleString()
                }

              </p>

              <p className="countdown">

                Countdown:
                {" "}

                {
                  getTimeRemaining(
                    task.due_date
                  )
                }

              </p>

              <div className="task-buttons">

                <button
                  className="delete-btn"

                  onClick={() =>
                    handleDelete(task.id)
                  }
                >

                  Delete

                </button>

                <button
                  className="edit-btn"

                  onClick={() =>
                    handleEdit(task)
                  }
                >

                  Edit

                </button>

                <button
                  className="complete-btn"

                  onClick={() =>
                    handleComplete(task.id)
                  }
                >

                  {
                    task.completed
                      ? "Undo"
                      : "Complete"
                  }

                </button>

              </div>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default Tasks;