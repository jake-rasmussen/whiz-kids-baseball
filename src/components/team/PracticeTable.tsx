import type { Practice } from "@prisma/client";
import { IconInfoCircle } from "@tabler/icons";
import React from "react";
import { dateToTimeStringFormatted, dateToTimeStringRaw } from "../../utils/helpers";

type PropType = {
  practices: Practice[];
};

const Table = ({ practices }: PropType) => {
  return (
    <table className="w-full table-auto capitalize">
      <thead>
        <tr className="w-full">
          <th className="text-md px-5 font-black text-red md:text-xl">
            Location
          </th>
          <th className="text-md hidden px-5 font-black text-red md:table-cell md:text-xl">
            Weekday
          </th>
          <th className="text-md hidden px-5 font-black text-red md:table-cell md:text-xl">
            Time
          </th>
          <th className="text-md table-cell px-5 font-black text-red md:hidden md:text-xl">
            {/* Info */}
          </th>
        </tr>
      </thead>

      <tbody>
        {practices.map((practice: Practice, index: number) => {
          return (
            <React.Fragment key={`practiceTable${index}`}>
              <tr
                className="border-y border-light-gray text-dark-gray"
                key={`practiceTable${index}`}
              >
                <td className="py-2 px-5 text-center text-sm font-medium text-dark-gray">
                  <div className="flex flex-row flex-nowrap items-center justify-center">
                    <span className="w-[20vh] px-2 py-4 text-center text-sm font-light text-dark-gray">
                      {practice.location}
                    </span>
                    <button className="bg-transparent"></button>
                    <input
                      type="checkbox"
                      id={`modal${index}`}
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="modal-box relative gap-0 bg-dark-gray py-14 text-left">
                        <label
                          htmlFor={`modal${index}`}
                          className="btn-ghost btn-sm btn absolute right-2 top-2 text-white"
                        >
                          ✕
                        </label>
                        <h1 className="py-4 pl-4 text-2xl font-black uppercase leading-tight tracking-wide text-red underline">
                          {practice.location}
                        </h1>
                        <p className="px-4 py-1 text-lg text-white">
                          Days:{" "}
                          {practice.days.map((day: string, index: number) => (
                            <React.Fragment key={`day0${index}`}>
                              {index != practice.days.length - 1
                                ? `${day.toLowerCase()}, `
                                : `${day.toLowerCase()}`}
                            </React.Fragment>
                          ))}
                        </p>
                        <p className="px-4 py-1 text-lg text-white">
                          Time: {dateToTimeStringRaw(practice.startTime)}
                          <span className="lowercase"> to </span>
                          {dateToTimeStringRaw(practice.endTime)}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="table-cell whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray md:hidden">
                  <label htmlFor={`modal${index}`}>
                    <IconInfoCircle className="mx-2 text-dark-gray transition duration-300 ease-in-out hover:cursor-pointer hover:text-red md:hidden" />
                  </label>
                </td>

                <td className="hidden whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray md:table-cell">
                  {practice.days.map((day: string, index: number) => (
                    <React.Fragment key={`day1${index}`}>
                      {index != practice.days.length - 1
                        ? `${day.toLowerCase()}, `
                        : `${day.toLowerCase()}`}
                    </React.Fragment>
                  ))}
                </td>
                <td className="hidden whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray md:table-cell">
                  {dateToTimeStringFormatted(practice.startTime)}
                  <span className="lowercase"> to </span>
                  {dateToTimeStringFormatted(practice.endTime)}
                </td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
