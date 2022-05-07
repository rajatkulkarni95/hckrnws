import { styled } from "../../../stitches.config";

const InnerHTMLText = styled("div", {
  fontSize: "$2",
  lineHeight: "24px",

  "@phone": {
    lineHeight: "1.75",
  },

  p: {
    marginBottom: "4px",
    whiteSpace: "break-spaces",
  },

  a: {
    color: "$coloredLink",
    whiteSpace: "break-spaces",
  },

  pre: {
    whiteSpace: "break-spaces",
    padding: "8px",
    background: "$codeBlock",
    borderRadius: "4px",
    margin: "8px 0",
    overflowX: "auto",
  },

  ".quotes": {
    padding: "8px 16px",
    borderLeft: "2px solid",
    color: "$secondaryText",
    marginBottom: "8px",
  },

  code: {
    fontFamily: "$mono",
    fontSize: "$1",
  },
});

export default InnerHTMLText;
