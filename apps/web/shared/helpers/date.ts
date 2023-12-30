import { dayjs, formatDate, getUnixTime } from "@techmely/utils/dayjs";
// timestamp is UTC
const ONE_MINUTE = 60;
const ONE_HOUR = 3600;
const ONE_DAY = 86400;
const ONE_MONTH = 2592000;

export const formatDateTimeRelative = (dateTime: string): string => {
  const timestamp = getUnixTime(dayjs(dateTime).toDate());
  if (timestamp < 0) {
    return "";
  }
  const now = getUnixTime(new Date());
  const diff = now - timestamp;
  if (diff < 0) {
    return "";
  }
  if (diff < ONE_MINUTE) {
    return "vừa xong";
  }
  if (diff < ONE_HOUR) {
    return `${Math.round(diff / ONE_MINUTE)} phút trước`;
  }
  if (diff < ONE_DAY) {
    return `${Math.round(diff / ONE_HOUR)} giờ trước`;
  }
  if (diff < ONE_MONTH) {
    return `${Math.round(diff / ONE_DAY)} ngày trước`;
  }
  return formatDate(dateTime);
};
