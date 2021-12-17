import { FlexColumn } from "styles/";
import { NextPage } from "next";
import { styled } from "../../stitches.config";
import { HyperLink } from "@components/Common/HyperLink";
import Comment from "@components/Comments/Comment";
import { exampleComment } from "data/exampleData";

const Title = styled("h2", {
  margin: "16px 0",
  fontSize: "$4",
  color: "$primaryText",
});

const Text = styled("p", {
  fontSize: "$2",
  lineHeight: "1.65rem",
  margin: "8px 0",
});

const Points = styled("span", {
  fontSize: "$2",
  lineHeight: "1.65rem",
  borderBottom: "2px solid",

  variants: {
    color: {
      0: {
        color: "$level2",
      },
      1: {
        color: "$level3",
      },
      2: {
        color: "$level4",
      },
      3: {
        color: "$level5",
      },
      4: {
        color: "$level6",
      },
      5: {
        color: "$level7",
      },
    },
  },
});

const Box = styled("div", {
  padding: "16px",
  background: "$hovered",
  borderRadius: "4px",
  margin: "8px 0",
});

const QuotedText = styled("p", {
  padding: "8px 16px",
  borderLeft: "2px solid",
  color: "$secondaryText",
  marginBottom: "8px",
});

const Why: NextPage = () => {
  return (
    <FlexColumn>
      <Title>Why hckrnws?</Title>
      <Text>
        Why make this when there&apos;s a perfectly well &nbsp;
        <HyperLink href="https://news.ycombinator.com">
          Hacker News
        </HyperLink>{" "}
        already?
      </Text>
      <Text css={{ fontStyle: "italic" }}>
        Well cause it isn&apos;t perfect, atleast for me! :)
      </Text>
      <Text>
        As someone who frequents the news site, more so as a spectator rather
        than a contributor, I&apos;ve felt it cut short in places that I&apos;ve
        been spoilt into taking for granted by a few other apps. While I
        don&apos;t like the reddit UI a lot with the redesign, apps like &nbsp;
        <HyperLink href="https://apps.apple.com/us/app/apollo-for-reddit/id979274575">
          Apollo
        </HyperLink>{" "}
        &nbsp; and &nbsp;
        <HyperLink href="https://play.google.com/store/apps/details?id=com.laurencedawson.reddit_sync">
          Sync
        </HyperLink>{" "}
        &nbsp; have made it a joy to browse/read through.
      </Text>
      <Text>
        So I&apos;ve tried to implement some sort of balance to this one which
        makes it a significantly better experience for me (
        <i>and hopefully others</i>) to read.
      </Text>
      <Text>
        Some changes that <strong>hckrnws</strong> makes in an attempt to
        improve the experience are:
        <ul style={{ listStyleType: "none" }}>
          <li>
            <Text>
              <Points color={1}>Dark Mode</Points> - Someone who tends to read
              in the night, I&apos;m annoyed at the fact that hacker news is a
              bright light shining out of my screen. Sure there&apos;s
              extensions and other stuff that try to help the cause, but if
              I&apos;m going to make the app, might as well ship with native
              dark mode. Fear not, a light version also exists!
            </Text>
          </li>
          <li>
            <Text>
              <Points color={2}>Compact Reading</Points> - Reduced width of the
              readable area to 1200px since on larger screens, reading comments
              is a pain. Also increased font sizes and went with a font (
              <i>IBM Plex Sans</i>) that is easy on the eye.
            </Text>
          </li>
          <li>
            <Text>
              <Points color={3}>Highlighted Comment Threads</Points> - Comments
              are easily identifiable as who is who&apos;s child in long
              threads, with a Apollo/Sync style vertical collapsable line. Also,
              an easier way to identify the OP in the comments. (colored and has
              a badge beside them).
            </Text>
            <Box>
              <Comment comment={exampleComment} op="uudecoded" />
            </Box>
          </li>
          <li>
            <Text>
              <Points color={4}>Quotes</Points> - Identifiable quotes for
              finding referenced text easily <i>(text that begins with &gt;)</i>
            </Text>
            <Box>
              <QuotedText> &gt; This is a quote</QuotedText>
            </Box>
          </li>
          <li>
            <Text>
              <Points color={5}>Read Later</Points> - A Read Later section for
              saving stories for easier access once the day ends. (
              <i>in the works</i>)
            </Text>
          </li>
        </ul>
      </Text>
      <Text>
        This is far from perfect, and it&apos;ll never be, but it&apos;s &nbsp;
        <HyperLink href="https://github.com/rajatkulkarni95/hckrnws">
          open source
        </HyperLink>
        &nbsp; for people who want to look at the code
        (read/fork/contribute/take) (its a NextJS/Typescript app with Stitches
        for styling), backed by the hnPWA api.
      </Text>

      <Text>
        Over time I&apos;d be adding a couple of features as my usage goes such
        as the ability to change to Mono/Serif fonts, increasing font sizes, and
        other sections like Show HN.
      </Text>

      <Text>
        If this seems like something you may use from time to time, and would
        like to see a feature or two incorporated, you can either &nbsp;
        <HyperLink href="https://twitter.com/JokingRajat">tweet</HyperLink> at
        me/create a ticket on the github repo.
      </Text>
      <Text css={{ fontStyle: "italic" }}>
        Disclaimer: hckrnws.com is not affiliated to YCombinator or to
        news.ycombinator.com
      </Text>
      <Text>
        &nbsp; - Designed and Developed by &nbsp;
        <HyperLink href="https://twitter.com/JokingRajat">Rajat</HyperLink>
      </Text>
    </FlexColumn>
  );
};

export default Why;
