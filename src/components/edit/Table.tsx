import React, { type ReactNode, useState } from "react";
import { IconEdit, IconLetterX } from "@tabler/icons";

type PropType = {
  name: string;
  entries: any;
};

const Table = (props: PropType) => {
  const { name: string, entries } = props;
  const [edit, setEdit] = useState(-1);

  const categories: string[] = [];
  Object.keys(entries[0]).map((key) => {
    categories.push(key);
  });
  categories.push("Edit");

  const header: ReactNode = categories.map((key: string) => {
    return (
      <th className="bg-light-gray" key={`header${key}`}>
        {key}
      </th>
    );
  });

  const rows: ReactNode = entries.map((entry: any, rowIndex: number) => {
    return (
      <tr
        key={`row${rowIndex}`}
        className="transition duration-200 ease-in-out"
      >
        {Object.entries(entry).map((value: any, colIndex: number) => {
          return (
            <td
              className="hidden whitespace-nowrap bg-white py-2 text-center text-sm font-light text-dark-gray md:table-cell"
              key={`col${colIndex}`}
            >
              {edit !== -1 && edit === rowIndex ? (
                <input
                  type="text"
                  placeholder={value[1]}
                  className="input w-full max-w-xs bg-white text-center"
                />
              ) : (
                value[1]
              )}
            </td>
          );
        })}
        <td
          className="hidden whitespace-nowrap bg-white py-2 text-center text-sm font-light text-dark-gray md:table-cell"
          key="edit"
        >
          {edit === -1 ? (
            <button onClick={() => setEdit(rowIndex)}>
              <IconEdit />
            </button>
          ) : edit === rowIndex ? (
            <button onClick={() => setEdit(-1)}>
              <IconLetterX />
            </button>
          ) : (
            <IconEdit className="text-light-gray" />
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default Table;
