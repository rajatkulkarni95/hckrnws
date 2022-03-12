import { Container } from "styles/";
import { NextPage } from "next";
import { styled } from "../../stitches.config";

const Text = styled("p", {
  color: "$primaryText",
  margin: "16px 0",
});

const Section = styled("section", {
  display: "flex",
  flexDirection: "column",
});

const Hyperlink = styled("a", {
  textDecoration: "none",
  color: "$coloredLink",
  margin: "16px 0",
});

const About: NextPage = () => {
  const github = "https://github.com/rajatkulkarni95/hckrnws";
  const twitter = "https://twitter.com/JokingRajat";
  return (
    <Container>
      <Text>Hope you like this version of Hacker News!</Text>
      <Section>
        <Hyperlink href={github} target="_blank" rel="noopener noreferrer">
          Source Code
        </Hyperlink>
        <Text>
          Designed and Developed by{" "}
          <Hyperlink href={twitter} target="_blank" rel="noopener noreferrer">
            Rajat
          </Hyperlink>
        </Text>
      </Section>
    </Container>
  );
};

export default About;
