import { styled } from "../../stitches.config";

export const VisitLink = styled("a", {
  padding: "4px",
  borderRadius: "3px",
  border: "none",
  background: "$secondaryText",
  color: "$primaryText",
  fontFamily: "$sans",
  fontSize: "$1",
  textDecoration: "none",
  fontWeight: 500,

  "&:hover": {
    filter: "brightness(110%)",
  },
});
