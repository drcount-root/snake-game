export type ButtonProps = {
  as?: "button" | "a";
  onClick?: Function;
  style?: React.CSSProperties;
  outline?: boolean;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode | string;
  href?: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
};

export type ButtonOuterProps = {
  loading?: boolean;
  disabled?: boolean;
};
