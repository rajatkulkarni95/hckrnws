import { globalCss } from "@stitches/react";

export const globalStyles = globalCss({
  "*": { margin: 0, padding: 0, boxSizing: "border-box" },
  "@font-face": [
    {
      fontFamily: "IBM Plex Sans",
      fontStyle: "normal",
      fontWeight: " 100 900",
      src: "url(/fonts/ibm-plex-sans-var.woff2) format('woff2')",
    },
    {
      fontFamily: "IBM Plex Mono",
      fontStyle: "normal",
      fontWeight: " 100 900",
      src: "url(/fonts/IBMPlexMono-Text.woff2) format('woff2')",
    },
  ],
  html: {
    minWidth: "360px",
    scrollBehavior: "smooth",
  },
  body: {
    height: "100vh",
    display: "block",
    margin: "0 auto",
    fontFamily: "$untitled",
    background: "$background",
    color: "$primaryText",
    fontStyle: "normal",
    fontWeight: 400,
  },
});
