import React, { type ReactNode, useState } from "react";
import {
  IconEdit,
  IconCircleCheck,
  IconTrash,
  IconCheck,
  IconSquareRoundedPlus,
  IconCirclePlus,
  IconInfoCircle,
} from "@tabler/icons";

type PropType = {
  tournamentData: any;
};

const Table = (props: PropType) => {
  const { tournamentData: data } = props;
  
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

  const handleRemove = (index: number) => {
    // TODO: make a delete call and repopulate table
  };

  return (
    <table className="w-full table-auto capitalize">
      <thead>
        <tr className="w-full">
          <th className="text-md px-5 font-black text-red md:text-xl">Name</th>
          <th className="text-md hidden px-5 font-black text-red md:table-cell md:text-xl">
            Location
          </th>
          <th className="text-md hidden px-5 font-black text-red md:table-cell md:text-xl">
            Date
          </th>
          <th className="text-md table-cell px-5 font-black text-red md:hidden md:text-xl">
            {/* Info */}
          </th>
          <th className="text-md px-5 font-black text-red md:text-xl">
            Format
          </th>
        </tr>
      </thead>

      <tbody>
        {data?.map((entry: any, index: number) => {
          return (
            <React.Fragment key={`tournamentTable${index}`}>
              <tr
                className="border-y border-light-gray text-dark-gray"
                key={`tournamentTable${index}`}
              >
                <td className="py-2 px-5 text-center text-sm font-medium text-dark-gray">
                  <div className="flex flex-row flex-nowrap items-center justify-center">
                    <span className="w-[20vh] px-2 py-4 text-center text-sm font-light text-dark-gray">
                      {entry.name}
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
                          {entry.name}
                        </h1>
                        <p className="px-4 py-1 text-lg text-white">
                          Location: {entry.location}
                        </p>
                        <p className="px-4 py-1 text-lg text-white">
                          {`Date: ${
                            month[entry.dates[0]?.getMonth()]
                          } ${entry.dates[0]?.getDate()}`}
                        </p>
                        <p className="px-4 py-1 text-lg text-white">
                          Time: {entry.type}
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
                  {entry.location}
                </td>
                <td className="hidden whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray md:table-cell">
                  {`${
                    month[entry.dates[0]?.getMonth()]
                  } ${entry.dates[0]?.getDate()}`}
                </td>
                <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
                  {entry.type}
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
