import { useEffect, useState } from "react";
import styled from "styled-components";
import { getRandomNumBetween } from "@/utils/getRandomNumBetween";
import AppleSvg from "./assets/apple.svg";
import AvocadoSvg from "./assets/avocado.svg";
import BurgerSvg from "./assets/burger.svg";
import CheeseSvg from "./assets/cheese.svg";
import GrapesSvg from "./assets/grapes.svg";
import { FoodProps } from "./types";

const Food = (props: FoodProps) => {
  const [icon, setIcon] = useState(<AppleSvg key="apple" />);

  useEffect(() => {
    const num = getRandomNumBetween(0, foodArray.length);
    setIcon(foodArray[num]);
  }, [props.pos]);

  return <FoodOuter pos={props.pos}>{icon}</FoodOuter>;
};

export default Food;

const foodArray = [
  <AppleSvg key="apple" />,
  <AvocadoSvg key="avo" />,
  <BurgerSvg key="burger" />,
  <CheeseSvg key="cheese" />,
  <GrapesSvg key="grapes" />,
];

const FoodOuter = styled.div.attrs((props: FoodProps) => {
  return {
    style: {
      gridColumnStart: props.pos.x,
      gridRowStart: props.pos.y,
    },
  };
})<FoodProps>`
  width: 100%;
  height: 100%;

  svg {
    float: left;
    display: block;
    width: 100%;
  }
`;
