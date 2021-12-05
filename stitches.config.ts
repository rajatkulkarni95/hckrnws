import { createStitches } from "@stitches/react";

export const { styled, getCssText } = createStitches({
  theme: {
    fonts: {
      mono: `'IBM Plex Mono', monospace`,
    },
    colors: {
      primaryText: "hsl(210, 6%, 93%)",
      secondaryText: "hsl(206, 6%, 43%)",
      background: "hsl(240, 4%, 9%)",
    },
    fontSizes: {
      1: "12px",
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
  media: {
    bp1: "(max-width: 1200px)",
    bp2: "(max-width: 768px)",
    bp3: "(max-width: 480px)",
  },
});
