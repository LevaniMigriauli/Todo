import React, { useEffect, useState } from "react";

// import { GlobalStyles } from "./components/UI/GlobalStyles";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { defaultTheme } from "./assets/themes/deafultTheme";

import ImgContainer from "./components/ImgContainer";
import TaskContainer from "./components/TaskContainer";

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

function App() {
  const [date, setDate] = useState(new Date());

  const refreshTimeHandler = function () {
    setDate(new Date());
  };

  const day = weekday[date.getDay()];
  const dateN = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();

  useEffect(() => {
    const dateUpdater = setInterval(refreshTimeHandler, 60000);

    return function cleanup() {
      clearInterval(dateUpdater);
    };
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <MainContainer>
        <ImgContainer day={day} dateN={dateN} hour={hour} min={min} />

        <TaskContainer
          weekday={weekday}
          date={date}
          day={day}
          hour={hour}
          min={min}
        />
      </MainContainer>
    </ThemeProvider>
  );
}

const MainContainer = styled.div`
  min-height: 636px;
  width: 430px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white};
  margin-top: 100px;

  position: absolute;
  left: 53%;

  @media (max-width: 1024px) {
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
  }
`;

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#root {
  font-family: Inter, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  display: flex;
  align-items: center;

  height: 100vh;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: 1024px) {
    /* padding: 200px 0 0 0; */
  }
  &:before {
    content: "Todo";
    position: absolute;
    left: 19%;
    color: ${({ theme }) => theme.colors.blue};
    font-size: 96px;
    font-family: "Inter";
    font-weight: 700;

    @media (max-width: 1024px) {
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
`;

export default App;
