import { prettyTime } from "helpers/time";
import { styled } from "../../../stitches.config";

type Props = {
  points: number;
  comments: number;
  time: number;
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
});

const Text = styled("p", {
  fontSize: "12px",
  marginLeft: "4px",
});

const Image = styled("img", {
  height: "14px",
  width: "14px",
});

const Meta: React.FC<Props> = ({ points, comments, time }) => {
  return (
    <Box>
      <Item>
        <Image src="./upvote.svg" alt="upvote" />
        <Text>{points}</Text>
      </Item>
      <Item>
        <Image src="./comment.svg" alt="comment" />
        <Text>{comments}</Text>
      </Item>
      <Item>
        <Image src="./clock.svg" alt="time" />
        <Text>{prettyTime(time)}</Text>
      </Item>
    </Box>
  );
};

export default Meta;
