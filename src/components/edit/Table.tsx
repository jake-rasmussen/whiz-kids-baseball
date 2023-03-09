import React, { type ReactNode, useState } from "react";
import { IconEdit, IconCircleCheck, IconTrash, IconCheck, IconSquareRoundedPlus, IconCirclePlus } from "@tabler/icons";

type PropType = {
  name: string;
  entries: any;
};

const Table = (props: PropType) => {
  const { name: string, entries } = props;
  const [edit, setEdit] = useState(-1);

  const handleRemove = (index: number) => {
    // TODO: make a delete call and repopulate table
  };

  const categories: string[] = [];
  Object.keys(entries[0]).map((key) => {
    categories.push(key);
  });
  categories.push("Edit");

  const header: ReactNode = categories.map((key: string) => {
    return (
      <th className="bg-light-gray text-center text-red" key={`header${key}`}>
        {key}
      </th>
    );
  });

  const rows: ReactNode = entries.map((entry: any, rowIndex: number) => {
    return (
      <tr key={`row${rowIndex}`}>
        {Object.entries(entry).map((value: any, colIndex: number) => {
          return (
            <td
              className="whitespace-nowrap py-6 text-center text-sm font-light text-dark-gray"
              key={`col${colIndex}`}
            >
              <input
                type="text"
                placeholder={value[1]}
                className="input input-sm w-full overflow-ellipsis bg-white text-center text-dark-gray
                  placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
                disabled={edit !== rowIndex}
              />
            </td>
          );
        })}
        <td
          className="whitespace-nowrap text-center text-sm font-light text-dark-gray"
          key="edit"
        >
          {edit === -1 ? (
            <div>
              <button onClick={() => setEdit(rowIndex)}>
                <IconEdit className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
              </button>
              <button onClick={() => handleRemove(rowIndex)}>
                <IconTrash className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
              </button>
            </div>
          ) : edit === rowIndex ? (
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
      <table className="table min-w-full table-auto transition duration-300 ease-in-out">
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody className="shadow-xl">{rows}</tbody>
        <tfoot>
          <tr>{header}</tr>
        </tfoot>
      </table>
      <div className="w-full flex justify-end">
        <button  className="mt-4 mr-4 min-w-8 min-h-8
            transition duration-300 ease-in-out hover:scale-150 hover:text-red">
          <IconCirclePlus />
        </button>
      </div>
    </div>
  );
};

export default Table;
