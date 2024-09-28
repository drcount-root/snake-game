import styled from "styled-components";
import { GameBoardProps } from "./types";

const GameBoard = styled.div.attrs((props: GameBoardProps) => {
  return {
    style: {
      grid: `repeat(${props.gridColumns}, minmax(0, 1fr)) / repeat(${props.gridRows}, minmax(0, 1fr))`,
    },
  };
})<GameBoardProps>`
  background-color: ${(props) => (props.theme.isDark ? "black" : "white")};
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 6px;

  display: grid;
`;

export default GameBoard;
