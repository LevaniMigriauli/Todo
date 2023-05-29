import React, { Fragment, useRef, useState } from "react";
import "./App.css";

import iconDelete from "./assets/delete.svg";
import iconUpdate from "./assets/update.svg";
import iconSave from "./assets/save.svg";

function App() {
  // const [taskInputValue, setTaskInputValue] = useState();
  const taskInputValue = useRef("");
  const [tasks, setTasks] = useState([]);

  const [taskUpdater, setTaskUpdater] = useState(false);
  const [taskupdatedValue, setTaskupdatedValue] = useState("");

  const taskAddHandler = function () {
    const obj = {
      id: String(Math.random()),
      value: taskInputValue.current.value,
    };
    setTasks((prevState) => {
      return [...prevState, obj];
    });

    taskInputValue.current.value = "";

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
    setTaskUpdater(true);
    console.log(taskupdatedValue);
  };

  const taskSaveHandler = function () {
    setTaskUpdater(false);
  };

  // console.log(tasks);

  return (
    <>
      <div>
        <input
          id="task-input"
          type="text"
          name=""
          id="add"
          ref={taskInputValue}
          onKeyDown={(e) => {
            e.key == "Enter" && taskAddHandler();
          }}
          // value={taskInputValue}
          // onChange={(e) => setTaskInputValue(e.target.value)}
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
              {taskUpdater ? (
                <Fragment>
                  <input defaultValue={task.value} />
                  <button onClick={taskSaveHandler}>
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
                      alt="Delete icon"
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
