import { Button } from "@components/Common/Button";
import { FlexColumn } from "styles/";
import { NextPage } from "next";
import Link from "next/link";
import { styled } from "../../stitches.config";

const Heading = styled("h1", {
  fontSize: "$8",
  fontWeight: 700,
  color: "$primaryText",
  textAlign: "center",

  "@phone": {
    fontSize: "$6",
  },
});

const Subtitle = styled("p", {
  margin: "16px 0 24px 0",
  fontSize: "$4",
  fontWeight: 500,
  textAlign: "center",

  "@phone": {
    fontSize: "$3",
  },
});

const NotFound: NextPage = () => {
  return (
    <FlexColumn
      css={{
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
        marginTop: "48px",
      }}
    >
      <Heading>Not all those who wander are lost</Heading>
      <Subtitle>But you my good friend, are :)</Subtitle>
      <Link href="/" passHref>
        <Button
          css={{
            width: "120px",
            justifyContent: "center",
            margin: "0 auto",
            padding: "8px",
          }}
        >
          Go Home
        </Button>
      </Link>
    </FlexColumn>
  );
};

export default NotFound;
