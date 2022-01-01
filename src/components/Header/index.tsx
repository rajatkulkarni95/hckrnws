import { Fragment, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { styled } from "../../../stitches.config";

import { SpaceBetween } from "styles/";
import Options from "./Options";

const Header: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleThemeChange = (value: string) => setTheme(value);

  return (
    <Fragment>
      <SpaceBetween css={{ padding: "16px 0" }}>
        <Link href="/page/1" passHref>
          <Heading>hckrnws</Heading>
        </Link>
        <Options theme={theme} handleThemeChange={handleThemeChange} />
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
