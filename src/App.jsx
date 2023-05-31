import React, { Fragment, useEffect, useRef, useState } from "react";
import "./App.css";

import iconDelete from "./assets/delete.svg";
import iconUpdate from "./assets/update.svg";
import iconSave from "./assets/save.svg";

const getLocalStorage = localStorage.getItem("tasksStorage");
const isLocalStorage = getLocalStorage ? JSON.parse(getLocalStorage) : [];

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

function App() {
  // const [taskInputValue, setTaskInputValue] = useState();
  const [taskInputValue, setTaskInputValue] = useState("");
  const [taskId, setTaskId] = useState("");
  const [taskInputUpdateValue, setTaskInputUpdateValue] = useState("");
  const [tasks, setTasks] = useState(isLocalStorage);
  const [date, setDate] = useState(new Date());

  // const [taskUpdater, setTaskUpdater] = useState(false);
  // const [taskupdatedValue, setTaskupdatedValue] = useState("");
  // console.log(new Date());

  // const timeFormat = {
  //   day: weekday[date.getDay()],
  //   dateN: date.getDate(),
  //   hour: date.getHours(),
  //   min: date.getMinutes(),
  // };
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

  console.log(date);

  useEffect(() => {
    const localStorageTasks = localStorage.setItem(
      "tasksStorage",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const taskAddHandler = function () {
    const obj = {
      id: String(Math.random()),
      value: taskInputValue,
    };
    setTasks((prevState) => {
      return [...prevState, obj];
    });

    // taskInputValue.current.value = "";
    setTaskInputValue("");
    // localStorage.setItem("task", JSON.stringify(tasks));
  };

  const taskDeleteHandler = function (task) {
    setTasks((prevState) => {
      for (const item of prevState) {
        // console.log(item.id, task.id);
        if (item.id === task.id) {
          [...prevState.splice(prevState.indexOf(item), 1)];
          break;
        }
      }
      return [...prevState];
    });
  };

  const taskUpdateHandler = function (task) {
    // setTaskUpdater(true);
    // console.log(taskupdatedValue);
    // console.log(taskInputValue);
    // setTaskInputValue(task.value);
    setTaskId(task.id);
    setTaskInputUpdateValue(task.value);
  };

  const taskSaveHandler = function (task) {
    // setTaskUpdater(false);
    setTaskId("");
    console.log(taskInputUpdateValue);
    setTasks(
      // (prevState) => {
      //   console.log(prevState);

      tasks.map((item) => {
        return item.id == task.id
          ? { ...item, value: taskInputUpdateValue }
          : item;
      })

      // for (const item of prevState) {
      //   if (item.id == task.id) {
      //     console.log(
      //       item.id,
      //       task.id,
      //       // Object.values(...prevState),
      //       taskInputUpdateValue,
      //       item
      //     );
      //     [
      //       item.value,
      //       {
      //         id: task.id,
      //         value: taskInputUpdateValue,
      //       },
      //     ];
      //   }
      // }
      // return [...prevState];
    );
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
          // ref={taskInputValue}
          value={taskInputValue}
          onKeyDown={(e) => {
            e.key == "Enter" && taskAddHandler();
          }}
          // value={taskInputValue}
          onChange={(e) => setTaskInputValue(e.target.value)}
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
                    // defaultValue={task.value}
                    value={taskInputUpdateValue}
                    onChange={(e) => setTaskInputUpdateValue(e.target.value)}
                  />
                  <button onClick={() => taskSaveHandler(task)}>
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
