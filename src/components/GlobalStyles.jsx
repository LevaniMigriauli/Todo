import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
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
