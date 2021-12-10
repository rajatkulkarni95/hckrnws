import Link from "next/link";
import { Fragment } from "react";
import { SpaceBetween } from "styles/";
import { styled } from "../../../stitches.config";
import ThemeChanger from "./ThemeToggle";

const Header: React.FC = () => {
  return (
    <Fragment>
      <SpaceBetween css={{ padding: "16px 0" }}>
        <Link href="/page/1" passHref>
          <Heading>hckrnws</Heading>
        </Link>
        <ThemeChanger />
      </SpaceBetween>
    </Fragment>
  );
};

const Heading = styled("h1", {
  fontSize: "$7",
  margin: 0,
  padding: 0,
  fontWeight: 700,
  textDecoration: "none",
  cursor: "pointer",
  borderBottom: "2px solid",
  borderColor: "transparent",

  "&:hover": {
    borderColor: "$primaryText",
  },

  "@phone": {
    fontSize: "$4",
  },
});

export default Header;
