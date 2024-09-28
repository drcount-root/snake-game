import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import typewriterText from "@/utils/typewriterText";
import Text from "@/components/Text";

const Tagline = (props: { text: string }) => {
  const [typedText, setTypedText] = useState();
  const runOnce = useRef(false);

  useEffect(() => {
    if (!runOnce.current)
      typewriterText(props.text, setTypedText, { min: 1, max: 100 });
    runOnce.current = true;
  }, [props.text]);

  return <Container>{typedText}</Container>;
};

const Container = styled(Text)`
  width: 100%;
  height: 25px;
  min-height: 25px;
  margin: 0;
  padding: 0;
  text-align: center;
  user-select: none;
`;

export default Tagline;
