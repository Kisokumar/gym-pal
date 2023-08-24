import { format } from "date-fns";

type formatType = "short" | "medium" | "long";

export default function unixToDate(
  postgresTimestamp: number,
  formatType: formatType = "medium"
) {
  const unixTimestamp = postgresTimestamp / 1000;
  const date = new Date(unixTimestamp * 1000);

  let dateFormat;
  switch (formatType) {
    case "short":
      dateFormat = "MMMM yyyy";
      break;
    case "medium":
      dateFormat = "dd/MM/yy";
      break;
    case "long":
      dateFormat = "dd/MM/yyyy, HH:mm:ss";
      break;
    default:
      throw new Error("Invalid format type");
  }

  if (unixTimestamp) {
    return format(date, dateFormat);
  }

  return null;
}
