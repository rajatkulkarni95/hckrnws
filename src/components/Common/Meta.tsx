import { prettyTime } from "helpers/time";
import Link from "next/link";
import { styled } from "../../../stitches.config";

type Props = {
  points: number;
  comments: number;
  time: number;
  id: number;
};

const Box = styled("div", {
  display: "flex",
  marginTop: "12px",
  alignItems: "center",
});

const Item = styled("div", {
  display: "flex",
  alignItems: "center",
  marginRight: "8px",
  padding: "4px",
});

const LinkItem = styled("div", {
  display: "flex",
  alignItems: "center",
  marginRight: "8px",
  padding: "4px",
  background: "none",
  cursor: "pointer",
  borderRadius: "3px",

  "&:hover": {
    background: "#4a4e69",
  },
});

const Text = styled("p", {
  fontSize: "12px",
  marginLeft: "4px",
});

const Image = styled("img", {
  height: "14px",
  width: "14px",
});

const Meta: React.FC<Props> = ({ points, comments, time, id }) => {
  return (
    <Box>
      <Item>
        <Image src="./upvote.svg" alt="upvote" />
        <Text>{points}</Text>
      </Item>
      <Link href={`/stories/${id}`}>
        <LinkItem>
          <Image src="./comment.svg" alt="comment" />
          <Text>{comments}</Text>
        </LinkItem>
      </Link>
      <Item>
        <Image src="./clock.svg" alt="time" />
        <Text>{prettyTime(time)}</Text>
      </Item>
    </Box>
  );
};

export default Meta;
