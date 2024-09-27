import styled, { css } from "styled-components";
import { clampDefault } from "@/theme/text";
import { clampBuilder } from "@/utils/clamp-generator";
import GithubSvg from "@/images/github-icon.svg";
import ThemeSwitch from "@/components/ThemeSwitch";
import Text from "../Text";
import Tagline from "../Tagline";
import { NavBarProps } from "./types";

const NavBar = (props: NavBarProps) => (
  <NavBarOuter>
    <NavBarInner>
      <NavBarGroup1>
        <Text>&#128013;</Text>
      </NavBarGroup1>

      <NavBarGroup2>
        <Tagline text={`<Snake />`} />
      </NavBarGroup2>

      <NavBarGroup3>
        <IconLink
          href="https://github.com/richhdev/snake"
          target="_blank"
          aria-label="github"
        >
          <GithubSvg role="img" alt="github" />
        </IconLink>
        <IconLink as="button" aria-labelledby="themeSwitchLabel">
          <span className="sr-only">Change Theme</span>
          <ThemeSwitch callback={props.setThemeSwitch} />
        </IconLink>
      </NavBarGroup3>
    </NavBarInner>
  </NavBarOuter>
);

export default NavBar;

export const navBarHeight = clampBuilder({
  minFontSize: "60",
  maxFontSize: "80",
  ...clampDefault,
});

const NavBarOuter = styled.div`
  position: fixed;
  top: 0;
  z-index: 3;
  width: 100%;
  height: ${navBarHeight};
  padding: 12px 24px;
`;

const NavBarInner = styled.div`
  width: 100%;
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;

  display: grid;
  grid: 1fr / repeat(3, 1fr);
`;

const NavBarGroup1 = styled.div`
  height: 100%;
  display: flex;
  place-items: center;
`;

const NavBarGroup2 = styled.div`
  height: 100%;

  display: grid;
  place-items: center;

  svg {
    width: ${clampBuilder({
      minFontSize: "120",
      maxFontSize: "150",
      ...clampDefault,
    })};
  }
`;

const NavBarGroup3 = styled.div`
  margin-left: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
`;

const iconLinkTransition = "filter 300ms ease, transform 300ms ease";
const iconLinkDropshadow = "drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.5));";

const IconLink = styled.a`
  border: none;
  background: none;

  svg {
    display: block;
    position: relative;
    z-index: 2;
    width: 24px;
    height: 24px;
    margin: 0 0 0 16px;

    filter: ${iconLinkDropshadow};
    transform: scale(1);
    transition: ${iconLinkTransition};
  }

  &:hover svg {
    filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.25));
    transform: scale(1.1);
    transition: ${iconLinkTransition};
  }

  &:active svg {
    filter: ${iconLinkDropshadow};
    transform: scale(1);
    transition: ${iconLinkTransition};
  }

  svg path {
    fill: ${(props) => (props.theme.isDark ? "white" : "black")};
  }

  ${(props) =>
    props.theme.isDark &&
    css`
      &:hover svg {
        filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.25));
      }
      &:active svg {
        filter: drop-shadow(0px 0px 15px rgba(0, 0, 0, 0.5));
      }
    `}

  ${(props) =>
    !props.theme.isDark &&
    css`
      svg,
      &:hover svg,
      &:active svg {
        filter: none;
      }
    `}
  
    @media (min-width: 992px) {
    svg {
      width: 30px;
      height: 30px;
      margin: 0 0 0 24px;
    }
  }
`;
