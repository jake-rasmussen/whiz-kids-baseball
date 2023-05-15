import { IconInfoCircle } from "@tabler/icons";
import React from "react";
import { datesToStringFormatted } from "../../utils/helpers";
import type { Tournament } from "@prisma/client";

type PropType = {
  tournaments: Tournament[];
};

const Table = (props: PropType) => {
  const { tournaments } = props;

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="w-full">
          <th className="text-md px-5 font-black text-red md:text-xl">Name</th>
          <th className="text-md hidden px-5 font-black text-red md:table-cell md:text-xl">
            Location
          </th>
          <th className="text-md hidden px-5 font-black text-red md:table-cell md:text-xl">
            Date<span className="font-bold">(</span>s
            <span className="font-bold">)</span>
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
        {tournaments.map((tournament: Tournament, index: number) => {
          return (
            <React.Fragment key={`tournamentTable${index}`}>
              <tr
                className="border-y border-light-gray capitalize text-dark-gray"
                key={`tournamentTable${index}`}
              >
                <td className="py-2 px-5 text-center text-sm font-medium text-dark-gray">
                  <div className="flex flex-row flex-nowrap items-center justify-center">
                    <span className="w-[20vh] px-2 py-4 text-center text-sm font-light text-dark-gray">
                      {tournament.name}
                    </span>
                    <button className="bg-transparent"></button>
                    <input
                      type="checkbox"
                      id={`modal${index}`}
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="modal-box relative gap-0 bg-dark-gray text-left">
                        <label
                          htmlFor={`modal${index}`}
                          className="btn-ghost btn-sm btn absolute right-2 top-2 text-white"
                        >
                          ✕
                        </label>
                        <h1 className="py-4 px-5 text-2xl font-black uppercase leading-tight tracking-wide text-red underline">
                          {tournament.name}
                        </h1>
                        <p className="px-4 py-1 text-lg text-white">
                          Location: {tournament.location}
                        </p>
                        <p className="px-4 py-1 text-lg text-white">
                          {`Date: ${datesToStringFormatted(tournament.dates)}`}
                        </p>
                        <p className="px-4 py-1 text-lg text-white">
                          Type: {tournament.type}
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
                  {tournament.location}
                </td>
                <td className="hidden whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray md:table-cell">
                  {`${datesToStringFormatted(tournament.dates)}`}
                </td>
                <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
                  {tournament.type}
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
