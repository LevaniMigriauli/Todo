import React, { useRef, useState } from "react";
import "./App.css";

function App() {
  // const [taskInputValue, setTaskInputValue] = useState();
  const taskInputValue = useRef();
  const [tasks, setTasks] = useState([]);

  const taskAddHandler = function () {
    const obj = {
      id: String(Math.random()),
      value: taskInputValue.current.value,
    };
    setTasks((prevState) => [...prevState, obj]);
  };

  console.log(tasks);

  return (
    <>
      <div>
        <input
          type="text"
          name=""
          id="add"
          ref={taskInputValue}
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
          {tasks.map((task, index) => (
            <li key={index}>{task.value}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
