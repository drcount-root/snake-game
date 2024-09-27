import { useState } from "react";
import styled from "styled-components";
import AutoSvg from "./images/auto.svg";
import LightSvg from "./images/light.svg";
import DarkSvg from "./images/dark.svg";
import { ThemeSwitchProps, ThemeMapArray } from "./types";

const ThemeSwitch = (props: ThemeSwitchProps) => {
  const [themeIndex, setThemeIndex] = useState(0);

  return (
    <Outer
      onClick={() => {
        const i = themeIndex === themeMap.length - 1 ? 0 : themeIndex + 1;
        setThemeIndex(i);
        props.callback(themeMap[i].name);
      }}
    >
      {themeMap[themeIndex].icon}
    </Outer>
  );
};

export default ThemeSwitch;

const themeMap: ThemeMapArray = [
  {
    name: "auto",
    icon: <AutoSvg alt="auto" />,
  },
  {
    name: "light",
    icon: <LightSvg alt="light" />,
  },
  {
    name: "dark",
    icon: <DarkSvg alt="dark" />,
  },
];

const Outer = styled.div`
  svg {
    display: block;
    width: 30px;
    height: 30px;
  }
`;
