import { styled } from "../../../stitches.config";

const Button = styled("button", {
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

export default Button;
