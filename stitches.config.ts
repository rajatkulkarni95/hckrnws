import { createStitches } from "@stitches/react";

export const { styled, getCssText } = createStitches({
  media: {
    phone: `(width < 720px)`,
    tablet: `(720px <= width < 1024px)`,
    desktop: `(1024px <= width < 1536px)`,
    wide: `(1536px <= width)`,
  },
  theme: {
    fonts: {
      mono: `'IBM Plex Mono', monospace`,
      sans: "IBM Plex Sans, sans-serif",
    },
    colors: {
      primaryText: "hsl(210, 6%, 93%)",
      secondaryText: "hsl(206, 6%, 43%)",
      background: "hsl(240, 4%, 9%)",
      link: "hsl(21, 35, 92)",
      coloredLink: "#E9C46A",
    },
    fontSizes: {
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
