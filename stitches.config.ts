import { createStitches } from "@stitches/react";
import { slateDark, blueDark, violetDark } from "@radix-ui/colors";

export const { styled, getCssText, createTheme } = createStitches({
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

      level0: "#F02D3D",
      level1: "#FAA916",
      level2: "#6A994E",
      level3: "#2A9BB7",
      level4: "#E5989B",
      level5: "#94D2BD",
      level6: "#F9844A",
      level7: "#52B788",
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
    primaryText: "#161618",
    secondaryText: "#6F6F6F",
    background: "#ECEDEE",
    coloredLink: "#467599",
    codeBlock: "#D0CCD0",
    accent: "#BABABA",
    hovered: "#E5E5E5",
    opBG: "#b9ccf4",
    opColor: "#1d456c",
  },
});
