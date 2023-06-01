import styled from "styled-components";
import ImgContainerBackground from "../assets/Img-Container-Background.png";

const ImgContainer = styled.div`
  height: 202px;
  width: 100%;
  background-image: url(${ImgContainerBackground});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default ImgContainer;
