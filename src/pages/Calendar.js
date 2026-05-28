import React, {
  useEffect,
  useState
} from "react";

import Calendar from "react-calendar";

function CalendarPage() {

  const [date, setDate] =
    useState(new Date());

  const [tasks, setTasks] =
    useState([]);

  useEffect(() => {

    const savedTasks =
      JSON.parse(
        localStorage.getItem(
          "tasks"
        )
      ) || [];

    setTasks(savedTasks);

  }, []);

  // Format Selected Date
  const formattedDate =
    date.toISOString()
      .split("T")[0];

  // Tasks for selected date
  const selectedTasks =
    tasks.filter(
      task =>
        task.dueDate ===
        formattedDate
    );

  return (

    <div>

      <h1>
        Calendar
      </h1>

      {/* Calendar */}
      <div
        style={{
          background: "white",

          padding: "20px",

          borderRadius: "20px",

          marginTop: "20px",

          boxShadow:
            "0 2px 10px rgba(0,0,0,0.08)"
        }}
      >

        <Calendar
          onChange={setDate}
          value={date}
        />

      </div>

      {/* Tasks */}
      <div
        style={{
          marginTop: "30px"
        }}
      >

        <h2>
          Tasks for:
          {" "}
          {formattedDate}
        </h2>

        {
          selectedTasks.length === 0
          ? (

            <p>
              No tasks scheduled.
            </p>

          ) : (

            selectedTasks.map(task => (

              <div
                key={task.id}

                style={{
                  background:
                    "white",

                  padding: "20px",

                  marginTop: "15px",

                  borderRadius:
                    "15px",

                  boxShadow:
                    "0 2px 10px rgba(0,0,0,0.08)"
                }}
              >

                <h3>
                  {task.text}
                </h3>

                <p>
                  Category:
                  {" "}
                  {task.category}
                </p>

                <p>
                  Priority:
                  {" "}
                  {task.priority}
                </p>

              </div>

            ))

          )
        }

      </div>

    </div>
  );
}

export default CalendarPage;