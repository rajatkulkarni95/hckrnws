import { Fragment } from "react";
import { SpaceBetween } from "styles/";
import { styled } from "../../../stitches.config";

const Header: React.FC = () => {
  return (
    <Fragment>
      <SpaceBetween css={{ padding: "16px 0", "@phone": { padding: "16px" } }}>
        <Heading>hckrnws</Heading>
        <p>About</p>
      </SpaceBetween>
    </Fragment>
  );
};

const Heading = styled("h1", {
  fontSize: "$7",
  margin: 0,
  padding: 0,
  fontWeight: 700,

  "@phone": {
    fontSize: "$4",
  },
});

export default Header;
