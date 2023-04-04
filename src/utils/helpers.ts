import { Day } from "@prisma/client";

export const datesToString = (dates: Date[]) => {
  let str = "";
  dates.forEach((date: Date, index: number) => {
    if (date.getMonth() + 1 < 10) str += "0";
    str += `${date.getMonth() + 1}-${date.getDate()}`;
    if (index != dates.length - 1) str += ", ";
  });
  return str;
};

export const stringToDates = (dates: string) => {
  const split = dates.split(",");
  const datesArray: Date[] = [];
  for (let date of split) {
    date = date.trim();
    if (date.length !== 5 || stringToDate(date).toString() === "Invalid Date") {
      return [];
    }
    datesArray.push(stringToDate(date));
  }
  return datesArray;
};

export const stringToDate = (date: string) => {
  const dateRegExp = /(\d{2})\.(\d{2})/;
  const dateString: string = date.replace(dateRegExp, "$2-$1");
  return new Date(dateString);
};

export const isEmptyString = (str: string) => {
  return str.trim().length === 0 ? true : false;
};

export const daysToString = (days: Day[]) => {
  let str = "";
  days.forEach((day: Day, index: number) => {
    if (index != days.length - 1) {
      str += dayToString(day) + ", ";
    } else {
      str += dayToString(day);
    }
  });
  return str;
};

export const dayToString = (day: Day) => {
  let str = day.toString().toLowerCase();
  str.charAt(0).toUpperCase();
  return str;
};

export const stringToDay = (day: string) => {
  return day as Day;
};

export const stringToDays = (days: string) => {
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
    daysArray.push(stringToDay(day));
  }
  return daysArray;
};

export const dateToTimeString = (date: Date) => {
  let str = "";
  if (date.getHours() < 10) str += "0";
  str += date.getHours() + ":" + date.getMinutes();
  if (date.getMinutes() === 0) str += "0";
  return str;
};

export const stringToTimeAsDate = (time: string) => {
  const hour: number = +(time.charAt(0) + time.charAt(1));
  const minute: number = +(time.charAt(3) + time.charAt(4));

  if (time.length !== 5) return new Date("Invalid");
  if (hour > 12 || hour < 0 || minute > 59 || minute < 0)
    return new Date("Invalid");

  let date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  return date;
};
