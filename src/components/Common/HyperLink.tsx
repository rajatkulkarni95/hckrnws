import { styled } from "../../../stitches.config";

export const HyperLink = styled("a", {
  color: "$link",

  "&:hover": {
    color: "$coloredLink",
  },
});
