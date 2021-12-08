import { styled } from "../../../stitches.config";

export const HyperLink = styled("a", {
  color: "$link",
  overflowWrap: "break-word",

  "&:hover": {
    color: "$coloredLink",
  },
});
