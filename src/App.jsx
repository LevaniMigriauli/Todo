import React, { Fragment, useEffect, useState } from "react";
import "./App.css";

import iconDelete from "./assets/delete.svg";
import iconUpdate from "./assets/update.svg";
import iconSave from "./assets/save.svg";

const getLocalStorage = localStorage.getItem("tasksStorage");
const isLocalStorage = getLocalStorage ? JSON.parse(getLocalStorage) : [];

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

function App() {
  const [taskInputValue, setTaskInputValue] = useState("");
  const [taskId, setTaskId] = useState("");
  const [taskInputUpdateValue, setTaskInputUpdateValue] = useState("");
  const [tasks, setTasks] = useState(isLocalStorage);
  const [date, setDate] = useState(new Date());

  const refreshTimeHandler = function () {
    setDate(new Date());
  };

  const day = weekday[date.getDay()];
  const dateN = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();

  useEffect(() => {
    const dateUpdater = setInterval(refreshTimeHandler, 60000);

    return function cleanup() {
      clearInterval(dateUpdater);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("tasksStorage", JSON.stringify(tasks));
  }, [tasks]);

  const taskAddHandler = function () {
    const obj = {
      id: String(Math.random()),
      value: taskInputValue,
      time: new Date().toLocaleString(),
    };
    taskInputValue !== "" &&
      setTasks((prevState) => {
        return [...prevState, obj];
      });

    setTaskInputValue("");
  };

  const taskDeleteHandler = function (task) {
    setTasks((prevState) => {
      for (const item of prevState) {
        if (item.id === task.id) {
          [...prevState.splice(prevState.indexOf(item), 1)];
          break;
        }
      }
      return [...prevState];
    });
  };

  const taskUpdateHandler = function (task) {
    setTaskId(task.id);
    setTaskInputUpdateValue(task.value);
  };

  const taskSaveHandler = function (task) {
    setTaskId("");
    setTasks((prevState) => {
      // tasks.map((item) => {
      //   return item.id == task.id
      //     ? { ...item, value: taskInputUpdateValue }
      //     : item;
      // })
      for (const item of prevState) {
        if (item.id == task.id) {
          [
            ...prevState.splice(prevState.indexOf(item), 1, {
              id: task.id,
              value: taskInputUpdateValue,
              time: new Date().toLocaleString(),
            }),
          ];
          break;
        }
      }
      return [...prevState];
    });
  };

  return (
    <>
      <div className="date">
        <p>
          {day} {dateN}
        </p>
        <p>
          {hour} : {min} {hour >= 12 ? "PM" : "AM"}
        </p>
      </div>
      <div>
        <input
          id="task-input"
          type="text"
          name=""
          value={taskInputValue}
          onKeyDown={(e) => {
            e.key == "Enter" && taskAddHandler();
          }}
          onChange={(e) =>
            e.target.value.length < 20 && setTaskInputValue(e.target.value)
          }
          placeholder="Note"
        />
        <button className="btn-add" onClick={taskAddHandler}>
          +
        </button>
      </div>
      <div>
        <ul className="tasks-list">
          {tasks.map((task) => (
            <li key={task.id}>
              {task.id == taskId ? (
                <Fragment>
                  <input
                    value={taskInputUpdateValue}
                    onChange={(e) =>
                      e.target.value.length < 20 &&
                      setTaskInputUpdateValue(e.target.value)
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      taskInputUpdateValue !== "" &&
                      taskSaveHandler(task)
                    }
                  />
                  <button
                    onClick={() =>
                      taskInputUpdateValue !== "" && taskSaveHandler(task)
                    }
                  >
                    <img src={iconSave} alt="" />
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  <span>{task.value}</span>

                  <button>
                    <img
                      className="edit"
                      src={iconUpdate}
                      alt="Update icon"
                      onClick={() => taskUpdateHandler(task)}
                    />
                  </button>
                  <button>
                    <img
                      className="delete"
                      src={iconDelete}
                      alt="Delete icon"
                      onClick={() => taskDeleteHandler(task)}
                    />
                  </button>
                  <p>{task.time}</p>
                </Fragment>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
