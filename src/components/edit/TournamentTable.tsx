import {
  IconCheck,
  IconCirclePlus,
  IconEdit,
  IconTrash,
  IconX,
} from "@tabler/icons";
import Router from "next/router";
import React, { useState } from "react";
import { api } from "../../utils/api";

type PropType = {
  name: string;
  teamId: string;
  entries: any;
};

interface Change {
  index: number;
  name: string;
  dates: Date[];
  location: string;
  type: string;
  id?: string;
  teamId?: string;
}

const Table = (props: PropType) => {
  const { teamId, entries } = props;

  const [tournaments, setTournaments] = useState(entries); // List of tournaments, including those to be added
  const [editRow, setEditRow] = useState(-1); // The row index that is being modified, -1 if none
  const [deleteRow, setDeleteRow] = useState(-1); // The row index that is in contention to be deleted
  const [validInput, setValidInput] = useState(true); // Determines if the current input is in a valid state
  const [changes, setChanges] = useState<Change[]>([]); // Contains an array of the current changes
  const [tempRow] = useState({ name: "", location: "", dates: "", format: "" }); // Row that was just added

  // const queryClient = api.useContext();

  const updateTournament = api.tournament.updateTournamentDetails.useMutation(
    {}
  );
  const createTournament = api.tournament.createTournament.useMutation({});
  const deleteTournament = api.tournament.deleteTournament.useMutation({});

  const addTemporaryRow = (index: number) => {
    let id = 0;
    if (tournaments.length !== 0) {
      id = tournaments[tournaments.length - 1].id + 1;
    }
    setTournaments([
      ...tournaments,
      {
        id: id,
        name: "Name",
        dates: "MM-DD",
        location: "Location",
        type: "Type",
      },
    ]);
    setEditRow(index);
  };

  const removeTemporaryRow = (index: number) => {
    tournaments.pop();
    setEditRow(-1);
  };

  const handleChanges = (index: number) => {
    if (!checkValidInput()) {
      setValidInput(false);
      return;
    }

    if (index >= entries.length) {
      setChanges([
        ...changes,
        {
          index: index,
          name: tempRow.name,
          dates: stringToDate(tempRow.dates),
          location: tempRow.location,
          type: tempRow.format,
          teamId: teamId,
        },
      ]);
    } else {
      setChanges([
        ...changes,
        {
          index: index,
          name: tempRow.name === "" ? tournaments[index].name : tempRow.name,
          dates:
            tempRow.dates === ""
              ? tournaments[index].dates
              : stringToDate(tempRow.dates),
          location:
            tempRow.location === ""
              ? tournaments[index].location
              : tempRow.location,
          type:
            tempRow.format === "" ? tournaments[index].format : tempRow.format,
          id: tournaments[index].id,
        },
      ]);
    }
    setEditRow(-1);
  };

  const handleSave = () => {
    for (const index in changes) {
      const curChange = changes[index]!;
      if (curChange.index >= entries.length) {
        createTournament.mutate({
          name: curChange.name,
          dates: curChange.dates,
          location: curChange.location,
          type: curChange.type,
          teamId: teamId,
        });
      } else {
        updateTournament.mutate({
          name: curChange.name,
          dates: curChange.dates,
          location: curChange.location,
          type: curChange.type,
          id: curChange.id!,
        });
      }
    }
    Router.reload();
  };

  const handleDelete = () => {
    deleteTournament.mutate({ id: tournaments[deleteRow].id });
    Router.reload();
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

  const datesToString = (dates: Date[]) => {
    let str = "";
    dates.forEach((date: Date, index: number) => {
      if (date.getMonth() + 1 < 10) str += "0";
      str += `${date.getMonth() + 1}-${date.getDate()}`;
      if (index != dates.length - 1) str += ", ";
    });
    return str;
  };

  const stringToDate = (dates: string) => {
    const dateRegExp = /(\d{2})\.(\d{2})/;
    const dateString: string = dates.replace(dateRegExp, "$2-$1");
    return [new Date(dateString)];
  };

  const checkValidInput = () => {
    if (editRow >= entries.length) {
      if (
        tempRow.dates.length < 5 ||
        stringToDate(tempRow.dates)[0]?.toString() === "Invalid Date"
      )
        return false;
      if (
        tempRow.name === "" ||
        tempRow.dates === "" ||
        tempRow.location === "" ||
        tempRow.format === ""
      )
        return false;
    } else {
      if (tempRow.dates !== "" && tempRow.dates.length < 5) return false;
      if (
        tempRow.dates !== "" &&
        stringToDate(tempRow.dates)[0]?.toString() === "Invalid Date"
      )
        return false;
    }

    setValidInput(true);
    return true;
  };

  return (
    <div className="flex min-w-full flex-col items-center justify-center overflow-x-scroll px-[5%]">
      <input type="checkbox" id="error-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Invalid Input</h3>
          <p className="py-4">
            Please make sure that all fields of the new row have been filled
            out, that the date field is formatted properly, and that a valid
            date has been provided
          </p>
          <div className="modal-action">
            <label htmlFor="error-modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>

      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Invalid Input</h3>
          <p className="py-4">Are you sure you want to delete this row?</p>
          <div className="modal-action">
            <label htmlFor="delete-modal" className="btn-outline btn-error btn">
              Cancel
            </label>
            <label
              htmlFor="delete-modal"
              className="btn"
              onClick={handleDelete}
            >
              Yes I'm Sure
            </label>
          </div>
        </div>
      </div>
      <table className="table min-w-full table-auto text-center transition duration-300 ease-in-out">
        <thead>
          <tr className="w-full">
            <th className="px-5 text-xl font-black text-red">Name</th>
            <th className="px-5 text-xl font-black text-red">Location</th>
            <th className="px-5 text-xl font-black text-red">Date</th>
            <th className="px-5 text-xl font-black text-red">Format</th>
            <th className="px-5 text-xl font-black text-red">Edit</th>
          </tr>
        </thead>
        <tbody className="capitalize shadow-xl">
          {tournaments?.map((tournament: any, index: number) => {
            return (
              <React.Fragment key={`practiceTable${index}`}>
                <tr
                  className="border-y border-light-gray text-dark-gray"
                  key={`practiceTable${index}`}
                >
                  <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
                    <input
                      type="text"
                      placeholder={tournament.name}
                      className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
                        text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
                      disabled={editRow !== index}
                      onChange={(e) => {
                        tempRow.name = e.currentTarget.value;
                      }}
                    />
                  </td>
                  <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
                    <input
                      type="text"
                      placeholder={tournament.location}
                      className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
                        text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
                      disabled={editRow !== index}
                      onChange={(e) => {
                        tempRow.location = e.currentTarget.value;
                      }}
                    />
                  </td>
                  <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
                    <input
                      type="text"
                      placeholder={
                        typeof tournament.dates == typeof ""
                          ? tournament.dates
                          : datesToString(tournament.dates)
                      }
                      className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
                        text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
                      disabled={editRow !== index}
                      onChange={(e) => {
                        tempRow.dates = e.currentTarget.value;
                      }}
                    />
                  </td>
                  <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
                    <input
                      type="text"
                      placeholder={tournament.type}
                      className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
                        text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
                      disabled={editRow !== index}
                      onChange={(e) => {
                        tempRow.format = e.currentTarget.value;
                      }}
                    />
                  </td>
                  <td
                    className="whitespace-nowrap text-center text-sm font-light text-dark-gray"
                    key="edit"
                  >
                    {editRow === -1 ? (
                      <div>
                        <button onClick={() => setEditRow(index)}>
                          <IconEdit className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                        </button>
                        <button>
                          <label
                            htmlFor="delete-modal"
                            onClick={() => setDeleteRow(index)}
                          >
                            <IconTrash className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                          </label>
                        </button>
                      </div>
                    ) : editRow === index ? (
                      <div>
                        <button onClick={() => handleChanges(index)}>
                          <label htmlFor={validInput ? "" : "error-modal"}>
                            <IconCheck className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                          </label>
                        </button>
                        <button
                          onClick={() => removeTemporaryRow(tournaments.length)}
                        >
                          <IconX className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
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
          onClick={() => addTemporaryRow(tournaments.length)}
        >
          <IconCirclePlus />
        </button>
      </div>
      <button
        className="btn-outline btn-error btn flex flex-shrink"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default Table;
