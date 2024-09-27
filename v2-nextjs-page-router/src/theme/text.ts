import { clampBuilder } from "../utils/clamp-generator";

const defaultFontStack = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;
const defaultMonospaceFontStack = `Menlo, Consolas, "Ubuntu Mono", "Roboto Mono", "DejaVu Sans Mono", monospace`;

export const clampDefault = {
  minWidth: "576px",
  maxWidth: "1200px",
  root: "16",
};

export const fonts = {
  oswald: `"OswaldVariable"`,
  nunito: `"NunitoVariable"`,
  inconsolada: `"InconsolataVariable"`,
};

export const ff = {
  h1: `${fonts.oswald}, ${defaultFontStack}`,
  h2: `${fonts.nunito}, ${defaultFontStack}`,
  h3: `${fonts.nunito}, ${defaultFontStack}`,
  h4: `${fonts.nunito}, ${defaultFontStack}`,
  h5: `${fonts.nunito}, ${defaultFontStack}`,
  h6: `${fonts.nunito}, ${defaultFontStack}`,
  p: `${fonts.nunito}, ${defaultFontStack}`,
  mono: `${fonts.inconsolada}, ${defaultMonospaceFontStack}`,
};

export const fz = {
  h1: "36px",
  h2: "32px",
  h3: "28px",
  h4: "24px",
  h5: "20px",
  h6: "18px",
  p: "16px",
  small: "12px",
  h1Responsive: clampBuilder({
    minFontSize: "36",
    maxFontSize: "42",
    ...clampDefault,
  }),
  h2Responsive: clampBuilder({
    minFontSize: "32",
    maxFontSize: "38",
    ...clampDefault,
  }),
  h3Responsive: clampBuilder({
    minFontSize: "28",
    maxFontSize: "32",
    ...clampDefault,
  }),
  h4Responsive: clampBuilder({
    minFontSize: "24",
    maxFontSize: "28",
    ...clampDefault,
  }),
  h5Responsive: clampBuilder({
    minFontSize: "20",
    maxFontSize: "26",
    ...clampDefault,
  }),
  h6Responsive: clampBuilder({
    minFontSize: "18",
    maxFontSize: "24",
    ...clampDefault,
  }),
  pResponsive: clampBuilder({
    minFontSize: "16",
    maxFontSize: "22",
    ...clampDefault,
  }),
  smallResponsive: clampBuilder({
    minFontSize: "12",
    maxFontSize: "16",
    ...clampDefault,
  }),
};

export const lh = {
  h1: "1.4",
  h2: "1.4",
  h3: "1.3",
  h4: "1.3",
  h5: "1.3",
  h6: "1.3",
  p: "1.7",
  small: "1.7",
  h1Responsive: "1.2",
  h2Responsive: "1.2",
  h3Responsive: "1.3",
  h4Responsive: "1.3",
  h5Responsive: "1.3",
  h6Responsive: "1.3",
  smallResponsive: "1.7",
  pResponsive: "1.7",
};
