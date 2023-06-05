import React, { Fragment } from "react";
import styled from "styled-components";

import TaskItem from "./TaskItem";
import TaskUpdateItem from "./TaskUpdateItem";

const Task = ({
  task,
  taskId,
  taskInputUpdateValue,
  setTaskInputUpdateValue,
  taskSaveHandler,
  taskUpdateHandler,
  taskDeleteHandler,
  weekday,
  date,
}) => {
  return (
    <EachTask>
      {task.id === taskId ? (
        <TaskUpdateItem
          task={task}
          taskInputUpdateValue={taskInputUpdateValue}
          onTaskSave={taskSaveHandler}
          setTaskInputUpdateValue={setTaskInputUpdateValue}
        />
      ) : (
        <TaskItem
          task={task}
          date={date}
          onTaskUpdate={taskUpdateHandler}
          onTaskDelete={taskDeleteHandler}
          weekday={weekday}
        />
      )}
    </EachTask>
  );
};

const EachTask = styled.li`
  color: #0d0d0d;

  height: 44px;
  width: 100%;
  list-style: none;
`;

export default Task;
