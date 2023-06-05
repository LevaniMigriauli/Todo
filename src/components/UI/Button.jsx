import React from "react";
import styled from "styled-components";

const Button = function ({ alt, onClick, icon }) {
  return (
    <IconBtn>
      <img src={icon} alt={alt} onClick={onClick} />
    </IconBtn>
  );
};

const IconBtn = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  background: none;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default Button;
