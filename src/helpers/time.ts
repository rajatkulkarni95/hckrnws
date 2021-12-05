import { fromUnixTime, formatDistanceToNowStrict } from "date-fns";

export const prettyTime = (time: number) => {
  const convertFromUnix = fromUnixTime(time);
  console.log("time", formatDistanceToNowStrict(convertFromUnix));

  return formatDistanceToNowStrict(convertFromUnix);
};
