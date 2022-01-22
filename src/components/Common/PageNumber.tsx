import { styled } from "../../../stitches.config";

export const PageNumber = styled("button", {
  padding: "8px 16px",
  fontSize: "$2",
  fontWeight: 500,
  fontFamily: "$untitled",
  border: `2px solid`,
  borderRadius: "4px",
  borderColor: "$coloredLink",
  cursor: "pointer",
  background: "none",
  transition: "0.2s",
  marginRight: "16px",
  color: "$primaryText",

  "@phone": {
    marginRight: "8px",
    marginBottom: "16px",
  },

  "&:hover": {
    background: "$coloredLink",
    color: "$background",
  },

  variants: {
    selected: {
      true: {
        background: "$coloredLink",
        color: "$background",
      },
    },
  },
});
