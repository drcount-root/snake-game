import styled, { css, keyframes } from "styled-components";

const gradientBg = keyframes`
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

export default styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100vw;
  height: 100vh;
  box-shadow: inset 0 0 20vw rgb(0 0 0 / 5%);
  background-size: 400% 400%;
  animation: ${gradientBg} 30s linear infinite;

  /* light theme */
  background-image: ${`linear-gradient(145deg, #c3f0c8, #509bf5, #fb59ba, #ffc867)`};

  /* dark theme */
  ${(props) =>
    props.theme.isDark &&
    css`
      background-size: 300% 300%;
      background-image: ${`linear-gradient(145deg, #950F5F, #19386F, #227551)`};
    `}
`;
