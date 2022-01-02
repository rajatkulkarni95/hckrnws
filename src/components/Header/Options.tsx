import { AlignCenter } from "styles/";
import React from "react";

import Question from "svgs/question.svg";
import Star from "svgs/star.svg";

import Link from "next/link";
import { Icon } from "@components/Common/Button";
import ThemeToggler from "./ThemeToggle";

type Props = {
  theme?: string;
  handleThemeChange: (value: string) => void;
};

const Options: React.FC<Props> = ({ theme, handleThemeChange }: Props) => {
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
      <Icon css={{ marginRight: "16px" }}>
        <Link href="/stars" passHref>
          <Star
            width={18}
            height={18}
            stroke={theme === "dark" ? "#FFFFFF" : "#232323"}
          />
        </Link>
      </Icon>
      <ThemeToggler theme={theme} handleThemeChange={handleThemeChange} />
    </AlignCenter>
  );
};

export default Options;
