import styled from "styled-components";
import Button from "../Button";
import ArrowUpSvg from "./assets/arrow-up.svg";
import ArrowLeftSvg from "./assets/arrow-left.svg";
import ArrowDownSvg from "./assets/arrow-down.svg";
import ArrowRightSvg from "./assets/arrow-right.svg";

const TouchControls = ({ callback }: { callback: Function }) => (
  <Outer>
    <Grid>
      <div />
      <Button
        onClick={() => {
          callback("up");
        }}
      >
        <ArrowUpSvg />
      </Button>
      <div />
      <Button
        onClick={() => {
          callback("left");
        }}
      >
        <ArrowLeftSvg />
      </Button>
      <Button
        onClick={() => {
          callback("down");
        }}
      >
        <ArrowDownSvg />
      </Button>
      <Button
        onClick={() => {
          callback("right");
        }}
      >
        <ArrowRightSvg />
      </Button>
    </Grid>
  </Outer>
);

export default TouchControls;

const Outer = styled.div`
  display: flex;
  place-content: center;

  /* Disable the need for a 300ms delay on touch devices.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action#manipulation 
   */
  button {
    touch-action: manipulation;
  }
`;

const Grid = styled.div`
  display: grid;
  grid: 1fr 1fr / 1fr 1fr 1fr;
  gap: 16px;

  svg {
    display: block;
  }
`;
