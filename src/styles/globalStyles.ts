import { globalCss } from "@stitches/react";

export const globalStyles = globalCss({
  "*": { margin: 0, padding: 0 },
  body: {
    height: "100vh",
    display: "block",
    margin: "0 auto",
    fontFamily: "$sans",
    background: "$background",
    color: "$primaryText",
    fontWeight: 400,
  },
});
