import { styled } from "@stitches/react";

export const Container = styled("div", {
  margin: "0 auto",
  variants: {
    width: {
      sm: { width: "100%" },
      md: { width: "90%" },
      lg: { width: "1000px" },
    },
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
