import { styled } from "@stitches/react";

export const Container = styled("div", {
  margin: "0 auto",
  width: "1000px",
  "@bp1": {
    width: "90%",
  },
});

export const SpaceBetween = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const FlexColumn = styled("div", {
  display: "flex",
  flexDirection: "column",
});
