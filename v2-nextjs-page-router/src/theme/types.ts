export type TextProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  p?: boolean;
  mono?: boolean;
  ff?: string;
  fz?: string;
  lh?: string;
  fw?: string;
  color?: string;
};

export type ThemeProps = {
  color: ColorProp;
  light: ColorProp;
  dark: ColorProp;
};

export type ColorProp = {
  light: ColorProp;
  dark: ColorProp;
  blue: string;
  green: string;
  orange: string;
  pink: string;
};
