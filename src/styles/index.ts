import { styled } from "../../stitches.config";

export const Container = styled("div", {
  margin: "0 auto",
  width: "1200px",
  "@phone": {
    width: "100%",
    padding: "16px",
  },
  "@tablet": {
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
