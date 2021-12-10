import { useTheme } from "next-themes";
import React, { Fragment } from "react";
import MoonIcon from "svgs/moon.svg";
import SunIcon from "svgs/sun.svg";
import { styled } from "../../../stitches.config";

const ThemeChanger: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Fragment>
      {theme === "dark" ? (
        <Icon onClick={() => setTheme("light")}>
          <SunIcon width={18} height={18} />
        </Icon>
      ) : (
        <Icon onClick={() => setTheme("dark")}>
          <MoonIcon width={18} height={18} />
        </Icon>
      )}
    </Fragment>
  );
};

const Icon = styled("button", {
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

export default ThemeChanger;
