import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { ff, fz } from "../../theme/text";
import { ButtonProps, ButtonOuterProps } from "./types";
import LoadingSvg from "./images/spinner.svg";

const Button = (props: ButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isClicked) {
      setTimeout(() => {
        setIsClicked(false);
      }, 300);
    }
  }, [isClicked]);

  return (
    <ButtonOuter $loading={props.loading} disabled={props.disabled}>
      <ButtonInner
        className={`${isClicked ? "isClicked" : ""}`}
        onClick={() => {
          if (!props.loading || !props.disabled) setIsClicked(true);
          if (props.onClick) props.onClick();
        }}
        as={props.as || (props.href && "a")}
        outline={props.outline}
        $loading={props.loading}
        disabled={props.disabled}
        href={props.href}
        target={props.target}
      >
        {props.loading && (
          <LoadingIcon>
            <LoadingSvg />
          </LoadingIcon>
        )}
        <ButtonText>{props.children}</ButtonText>
      </ButtonInner>
    </ButtonOuter>
  );
};

export default Button;

const animationButtonActive = keyframes`
  0%{
    box-shadow: 0 0 0px 4px #999999;
  }
  100%{
    box-shadow: 0 0 0px 10px transparent;
  }
`;

const ButtonText = styled.span``;

const LoadingIcon = styled.span`
  width: ${fz.pResponsive};
  height: ${fz.pResponsive};
  margin-right: calc(${fz.pResponsive} / 2);
`;

const ButtonOuter = styled.span.attrs(() => {})<ButtonOuterProps>`
  ${(props) =>
    props.$loading &&
    css`
      cursor: wait;
    `}

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}
`;

const defaultTransition =
  "color 200ms ease-out, background-color 200ms ease-out, border-color 200ms ease-out";

const ButtonInner = styled.button.attrs(() => {})<ButtonProps>`
  /* reset */
  background: none;
  border: none;
  appearence: none;
  outline: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;

  /* default styles */
  position: relative;
  padding: calc(${fz.pResponsive} / 2) ${fz.pResponsive};
  margin-bottom: 0;
  font-family: ${ff.p};
  font-size: ${fz.pResponsive};
  color: ${(props) => props.theme.backgroundColor || "#fff"};
  background-color: ${(props) => props.theme.color || "#000"};
  border-radius: 6px;
  transition: ${defaultTransition};

  /* hover */
  &:hover {
    background-color: ${(props) =>
      props.theme.isDark ? "#cccccc" : "#555555"};
    transition: ${defaultTransition};
  }

  /* active */
  &:active {
    background-color: ${(props) => props.theme.color || "#000"};
    box-shadow: 0 0 0px 2px #999999;
    transition: ${defaultTransition};

    ${ButtonText} {
      /* display: inline-block; */
      transition: all 150ms ease-out;
    }
  }

  /* clicked aniumation */
  &.isClicked {
    animation: ${animationButtonActive} 300ms linear;
  }

  /* outline */
  ${(props) =>
    props.outline &&
    css`
      background: transparent;
      border: 2px solid;
      border-color: ${(props) => props.theme.color || "#000"};
      color: ${(props) => (props.theme.isDark ? "white" : "#000")};

      &:hover {
        border-color: #cccccc;
        background: transparent;
      }

      &:active {
        border-color: ${(props) => props.theme.color || "#000"};
      }
    `}

  /* loading */
  ${(props) =>
    props.$loading &&
    css`
      display: flex;
      align-items: center;
      pointer-events: none;

      svg {
        width: 100%;
        height: 100%;
        object-fit: contain;
        stroke: ${(props) => (props.theme.isDark ? "black" : "white")};
        fill: ${(props) => (props.theme.isDark ? "black" : "white")};
      }
    `}
  
  ${LoadingIcon} + ${ButtonText} {
    margin-left: 0.25em;
  }

  /* disabled */
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;

      ${ButtonText} {
        opacity: 0.5;
      }
    `}
`;
