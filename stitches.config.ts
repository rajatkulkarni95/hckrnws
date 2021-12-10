import { createStitches } from "@stitches/react";

export const { styled, getCssText, createTheme } = createStitches({
  media: {
    phone: `(width < 720px)`,
    tablet: `(720px <= width < 1024px)`,
    desktop: `(1024px <= width < 1536px)`,
    wide: `(1920 <= width)`,
  },
  theme: {
    fonts: {
      mono: `'IBM Plex Mono', monospace`,
      sans: "IBM Plex Sans",
    },
    colors: {
      primaryText: "#EAEAEA",
      secondaryText: "hsl(206, 6%, 43%)",
      background: "hsl(240, 4%, 9%)",
      link: "hsl(21, 35, 92)",
      coloredLink: "#E9C46A",
      codeBlock: "#25292D",
      accent: "#464444",

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
    link: "#3C474B",
    coloredLink: "#467599",
    codeBlock: "#D0CCD0",
    accent: "#E5E5E5",
  },
});
