import styled from "styled-components";
import React, { useState, useEffect, Fragment } from "react";

import Task from "./UI/Task";

const getLocalStorage = localStorage.getItem("tasksStorage");
const isLocalStorage = getLocalStorage ? JSON.parse(getLocalStorage) : [];

const TaskContainer = function ({ weekday, date, day, hour, min }) {
  const [taskInputValue, setTaskInputValue] = useState("");
  const [taskId, setTaskId] = useState("");
  const [taskInputUpdateValue, setTaskInputUpdateValue] = useState("");
  const [tasks, setTasks] = useState(isLocalStorage);

  useEffect(() => {
    localStorage.setItem("tasksStorage", JSON.stringify(tasks));
  }, [tasks]);

  const taskAddHandler = function () {
    const obj = {
      id: String(Math.random()),
      value: taskInputValue,
      day: day,
      hour: hour,
      min: min,
    };
    taskInputValue !== "" &&
      tasks.length < 11 &&
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
              day: day,
              hour: hour,
              min: min,
            }),
          ];
          break;
        }
      }
      return [...prevState];
    });
  };

  return (
    <Tasks>
      <NewTask>
        <input
          id="task-input"
          type="text"
          name=""
          value={taskInputValue}
          onKeyDown={(e) => {
            e.key == "Enter" && taskAddHandler();
          }}
          onChange={(e) =>
            e.target.value.length < 29 && setTaskInputValue(e.target.value)
          }
          placeholder="Note"
        />
        <button onClick={taskAddHandler}>+</button>
      </NewTask>

      <AddedTasks className="tasks-list">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            taskId={taskId}
            taskInputUpdateValue={taskInputUpdateValue}
            setTaskInputUpdateValue={setTaskInputUpdateValue}
            taskSaveHandler={taskSaveHandler}
            taskUpdateHandler={taskUpdateHandler}
            taskDeleteHandler={taskDeleteHandler}
            weekday={weekday}
            date={date}
          />
        ))}
      </AddedTasks>
    </Tasks>
  );
};

const Tasks = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap");
  font-family: "Inter", sans-serif;
  padding: 13px 28px;
`;

const NewTask = styled.div`
  height: 49px;

  input {
    height: 100%;
    width: 275px;
    margin-right: 8px;
    background-color: ${({ theme }) => theme.colors.lightGrey};
    border: none;
    padding: 0 0 0 14px;
    border-radius: 5px;

    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0em;

    &:focus {
      outline: none;
      border: 2px solid ${({ theme }) => theme.colors.lightGreen};
    }
  }

  button {
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
    width: 89px;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.lightGreen};
    border: none;
    border-radius: 5px;
  }
`;

const AddedTasks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 36px 0 0 0;
  width: 100%;
`;

export default TaskContainer;
