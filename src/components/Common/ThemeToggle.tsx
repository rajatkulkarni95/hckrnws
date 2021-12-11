import { useTheme } from "next-themes";
import React, { Fragment } from "react";
import MoonIcon from "svgs/moon.svg";
import SunIcon from "svgs/sun.svg";
import { styled } from "../../../stitches.config";
import { Icon } from "./Button";

const ThemeChanger: React.FC = () => {
  const { theme = "dark", setTheme } = useTheme();

  return (
    <Fragment>
      {theme === "dark" ? (
        <Icon onClick={() => setTheme("light")}>
          <SunIcon width={18} height={18} stroke="#FFFFFF" />
        </Icon>
      ) : (
        <Icon onClick={() => setTheme("dark")}>
          <MoonIcon width={18} height={18} />
        </Icon>
      )}
    </Fragment>
  );
};

export default ThemeChanger;
