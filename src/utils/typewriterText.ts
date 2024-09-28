import { getRandomNumBetween } from "@/utils/getRandomNumBetween";

function typewriterText(
  text: string,
  callback: Function,
  speedRange: { min: number; max: number }
) {
  let currentText: string;
  let i = 0;

  function typeWriter(text: string) {
    if (i <= text.length) {
      currentText = text.substring(0, i++);
      callback(currentText);
      setTimeout(() => {
        typeWriter(text);
      }, getRandomNumBetween(speedRange.min, speedRange.max));
    }
  }

  typeWriter(text);
}

export default typewriterText;
