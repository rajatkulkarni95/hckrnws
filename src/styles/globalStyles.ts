import { globalCss } from "@stitches/react";

export const globalStyles = globalCss({
  "*": { margin: 0, padding: 0, boxSizing: "border-box" },
  html: {
    minWidth: "360px",
    scrollBehavior: "smooth",
  },
  body: {
    height: "100vh",
    display: "block",
    margin: "0 auto",
    fontFamily: "$sans",
    background: "$background",
    color: "$primaryText",
    fontStyle: "normal",
    fontWeight: 400,
  },
});
