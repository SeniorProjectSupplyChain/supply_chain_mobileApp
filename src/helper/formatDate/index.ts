import moment from "moment";

interface TimeInfo {
  date: string;
  time: string;
}

export function convertTimeString(timeString: string): TimeInfo {
  // console.log(timeString);

  const date = new Date(timeString);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);

  // const outputString = `${day}-${month}, ${hour}:${minute}`;

  return { date: `${day}/${month}`, time: `${hour}:${minute}` };
}

export function convertToUTC(timestamp?: string): string {
  if (!timestamp) return "";
  // Split the timestamp into date and time components
  const [datePart, timePart] = timestamp?.split(" ");

  // Remove the trailing "UTC" from the time component
  const timeWithoutUTC = timePart.replace(" UTC", "");

  // Create the UTC format string
  const utcFormat = `${datePart} ${timeWithoutUTC}+00:00`;

  return utcFormat;
}
