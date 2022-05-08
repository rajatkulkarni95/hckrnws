import { createStitches } from "@stitches/react";
import {
  slateDark,
  blueDark,
  tomatoDark,
  plumDark,
  indigoDark,
  tealDark,
  grassDark,
  amberDark,
  brownDark,
  cyanDark,
  slate,
  blue,
  cyan,
  amber,
} from "@radix-ui/colors";

export const { styled, getCssText, createTheme, globalCss } = createStitches({
  media: {
    phone: `(width < 720px)`,
    tablet: `(720px <= width < 1024px)`,
    desktop: `(1024px <= width < 1536px)`,
    wide: `(1920 <= width)`,
  },
  theme: {
    fonts: {
      mono: "IBM Plex Mono",
      sans: "IBM Plex Sans",
    },
    colors: {
      primaryText: slateDark.slate12,
      secondaryText: slateDark.slate10,
      background: slateDark.slate1,
      coloredLink: blueDark.blue9,
      codeBlock: slateDark.slate3,
      accent: slateDark.slate6,
      hovered: slateDark.slate2,
      opBG: blueDark.blue3,
      opColor: blueDark.blue9,
      rootComment: cyanDark.cyan9,
      parentComment: amberDark.amber9,

      level0: tomatoDark.tomato8,
      level1: plumDark.plum8,
      level2: indigoDark.indigo8,
      level3: tealDark.teal8,
      level4: grassDark.grass8,
      level5: amberDark.amber8,
      level6: brownDark.brown8,
      level7: cyanDark.cyan8,
    },
    fontSizes: {
      0: "12px",
      1: "14px",
      2: "16px",
      3: "20px",
      4: "24px",
      5: "28px",
      6: "32px",
      7: "36px",
      8: "40px",
      9: "48px",
    },
  },
});

export const lightTheme = createTheme({
  colors: {
    primaryText: slate.slate12,
    secondaryText: slate.slate10,
    background: slate.slate1,
    coloredLink: blue.blue9,
    codeBlock: slate.slate3,
    accent: slate.slate7,
    hovered: slate.slate3,
    opBG: blue.blue3,
    opColor: blue.blue9,
    rootComment: cyan.cyan9,
    parentComment: amber.amber9,
  },
});
