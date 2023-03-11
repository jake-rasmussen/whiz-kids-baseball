import { IconInfoCircle } from "@tabler/icons";
import React from "react";

type PropType = {
  practiceData: any;
};

const Table = (props: PropType) => {
  const { practiceData: data } = props;

  const handleRemove = (index: number) => {
    // TODO: make a delete call and repopulate table
  };

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
        {data?.map((entry: any, index: number) => {
          return (
            <React.Fragment key={`practiceTable${index}`}>
              <tr
                className="border-y border-light-gray text-dark-gray"
                key={`practiceTable${index}`}
              >
                <td className="py-2 px-5 text-center text-sm font-medium text-dark-gray">
                  <div className="flex flex-row flex-nowrap items-center justify-center">
                    <span className="w-[20vh] px-2 py-4 text-center text-sm font-light text-dark-gray">
                      {entry.location}
                    </span>
                    <button className="bg-transparent"></button>
                    <input
                      type="checkbox"
                      id="modal"
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="modal-box relative gap-0 bg-dark-gray text-left">
                        <label
                          htmlFor="modal"
                          className="btn-ghost btn-sm btn absolute right-2 top-2 text-white"
                        >
                          ✕
                        </label>
                        <h1 className="py-4 px-5 font-black uppercase leading-tight tracking-wide text-red">
                          {entry.location}
                        </h1>
                        <p className="px-4 py-1 text-lg text-white">
                          Days:{" "}
                          {entry.days.map((day: string, index: number) => (
                            <React.Fragment key={`day0${index}`}>
                              {index != entry.days.length - 1
                                ? `${day.toLowerCase()}, `
                                : `${day.toLowerCase()}`}
                            </React.Fragment>
                          ))}
                        </p>
                        <p className="px-4 py-1 text-lg text-white">
                          Time: {entry.startTime.getHours() % 12}:
                          {entry.startTime.getMinutes()}
                          {entry.startTime.getHours() > 12 ? "AM" : "PM"}
                          <span className="lowercase"> to </span>
                          {entry.endTime.getHours() % 12}:
                          {entry.endTime.getMinutes()}
                          {entry.endTime.getHours() > 12 ? "AM" : "PM"}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="table-cell whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray md:hidden">
                  <label htmlFor="modal">
                    <IconInfoCircle className="mx-2 text-dark-gray transition duration-300 ease-in-out hover:text-red md:hidden" />
                  </label>
                </td>

                <td className="hidden whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray md:table-cell">
                  {entry.days.map((day: string, index: number) => (
                    <React.Fragment key={`day1${index}`}>
                      {index != entry.days.length - 1
                        ? `${day.toLowerCase()}, `
                        : `${day.toLowerCase()}`}
                    </React.Fragment>
                  ))}
                </td>
                <td className="hidden whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray md:table-cell">
                  {entry.startTime.getHours() % 12}:
                  {entry.startTime.getMinutes()}
                  {entry.startTime.getHours() > 12 ? "AM" : "PM"}
                  <span className="lowercase"> to </span>
                  {entry.endTime.getHours() % 12}:{entry.endTime.getMinutes()}
                  {entry.endTime.getHours() > 12 ? "AM" : "PM"}
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
