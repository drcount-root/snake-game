export type TextProps = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  ff?: string;
  fz?: string;
  lh?: string | number;
  fw?: string | number;
  color?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode | string;
};
