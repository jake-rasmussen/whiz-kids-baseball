import type { Day, Position } from "@prisma/client";

export const isEmptyString = (str: string) => {
  return str.trim().length === 0 ? true : false;
};

export const isWhitespace = (str: string) => {
  if (str.length === 0) return false;

  for (let i = 0; i < str.length; i++) {
    if (str[i] != " ") return false;
  }

  return true;
};

export const dateToStringRaw = (date: Date) => {
  let str = "";
  if (date.getMonth() + 1 < 10) str += "0";
  str += `${date.getMonth() + 1}-`;
  if (date.getDate() + 1 <= 10) str += "0";
  str += `${date.getDate()}`;

  return str;
};

export const datesToStringRaw = (dates: Date[]) => {
  let str = "";
  dates.forEach((date: Date, index: number) => {
    str += dateToStringRaw(date);
    if (index != dates.length - 1) str += ", ";
  });
  return str;
};

export const dateStringToDates = (dates: string) => {
  const split = dates.split(",");
  const datesArray: Date[] = [];
  for (let date of split) {
    date = date.trim();
    if (
      date.length !== 5 ||
      dateStringToDate(date).toString() === "Invalid Date"
    ) {
      return [];
    }
    datesArray.push(dateStringToDate(date));
  }
  return datesArray;
};

export const dateStringToDate = (date: string) => {
  if (date === "" || date.length != 5) return new Date("Invalid");

  const dateRegExp = /(\d{2})\.(\d{2})/;
  const dateString: string = date.replace(dateRegExp, "$2-$1");
  const returnDate = new Date(dateString);
  if (returnDate.toString() !== "Invalid Date")
    returnDate.setFullYear(new Date().getFullYear());
  return returnDate;
};

export const dayToStringFormatted = (day: Day) => {
  const str = day.toString().toLowerCase();
  str.charAt(0).toUpperCase();
  return str;
};

export const daysToStringFormatted = (days: Day[]) => {
  let str = "";
  days.forEach((day: Day, index: number) => {
    if (index != days.length - 1) {
      str += dayToStringFormatted(day) + ", ";
    } else {
      str += dayToStringFormatted(day);
    }
  });
  return str;
};

export const dayStringToDays = (days: string) => {
  const split = days.split(",");
  const daysArray: Day[] = [];
  for (let day of split) {
    day = day.trim();
    day = day.toUpperCase();
    if (
      day !== "MONDAY" &&
      day !== "TUESDAY" &&
      day !== "WEDNESDAY" &&
      day !== "THURSDAY" &&
      day !== "FRIDAY" &&
      day !== "SATURDAY" &&
      day !== "SUNDAY"
    )
      return [];
    daysArray.push(day as Day);
  }
  return daysArray;
};

export const dateToTimeStringRaw = (date: Date) => {
  let str = "";
  if (date.getHours() < 10 || (date.getHours() > 12 && date.getHours() < 22))
    str += "0";

  if (date.getHours() === 0) str += "12";
  else str += date.getHours() <= 12 ? date.getHours() : date.getHours() - 12;

  str += ":";

  if (date.getMinutes() < 10) str += "0";
  str += date.getMinutes();
  str += date.getHours() >= 12 ? "PM" : "AM";

  return str;
};

export const timeStringToTimeAsDate = (time: string) => {
  let hour: number = +(time.charAt(0) + time.charAt(1));
  const minute: number = +(time.charAt(3) + time.charAt(4));

  const meridiem: string = time.charAt(5) + time.charAt(6);

  if (time.length !== 7) return new Date("Invalid");
  if (hour > 12 || hour < 0 || minute > 59 || minute < 0)
    return new Date("Invalid");

  if (hour > 12 && meridiem === "AM") return new Date("Invalid");

  if (meridiem === "PM" && hour < 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;

  if (meridiem !== "AM" && meridiem !== "PM") return new Date("Invalid");

  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);

  return date;
};

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dateToStringFormatted = (date: Date) => {
  return `${month[date.getMonth()]} ${date.getDate()}`;
};

export const datesToStringFormatted = (dates: Date[]) => {
  let str = "";
  let monthBefore = -1;
  dates.forEach((date: Date, index: number) => {
    if (date.getMonth() != monthBefore) {
      str += dateToStringFormatted(date);
    } else {
      str += date.getDate();
    }

    if (index != dates.length - 1) {
      str += ", ";
    }
    monthBefore = date.getMonth();
  });
  return str;
};

export const dateToTimeStringFormatted = (date: Date) => {
  let str = "";

  str += date.getHours() <= 12 ? date.getHours() : date.getHours() - 12;
  str += ":";

  if (date.getMinutes() < 10) str += "0";
  str += date.getMinutes();
  str += date.getHours() >= 12 ? " PM" : " AM";

  return str;
};

const positionsMap = new Map<Position, string>([
  ["FIRST_BASE", "1B"],
  ["SECOND_BASE", "2B"],
  ["THIRD_BASE", "3B"],
  ["SHORTSTOP", "SS"],
  ["CATCHER", "C"],
  ["LEFT_FIELD", "LF"],
  ["CENTER_FIELD", "CF"],
  ["RIGHT_FIELD", "RF"],
  ["PITCHER", "P"],
]);

const acronymMap = new Map<string, Position>([
  ["1B", "FIRST_BASE"],
  ["2B", "SECOND_BASE"],
  ["3B", "THIRD_BASE"],
  ["SS", "SHORTSTOP"],
  ["C", "CATCHER"],
  ["LF", "LEFT_FIELD"],
  ["CF", "CENTER_FIELD"],
  ["RF", "RIGHT_FIELD"],
  ["P", "PITCHER"],
]);

export const positionToAcronym = (position: string) => {
  if (!positionsMap.has(position as Position)) return "";
  return positionsMap.get(position as Position);
};

export const acronymToPositions = (acronyms: string) => {
  const split = acronyms.split(",");
  const positionArray: Position[] = [];
  for (let acronym of split) {
    acronym = acronym.trim();
    acronym = acronym.toUpperCase();
    if (!acronymMap.has(acronym)) return [];
    positionArray.push(acronymMap.get(acronym) as Position);
  }
  return positionArray;
};

export const positionsToString = (positions: Position[]) => {
  let str = "";
  positions.forEach((position: Position, index: number) => {
    str +=
      index != positions.length - 1
        ? `${positionToAcronym(position)}, `
        : `${positionToAcronym(position)}`;
  });
  return str;
};
