import { AlignCenter } from "styles/";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import MoonIcon from "svgs/moon.svg";
import SunIcon from "svgs/sun.svg";
import Question from "svgs/question.svg";
import { Icon } from "./Button";
import Link from "next/link";

const ThemeChanger: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
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
      {theme === "dark" ? (
        <Icon onClick={() => setTheme("light")}>
          <SunIcon width={18} height={18} stroke="#FFFFFF" />
        </Icon>
      ) : (
        <Icon onClick={() => setTheme("dark")}>
          <MoonIcon width={18} height={18} />
        </Icon>
      )}
    </AlignCenter>
  );
};

export default ThemeChanger;
