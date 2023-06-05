import React from "react";
import styled from "styled-components";

import Button from "./Button";

import iconSave from "../../assets/imgs/save.svg";

const TaskUpdateItem = function ({
  task,
  taskInputUpdateValue,
  onTaskSave,
  setTaskInputUpdateValue,
}) {
  return (
    <UpdateTask>
      <input
        value={taskInputUpdateValue}
        onChange={(e) =>
          e.target.value.length < 29 && setTaskInputUpdateValue(e.target.value)
        }
        onKeyDown={(e) =>
          e.key === "Enter" && taskInputUpdateValue !== "" && onTaskSave(task)
        }
      />
      <Button
        onClick={() => taskInputUpdateValue !== "" && onTaskSave(task)}
        icon={iconSave}
        alt="Save icon"
      ></Button>
    </UpdateTask>
  );
};

const UpdateTask = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  input {
    font-size: 18px;
    width: 275px;
    height: 32px;
    background-color: ${({ theme }) => theme.colors.lightGrey};
    border: none;
    border-radius: 5px;
    padding-left: 8px;

    &:focus {
      outline: 1px solid ${({ theme }) => theme.colors.lightGreen};
    }
  }
`;

export default TaskUpdateItem;
