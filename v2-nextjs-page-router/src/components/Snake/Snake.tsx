import styled from "styled-components";
import SnakeHeadSvg from "./assets/snake-head.svg";
import SnakeBodySvg from "./assets/snake-body.svg";
import SnakeBodyCornerSvg from "./assets/snake-body-corner.svg";
import SnakeTailSvg from "./assets/snake-tail.svg";
import {
  SnakeBodyProps,
  SnakeHeadProps,
  SnakeProps,
  SnakeSegmentProps,
  SnakeTailProps,
} from "./types";

const Snake = (props: SnakeProps) => {
  return (
    <>
      {props.body.map(({ x, y, direction }, i: number) => {
        const isHead = i == 0;
        const isBody = i != 0 && i != props.body.length - 1;
        const isTail = i == props.body.length - 1;

        return (
          <SnakeSegment key={`snake-segment-${i}`} x={x} y={y}>
            {isHead && <SnakeHead direction={direction} />}
            {isBody && (
              <SnakeBody direction={direction} prevBody={props.body[i - 1]} />
            )}
            {isTail && <SnakeTail direction={props.body[i - 1].direction} />}
          </SnakeSegment>
        );
      })}
    </>
  );
};

export default Snake;

const SnakeSegment = styled.div.attrs((props: SnakeSegmentProps) => {
  return {
    style: {
      gridColumnStart: props.x,
      gridRowStart: props.y,
    },
  };
})<SnakeSegmentProps>`
  width: 100%;
  height: 100%;

  svg {
    display: block;
  }
`;

const SnakeHead = (props: SnakeHeadProps) => {
  return (
    <SnakeHeadOuter direction={props.direction}>
      <SnakeHeadSvg />
    </SnakeHeadOuter>
  );
};

const SnakeHeadOuter = styled.div.attrs((props: SnakeHeadProps) => {
  return {
    style: {
      transform: `rotate(${directionRotateMap[props.direction]})`,
    },
  };
})<SnakeHeadProps>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  svg {
    position: absolute;
    display: block;
    width: 150%;
  }
`;

const SnakeBody = ({ direction, prevBody }: SnakeBodyProps) => {
  const isBLCorner =
    (direction == "down" && prevBody.direction == "right") ||
    (direction == "left" && prevBody.direction == "up");

  const isBRCorner =
    (direction == "down" && prevBody.direction == "left") ||
    (direction == "right" && prevBody.direction == "up");

  const isTLCorner =
    (direction == "up" && prevBody.direction == "right") ||
    (direction == "left" && prevBody.direction == "down");

  const isTRCorner =
    (direction == "up" && prevBody.direction == "left") ||
    (direction == "right" && prevBody.direction == "down");

  return (
    <SnakeBodyOuter>
      {isBLCorner ? (
        <SnakeBodyCornerSvg />
      ) : isBRCorner ? (
        <SnakeBodyCornerSvg style={{ transform: "rotate(-90deg)" }} />
      ) : isTLCorner ? (
        <SnakeBodyCornerSvg style={{ transform: "rotate(90deg)" }} />
      ) : isTRCorner ? (
        <SnakeBodyCornerSvg style={{ transform: "rotate(-180deg)" }} />
      ) : (
        <SnakeBodySvg
          style={{
            transform:
              (direction == "left" || direction == "right") && "rotate(-90deg)",
          }}
        />
      )}
    </SnakeBodyOuter>
  );
};

const SnakeBodyOuter = styled.div`
  width: 100%;
  height: 100%;
  svg {
    width: 100%;
  }
`;

const SnakeTail = (props: SnakeTailProps) => {
  return (
    <SnakeTailOuter direction={props.direction}>
      <SnakeTailSvg />
    </SnakeTailOuter>
  );
};

const SnakeTailOuter = styled.div.attrs((props: SnakeTailProps) => {
  return {
    style: {
      transform: `rotate(${directionRotateMap[props.direction]})`,
    },
  };
})<SnakeTailProps>`
  width: 100%;
`;

const directionRotateMap = {
  right: "-90deg",
  down: "0deg",
  left: "90deg",
  up: "-180deg",
};
