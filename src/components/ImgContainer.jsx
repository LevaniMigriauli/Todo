import { Fragment } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import ImgContainerBackground from "../assets/Img-Container-Background.png";

const ImgContainer = ({ day, dateN, hour, min }) => {
  return (
    // <RussoFontWrapper>
    <ImgBox>
      <div>
        <p>
          {day} {dateN}
        </p>
        <p>
          {hour}:{min} {hour >= 12 ? "PM" : "AM"}
        </p>
      </div>
    </ImgBox>
    // </RussoFontWrapper>
  );
};

const ImgBox = styled.div`
  height: 202px;
  width: 100%;
  background-image: url(${ImgContainerBackground});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 0 28px 13px 0;
  position: relative;
  color: #fff;
  font-family: "Russo One", sans-serif;
  @import url("https://fonts.googleapis.com/css2?family=Russo+One&display=swap");

  div {
    position: absolute;
    bottom: 13px;
    right: 28px;
    text-align: right;

    p:first-child {
      font-size: 18px;
      line-height: 22px;
    }
    p:last-child {
      font-size: 48px;
      line-height: 58px;
    }
  }
`;

// const RussoFontWrapper = styled.div`

// `;

export default ImgContainer;
