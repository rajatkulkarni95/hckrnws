import { styled } from "../../../stitches.config";

export const Button = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "4px 16px",
  fontFamily: "$sans",
  fontWeight: 500,
  fontSize: "$2",
  border: "1px solid",
  borderColor: "none",
  borderRadius: "4px",
  background: "none",
  color: "$primaryText",
  width: "90px",
  cursor: "pointer",
  marginBottom: "8px",

  "&:hover": {
    borderColor: "$coloredLink",
    background: "$codeBlock",
  },
});

export const Icon = styled("button", {
  cursor: "pointer",
  padding: "4px",
  borderRadius: "4px",
  border: "none",
  background: "transparent",
  transition: "0.2s",

  "&:hover": {
    background: "$codeBlock",
  },
});

export const LinkButton = styled("button", {
  fontSize: "$0",
  color: "$secondaryText",
  border: "none",
  padding: "4px 8px",
  borderRadius: "18px",
  marginRight: "8px",
  cursor: "pointer",
  background: "transparent",
  "&:hover": {
    background: "$accent",
  },
});
