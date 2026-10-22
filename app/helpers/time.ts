import { fromUnixTime, formatDistanceToNowStrict } from "date-fns";

export const prettyTime = (time: number) => {
  const convertFromUnix = fromUnixTime(time);
  return formatTimeShorthand(formatDistanceToNowStrict(convertFromUnix));
};

export const isoTime = (time: number) => fromUnixTime(time).toISOString();

const formatTimeShorthand = (convertedString: string) => {
  const splitString = convertedString.split(" ");
  const time = splitString[0];
  const unit = splitString[1];
  return `${time}${unit.charAt(0)}`;
};
