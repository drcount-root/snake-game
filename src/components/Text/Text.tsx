import styled from "styled-components";
import { ff, fz, lh } from "../../theme/text";
import { TextProps } from "./types";

const Text = styled.p<TextProps>`
  margin: 0;
  padding: 0;
  font-family: ${(props) => props.ff || ff.p};
  font-size: ${(props) => props.fz || fz.pResponsive};
  line-height: ${(props) => props.lh ?? lh.pResponsive};
  font-weight: ${(props) => props.fw || 400};
  color: ${(props) => props.color || props.theme?.color};
`;

export default Text;

export const H1 = (props: TextProps) => (
  <Text
    as="h1"
    ff={ff.h1}
    fz={fz.h1Responsive}
    lh={lh.h1Responsive}
    fw={500}
    css={"text-transform:uppercase"}
    {...props}
  />
);

export const H2 = (props: TextProps) => (
  <Text
    as="h2"
    ff={ff.h2}
    fz={fz.h2Responsive}
    lh={lh.h2Responsive}
    fw={700}
    {...props}
  />
);

export const H3 = (props: TextProps) => (
  <Text
    as="h3"
    ff={ff.h3}
    fz={fz.h3Responsive}
    lh={lh.h3Responsive}
    fw={700}
    {...props}
  />
);

export const H4 = (props: TextProps) => (
  <Text
    as="h4"
    ff={ff.h4}
    fz={fz.h4Responsive}
    lh={lh.h4Responsive}
    fw={700}
    {...props}
  />
);

export const H5 = (props: TextProps) => (
  <Text
    as="h5"
    ff={ff.h5}
    fz={fz.h5Responsive}
    lh={lh.h5Responsive}
    fw={700}
    {...props}
  />
);

export const H6 = (props: TextProps) => (
  <Text
    as="h6"
    ff={ff.h6}
    fz={fz.h6Responsive}
    lh={lh.h6Responsive}
    fw={700}
    {...props}
  />
);

export const P = (props: TextProps) => <Text as="p" {...props} />;

export const Strong = (props: TextProps) => (
  <Text as="strong" fw="bold" {...props} />
);

export const Small = (props: TextProps) => (
  <Text as="small" fz={fz.smallResponsive} lh={lh.smallResponsive} {...props} />
);

export const I = (props: TextProps) => (
  <Text as="i" css={"font-style: italic"} {...props} />
);

export const U = (props: TextProps) => (
  <Text as="u" css={"text-decoration: underline"} {...props} />
);
