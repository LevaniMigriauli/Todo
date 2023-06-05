import React, { useEffect, useState } from "react";

import styled, { ThemeProvider } from "styled-components";
import { defaultTheme } from "./assets/themes/deafultTheme";
import GlobalStyles from "./components/GlobalStyles";

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
      <MainContainer>
        <GlobalStyles />
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

  position: absolute;
  left: 53%;

  @media (max-width: 1024px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

export default App;
