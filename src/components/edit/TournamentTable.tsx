import {
  IconCheck,
  IconCircleCheck,
  IconCirclePlus,
  IconEdit,
  IconInfoCircle,
  IconSquareRoundedPlus,
  IconTrash,
} from "@tabler/icons";
import React, { type ReactNode, useState } from "react";

type PropType = {
  name: string;
  entries: any;
};

const Table = (props: PropType) => {
  const { name, entries } = props;
  const [edit, setEdit] = useState(-1);

  const handleRemove = (index: number) => {
    // TODO: make a delete call and repopulate table
  };

  const handleEdit = (index: number) => {
    console.log(index);
    console.log("Test");
  }

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

  const rows: ReactNode = entries.map((tournament: any, index: number) => {
    return (
      <tr key={`row${index}`}>
        <td className="whitespace-nowrap py-6 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={tournament.name}
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
              text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={edit !== index}
          />
        </td>
        <td className="whitespace-nowrap py-6 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={tournament.location}
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
              text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={edit !== index}
          />
        </td>
        <td className="whitespace-nowrap py-6 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={tournament.time}
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
              text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={edit !== index}
          />
        </td>
        <td
          className="whitespace-nowrap text-center text-sm font-light text-dark-gray"
          key="edit"
        >
          {edit === -1 ? (
            <div>
              <button onClick={() => handleEdit(index)}>
                <IconEdit className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
              </button>
              <button onClick={() => handleRemove(index)}>
                <IconTrash className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
              </button>
            </div>
          ) : edit === index ? (
            <div>
              <button onClick={() => setEdit(-1)}>
                <IconCheck className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
              </button>
              <button>
                <IconTrash className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
              </button>
            </div>
          ) : (
            <div>
              <button>
                <IconEdit className="mx-1 text-light-gray" />
              </button>
              <button>
                <IconTrash className="mx-1 text-light-gray" />
              </button>
            </div>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="flex min-w-full flex-col items-center justify-center overflow-x-scroll px-[5%]">
      <table className="table min-w-full table-auto text-center transition duration-300 ease-in-out">
        <thead>
          <tr className="w-full">
            <th className="px-5 font-black text-red text-xl">
              Name
            </th>
            <th className="px-5 font-black text-red text-xl">
              Location
            </th>
            <th className="px-5 font-black text-red text-xl">
              Date
            </th>
            <th className="px-5 font-black text-red text-xl">
              Format
            </th>
            <th className="px-5 font-black text-red text-xl">
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="capitalize shadow-xl">
          {entries?.map((entry: any, index: number) => {
            return (
              <React.Fragment key={`practiceTable${index}`}>
                <tr
                  className="border-y border-light-gray text-dark-gray"
                  key={`practiceTable${index}`}
                >
                  <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
                    <input
                      type="text"
                      placeholder={entry.name}
                      className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
                        text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
                      disabled={edit !== index}
                    />
                  </td>
                  <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
                    <input
                      type="text"
                      placeholder={entry.location}
                      className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
                        text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
                      disabled={edit !== index}
                    />
                  </td>
                  <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
                    <input
                      type="text"
                      placeholder={`${
                        month[entry.dates[0]?.getMonth()]
                      } ${entry.dates[0]?.getDate()}`}
                      className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
                        text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
                      disabled={edit !== index}
                    />
                  </td>
                  <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
                    <input
                      type="text"
                      placeholder={entry.type}
                      className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
                        text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
                      disabled={edit !== index}
                    />
                  </td>
                  <td
                    className="whitespace-nowrap text-center text-sm font-light text-dark-gray"
                    key="edit"
                  >
                    {edit === -1 ? (
                      <div>
                        <button onClick={() => setEdit(index)}>
                          <IconEdit className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                        </button>
                        <button onClick={() => handleRemove(index)}>
                          <IconTrash className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                        </button>
                      </div>
                    ) : edit === index ? (
                      <div>
                        <button onClick={() => setEdit(-1)}>
                          <IconCheck className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                        </button>
                        <button>
                          <IconTrash className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button>
                          <IconEdit className="mx-1 text-light-gray" />
                        </button>
                        <button>
                          <IconTrash className="mx-1 text-light-gray" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
        <tfoot>
          <tr></tr>
        </tfoot>
      </table>
      <div className="flex w-full justify-end">
        <button
          className="min-w-8 min-h-8 mt-4 mr-4
            transition duration-300 ease-in-out hover:scale-150 hover:text-red"
        >
          <IconCirclePlus />
        </button>
      </div>
    </div>
  );
};

export default Table;