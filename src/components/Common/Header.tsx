import Link from "next/link";
import { Fragment } from "react";
import { AlignCenter, SpaceBetween } from "styles/";
import { styled } from "../../../stitches.config";
import ThemeChanger from "./ThemeToggle";
import Question from "svgs/question.svg";
import { Icon } from "./Button";
import { useTheme } from "next-themes";

const Header: React.FC = () => {
  const { theme = "dark" } = useTheme();
  return (
    <Fragment>
      <SpaceBetween css={{ padding: "16px 0" }}>
        <Link href="/page/1" passHref>
          <Heading>hckrnws</Heading>
        </Link>
        <AlignCenter>
          <Icon css={{ marginRight: "16px" }}>
            <Link href="/why" passHref>
              <Question
                width={18}
                height={18}
                stroke={theme === "dark" ? "#FFFFFF" : "#232323"}
              />
            </Link>
          </Icon>
          <ThemeChanger />
        </AlignCenter>
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
