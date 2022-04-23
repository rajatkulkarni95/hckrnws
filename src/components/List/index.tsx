import { styled } from "../../../stitches.config";

export const PageBox = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: "48px",

  "@tablet": {
    marginTop: "24px",
  },

  "@phone": {
    marginTop: "16px",
  },
});

export const PaginationContainer = styled("div", {
  margin: "16px 0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "@phone": {
    flexWrap: "wrap",
  },
});
