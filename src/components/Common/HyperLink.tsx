import { styled } from "../../../stitches.config";

export const HyperLink = styled("a", {
  color: "$link",
  whiteSpace: "pre-line",

  "&:hover": {
    color: "$coloredLink",
  },
});
