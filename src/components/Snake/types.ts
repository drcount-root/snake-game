export type SnakeProps = {
  body: Array<{
    x: number;
    y: number;
    direction: "up" | "down" | "left" | "right";
  }>;
};

export type SnakeSegmentProps = { x: number; y: number };

export type SnakeHeadProps = { direction: "up" | "down" | "left" | "right" };

export type SnakeBodyProps = {
  direction: "up" | "down" | "left" | "right";
  prevBody: {
    x: number;
    y: number;
    direction: "up" | "down" | "left" | "right";
  };
};

export type SnakeTailProps = SnakeHeadProps;
