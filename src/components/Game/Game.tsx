import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getRandomNumBetween } from "@/utils/getRandomNumBetween";
import Button from "../Button";
import Text from "../Text";
import GameBoard from "../GameBoard";
import Snake from "../Snake";
import Food from "../Food";
import TouchControls from "../TouchControls";
import Tagline from "../Tagline";
import { DirectionMap, Directions } from "./types";

const SnakeGame = () => {
  // game
  const [gameState, setGameState] = useState("begin");
  const [gameOver, setGameOver] = useState(false);
  const gridColumns = 21;
  const gridRows = 21;
  const requestAnimationFrameRef = useRef(0);
  const previousTimeRef = useRef(0);
  const initialGameSpeed = 250;
  const [gameSpeed, setGameSpeed] = useState(initialGameSpeed); // game refresh rate in milliseconds
  const snakeWrap = true; // should the snake die when it hits a all or die
  const [score, setScore] = useState(0);

  // direction
  const initialDirection = "down";
  const previousDirection = useRef(initialDirection);
  const [direction, setDirection] = useState<Directions>(initialDirection);

  // snake
  const initialSnake: Array<{
    x: number;
    y: number;
    direction: Directions;
  }> = [
    { x: 11, y: 4, direction: "down" },
    { x: 11, y: 3, direction: "down" },
    { x: 11, y: 2, direction: "down" },
    { x: 11, y: 1, direction: "down" },
  ];
  const [snakeBody, setSnakeBody] = useState(initialSnake);
  const snakeGrowAmount = 2; // how much does the snake grow when it eats food

  // food
  const initalFood = { x: 11, y: 9 };
  const [foodPos, setFoodPos] = useState(initalFood);

  // game loop
  useEffect(() => {
    requestAnimationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestAnimationFrameRef.current);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, gameOver, foodPos, direction]);

  // keyboard listener
  useEffect(() => {
    function keyDownHandler(e: KeyboardEvent) {
      if (gameState !== "playing") return;

      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowRight" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft"
      ) {
        e.preventDefault(); // prevent the page scrolling up/down
        const directionMap: DirectionMap = {
          ArrowUp: "up",
          ArrowRight: "right",
          ArrowDown: "down",
          ArrowLeft: "left",
        };
        updateDirection(directionMap[e.key as keyof DirectionMap]);
      }
    }
    window.addEventListener("keydown", keyDownHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [gameState]);

  const animate = (time: number) => {
    if (gameState === "begin") {
      return;
    }

    if (gameOver === true) {
      setGameState("end");
      return;
    }

    requestAnimationFrameRef.current = requestAnimationFrame(animate);
    const timeDiff = time - previousTimeRef.current;
    if (timeDiff > gameSpeed) {
      previousTimeRef.current = time;
      previousDirection.current = direction;
      updateSnake();
    }
  };

  function resetGame() {
    setSnakeBody(initialSnake);
    setFoodPos(initalFood);
    previousDirection.current = initialDirection;
    setDirection(initialDirection);
    setGameSpeed(initialGameSpeed);
    setScore(0);
    setGameOver(false);
  }

  function updateDirection(selected: Directions) {
    // cant go back on yourself
    if (selected === "up" && previousDirection.current === "down") return;
    if (selected === "right" && previousDirection.current === "left") return;
    if (selected === "down" && previousDirection.current === "up") return;
    if (selected === "left" && previousDirection.current === "right") return;
    setDirection(selected);
  }

  function updateSnake() {
    let newArr = snakeBody;

    // update position of each snake segment (except head)
    for (let i = snakeBody.length - 2; i >= 0; i--) {
      newArr[i + 1] = { ...snakeBody[i] };
    }

    // update position of head
    const positionMap: {
      up: { xy: "y"; val: -1 };
      right: { xy: "x"; val: 1 };
      down: { xy: "y"; val: 1 };
      left: { xy: "x"; val: -1 };
    } = {
      up: { xy: "y", val: -1 },
      right: { xy: "x", val: 1 },
      down: { xy: "y", val: 1 },
      left: { xy: "x", val: -1 },
    };

    const axis: "x" | "y" = positionMap[direction].xy; // are we updateing x or y
    const updateVal = positionMap[direction].val; // what to add to the head value
    newArr[0][axis] += updateVal; // update the head position

    // snake should wrap when hitting a wall
    if (snakeWrap) {
      const minVal = 0;
      const maxVal = axis === "x" ? gridColumns + 1 : gridRows + 1;
      if (newArr[0][axis] === minVal) {
        newArr[0][axis] = maxVal - 1;
      } else if (newArr[0][axis] === maxVal) {
        newArr[0][axis] = minVal + 1;
      }
    }

    // update direction of head
    newArr[0].direction = direction;

    // if the snake is eating food
    const isSnakeEatingFood = isPosIntersecting(snakeBody[0], foodPos);
    if (isSnakeEatingFood) {
      // expand the snake
      for (let i = 0; i < snakeGrowAmount; i++) {
        newArr.push({ ...newArr[newArr.length - 1] });
      }

      setScore(score + 1);
      setGameSpeed(gameSpeed - 5);

      // update the position of the food
      setFoodPos(newFoodPos());
    }

    const isOutsideGrid = isOutside();
    if (isOutsideGrid && !snakeWrap) {
      setGameOver(true);
    }

    const snakeEatItself = isSnakeIntersectItself();
    if (snakeEatItself) {
      setGameOver(true);
    }

    setSnakeBody([...newArr]);
  }

  function isPosIntersecting(
    a: { x: number; y: number },
    b: { x: number; y: number }
  ) {
    const result = a.x === b.x && a.y === b.y;
    return result;
  }

  function isSnakeIntersect(pos: { x: number; y: number }) {
    return snakeBody.some((segment) => {
      return isPosIntersecting(segment, pos);
    });
  }

  function newFoodPos() {
    let newPos = null;

    while (newPos === null || isSnakeIntersect(newPos)) {
      newPos = {
        x: getRandomNumBetween(1, gridColumns - 1),
        y: getRandomNumBetween(1, gridRows - 1),
      };
    }

    return newPos;
  }

  function isSnakeIntersectItself() {
    const snakeHead = snakeBody[0];
    return snakeBody.some((segment, i) => {
      if (i == 0) return; // ignore head of the snake
      return isPosIntersecting(segment, snakeHead);
    });
  }

  function isOutside() {
    const sbakeHead = snakeBody[0];
    return (
      sbakeHead.x < 1 ||
      sbakeHead.y < 1 ||
      sbakeHead.x > gridColumns ||
      sbakeHead.y > gridRows
    );
  }

  return (
    <Layout>
      <LayoutGame>
        <GameContainer>
          {gameState === "begin" && (
            <GameModal>
              <Button onClick={() => setGameState("playing")}>
                Start Game
              </Button>
            </GameModal>
          )}

          {gameState === "end" && (
            <GameModal>
              <div>
                <Tagline text="Better luck next time" />
                <br />
                <br />
                <Button
                  onClick={() => {
                    resetGame();
                    setGameState("playing");
                  }}
                >
                  Start again
                </Button>
              </div>
            </GameModal>
          )}

          <GameBoard gridColumns={gridColumns} gridRows={gridRows}>
            <Snake body={[...snakeBody]} />
            <Food pos={foodPos} />
          </GameBoard>
        </GameContainer>
      </LayoutGame>

      <LayoutScore>
        <Text style={{ textAlign: "center" }}>Score: {score}</Text>
      </LayoutScore>

      <LayoutTouchControls>
        <TouchControls callback={updateDirection} />
      </LayoutTouchControls>
    </Layout>
  );
};

export default SnakeGame;

const GameModal = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.theme.isDark ? `rgba(0, 0, 0, 0.9)` : `rgba(255, 255, 255, 0.9)`};
  border-radius: 6px;
  text-align: center;

  display: grid;
  place-items: center;
`;

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding: 16px;
`;

const LayoutGame = styled.div`
  overflow: hidden;
`;

const GameContainer = styled.div`
  position: relative;
  aspect-ratio: 1/1;
  max-height: 100%;
  margin: 0 auto;
`;

const LayoutScore = styled.div``;

const LayoutTouchControls = styled.div`
  display: none;
  @media (hover: none) and (pointer: coarse) {
    display: block;
  }
`;
