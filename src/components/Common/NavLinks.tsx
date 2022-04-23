import { AlignCenter } from "styles/";
import Link from "next/link";
import { useRouter } from "next/router";
import { styled } from "../../../stitches.config";

const StyledLink = styled("button", {
  borderRadius: "18px",
  color: "$secondaryText",
  background: "transparent",
  textDecoration: "none",
  fontSize: "14px",
  padding: "6px 12px",
  marginLeft: "8px",
  border: "none",
  fontFamily: "$sans",
  cursor: "pointer",
  "&:hover": {
    background: "$accent",
  },

  "@phone": {
    fontSize: "12px",
  },

  variants: {
    selected: {
      true: {
        background: "$primaryText",
        color: "$background",

        "&:hover": {
          background: "$primaryText",
        },
      },
    },
  },
});

const NavLinks = () => {
  const router = useRouter();
  const isTopSelected = router.pathname.includes("top");
  const isNewSelected = router.pathname.includes("new");
  const isShowSelected = router.pathname.includes("show");
  const isAskSelected = router.pathname.includes("ask");

  return (
    <AlignCenter
      css={{
        margin: "0 auto",
        padding: "8px",
        border: "1px solid $accent",
        borderRadius: "4px",
      }}
    >
      <Link href="/">
        <StyledLink selected={isTopSelected}>Top</StyledLink>
      </Link>
      <Link href="/new/1">
        <StyledLink selected={isNewSelected}>New</StyledLink>
      </Link>
      <Link href="/show/1">
        <StyledLink selected={isShowSelected}>Show</StyledLink>
      </Link>
      <Link href="/ask/1">
        <StyledLink selected={isAskSelected}>Ask</StyledLink>
      </Link>
    </AlignCenter>
  );
};

export default NavLinks;
