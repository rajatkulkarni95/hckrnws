import { styled } from "../../stitches.config";

export const Container = styled("div", {
  margin: "0 auto",
  width: "1000px",
  overflowX: "hidden",
  "@wide": {
    width: "1200px",
  },
  "@tablet": {
    width: "90%",
  },
  "@phone": {
    width: "100%",
    padding: "16px",
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

export const AlignCenter = styled("div", {
  display: "flex",
  alignItems: "center",
});

export const CenteredText = styled("p", {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  marginTop: "36px",
});
