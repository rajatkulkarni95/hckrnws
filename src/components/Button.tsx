import { styled } from "../../stitches.config";

export const VisitLink = styled("a", {
  padding: "4px 8px",
  borderRadius: "3px",
  border: "1px solid",
  borderColor: "$secondaryText",
  color: "$secondaryText",
  fontFamily: "$sans",
  fontSize: "$1",
  textDecoration: "none",
  fontWeight: 500,

  "&:hover": {
    background: "$secondaryText",
    color: "$primaryText",
  },
});
