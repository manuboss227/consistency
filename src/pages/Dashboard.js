import React, {

  useEffect,

  useState

} from "react";

import axios from "axios";

function Dashboard() {

  const [tasks, setTasks] =
    useState([]);

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

            "https://consistency-app.great-site.net/dashboard",

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
        }

      }

      catch (error) {

        console.log(error);
      }
    };

  // INITIAL LOAD
  useEffect(() => {

    fetchTasks();

  }, []);

  // AUTO REFRESH
  useEffect(() => {

    const interval =

      setInterval(() => {

        fetchTasks();

      }, 3000);

    return () =>
      clearInterval(interval);

  }, []);

  // COUNTS
  const totalTasks =
    tasks.length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.completed
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        !task.completed
    ).length;

  const overdueTasks =
    tasks.filter((task) => {

      return (

        !task.completed &&

        new Date(
          task.due_date
        ) < new Date()
      );

    }).length;

  return (

    <div
      style={{
        padding: "30px",

        background:
          "#f4f7fb",

        minHeight:
          "100vh"
      }}
    >

      <h1>

        Dashboard 📊

      </h1>

      <div
        style={{

          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",

          gap: "20px",

          marginTop: "30px"
        }}
      >

        {/* TOTAL */}

        <div
          style={cardStyle}
        >

          <h2>

            {totalTasks}

          </h2>

          <p>

            Total Tasks

          </p>

        </div>

        {/* COMPLETED */}

        <div
          style={cardStyle}
        >

          <h2>

            {completedTasks}

          </h2>

          <p>

            Completed

          </p>

        </div>

        {/* PENDING */}

        <div
          style={cardStyle}
        >

          <h2>

            {pendingTasks}

          </h2>

          <p>

            Pending

          </p>

        </div>

        {/* OVERDUE */}

        <div
          style={cardStyle}
        >

          <h2>

            {overdueTasks}

          </h2>

          <p>

            Overdue

          </p>

        </div>

      </div>

    </div>
  );
}

// CARD STYLE
const cardStyle = {

  background: "white",

  padding: "30px",

  borderRadius: "15px",

  boxShadow:
    "0 4px 10px rgba(0,0,0,0.08)",

  textAlign: "center"
};

export default Dashboard;