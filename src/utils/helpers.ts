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
