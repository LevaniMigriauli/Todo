import React, { useRef, useState } from "react";
import "./App.css";

import iconDelete from "./assets/delete.svg";

function App() {
  // const [taskInputValue, setTaskInputValue] = useState();
  const taskInputValue = useRef();
  const [tasks, setTasks] = useState([]);

  const taskAddHandler = function () {
    const obj = {
      id: String(Math.random()),
      value: taskInputValue.current.value,
    };
    setTasks((prevState) => {
      return [...prevState, obj];
    });

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

  // console.log(tasks);

  return (
    <>
      <div>
        <input
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
        <ul>
          {tasks.map((task) => (
            <li key={task.id} onClick={() => taskDeleteHandler(task)}>
              {task.value}
              <img src={iconDelete} alt="" />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
