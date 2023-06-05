import { size } from "lodash";
import React, { Fragment } from "react";
import styled from "styled-components";

import iconDelete from "../../assets/imgs/delete.svg";
import iconUpdate from "../../assets/imgs/update.svg";
import Button from "./Button";

const TaskItem = function ({
  task,
  weekday,
  onTaskUpdate,
  onTaskDelete,
  date,
}) {
  return (
    <TaskFlex>
      <span>
        {task.value}
        <p
          style={{
            color: "#888888",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "17px",
          }}
        >
          {task.day === weekday[date.getDay()] ? "Today" : task.day} at{" "}
          {task.hour} : {task.min} {task.hour >= 12 ? "PM" : "AM"}
        </p>
      </span>

      <div>
        <Button
          icon={iconUpdate}
          alt="Update icon"
          onClick={() => onTaskUpdate(task)}
        />
        <Button
          icon={iconDelete}
          alt="Delete icon"
          onClick={() => onTaskDelete(task)}
        />
      </div>
    </TaskFlex>
  );
};

const TaskFlex = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button:first-child {
    margin: 0 18px 0 0;
  }
`;

export default TaskItem;
