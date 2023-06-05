import styled, { createGlobalStyle } from "styled-components";

// import russoOne from "../assets/fonts/RussoOne-Regular.ttf";

const GlobalStyles = createGlobalStyle`
#root {
    display: flex;
    align-items: center;
    
    height: 100vh;
    position: relative;
    background-color: ${({ theme }) => theme.colors.background};

    @media (max-width: 1024px) {
        
        padding: 200px 0 0 0 ;
      }

    :before{
        content: "Todo";
        position: absolute;
        left: 19%;
        color: ${({ theme }) => theme.colors.blue};
        font-size:96px;
        font-family: "Inter";
        font-weight: 700;

        @media (max-width: 1024px) {
            top: 0;
            left: 50%;
            transform: translateX(-50%);

          }
    }
  }


  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
