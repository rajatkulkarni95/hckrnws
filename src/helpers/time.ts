import { fromUnixTime, formatDistanceToNowStrict } from "date-fns";

export const prettyTime = (time: number) => {
  const convertFromUnix = fromUnixTime(time);
  return formatDistanceToNowStrict(convertFromUnix);
};
