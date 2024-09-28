/* Clamp builder
 *
 * Generates a liquid/responsive css clamp value to be used as font size, padding, margin, etc
 * taken from https://github.com/walbo/font-size-clamp
 */
export function clampBuilder(options: {
  minFontSize: string;
  maxFontSize: string;
  minWidth: string;
  maxWidth: string;
  root: string;
}): string {
  if (Object.values(options).some((value) => !value)) {
    return "";
  }
  const root = parseInt(options.root, 10);

  const minFontSize = convertToRem(options.minFontSize, root);
  const maxFontSize = convertToRem(options.maxFontSize, root);
  const minWidth = convertToRem(options.minWidth, root);
  const maxWidth = convertToRem(options.maxWidth, root);

  if ([minFontSize, maxFontSize, minWidth, maxWidth].some((v) => isNaN(v))) {
    return "";
  }

  const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  const yAxisIntersection = toFixed(-minWidth * slope + minFontSize);

  const min = `${minFontSize}rem`;
  const max = `${maxFontSize}rem`;
  const preferred = `${yAxisIntersection}rem + ${toFixed(slope * 100)}vw`;

  return `clamp(${min}, ${preferred}, ${max})`;
}

const allUnits = {
  px: {
    value: "px",
    label: "px",
    step: 1,
  },
  rem: {
    value: "rem",
    label: "rem",
    step: 0.01,
  },
};

const UNITS = Object.values(allUnits);

function parseUnit(value: string): [string, string, number] {
  const num = value.replace("px", "").replace("rem", "");

  const unitMatches = value.match(/[\d.\-+]*\s*(.*)/);
  const unit = unitMatches !== null ? unitMatches[1] : "";
  const match = UNITS.find((item) => item.value === unit);

  return [num, match?.value || "px", match?.step || 1];
}

function convertToRem(value: string, root: number): number {
  const [num, unit] = parseUnit(value);

  if (unit === "rem") {
    return parseFloat(num);
  }

  return parseFloat(num) / root;
}

function toFixed(value: number) {
  return parseFloat(value.toFixed(4));
}
