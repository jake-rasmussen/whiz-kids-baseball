import type { Tournament } from "@prisma/client";
import {
  IconCheck,
  IconCirclePlus,
  IconEdit,
  IconTrash,
  IconX,
} from "@tabler/icons";
import React, { useState } from "react";
import { api } from "../../utils/api";
import Loading from "../Loading";

type PropType = {
  name: string;
  teamId: string;
  entries: any; //TODO: create an entries type
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

const Table = ({ teamId }: PropType) => {
  /**
   * COMMENTS:
   * Not sure why we use entries and tournaments, I think we can just use tournaments or entries, 
   * I figure it because tournaments can be modified and then we push the array of tournaments to entries into the db but that doesn't really make sense to me
   * 
   * The save button is repetitive because we already have a save button in the edit row, I think we can just have one save button
   * I got confused when I was using it and I made changes but the changes did not persist until after I clicked the save
   * 
   * 
   * I know that the type errors and eslint can be annoying but it seems like you are ignoring them sometimes by using ! or ? spend like 5 min to make sure they are right
   * 
   * Also I noticed when you are validating input you allow for a string like " " to be valid, I think we should not allow that, I fixed it on line 220-224 
   * but you may want to take a look at the lines below as I think the validation needs to happen there as well
   * 
   * I understand what you are doing with tempRow but I feel like we might be able to spend 5 min to try to figure a better alrenative 
   * 
   * 
   * I think a lot of the logic on this page can be significantly simplified if we just have a row component that takes in the id of the object it is modifying
   * 
   * Also the input validation and error modals can be componentized as well

  */
  const [tournaments, setTournaments] = useState<Tournament[]>([]); // List of tournaments, including those to be added
  const [editRow, setEditRow] = useState(-1); // The row index that is being modified, -1 if none
  const [deleteRow, setDeleteRow] = useState(-1); // The row index that is in contention to be deleted
  const [validInput, setValidInput] = useState(true); // Determines if the current input is in a valid state
  const [changes, setChanges] = useState<Change[]>([]); // Contains an array of the current changes
  const [tempRow] = useState({ name: "", location: "", dates: "", format: "" }); // Row that was just added

  const queryClient = api.useContext();

  const {
    data: entries,
    isLoading,
    isError,
  } = api.tournament.getTournamnetsByTeamId.useQuery(
    { teamId },
    {
      onSuccess(data) {
        setTournaments(data);
      },
    }
  );

  const updateTournament = api.tournament.updateTournamentDetails.useMutation({
    onSuccess() {
      queryClient.tournament.getTournamnetsByTeamId.invalidate({ teamId });
      console.log(teamId);
    },
  });
  const createTournament = api.tournament.createTournament.useMutation({
    onSuccess() {
      queryClient.tournament.getTournamnetsByTeamId.invalidate({ teamId });
      console.log(teamId);
    },
  });
  const deleteTournament = api.tournament.deleteTournament.useMutation({
    onSuccess() {
      queryClient.tournament.getTournamnetsByTeamId.invalidate({ teamId });
      console.log(teamId);
    },
  });

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    return <div>Error...</div>;
  }

  const addTemporaryRow = (index: number) => {
    if (editRow !== -1) return;

    let id = 0;
    if (tournaments.length !== 0) {
      id = (tournaments[tournaments.length - 1]?.id + 1) as unknown as number;
    }
    setTournaments([
      ...tournaments,
      {
        id: id.toString(),
        name: "Name",
        dates: "MM-DD",
        location: "Location",
        type: "Type",
      },
    ]);
    setEditRow(index);
  };

  const removeTemporaryRow = () => {
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
          dates: stringToDates(tempRow.dates),
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
              : stringToDates(tempRow.dates),
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
      const currChange = changes[index]!;
      if (currChange.index >= entries.length) {
        createTournament.mutate({
          name: currChange.name,
          dates: currChange.dates,
          location: currChange.location,
          type: currChange.type,
          teamId: teamId,
        });
      } else {
        updateTournament.mutate({
          name: currChange.name,
          dates: currChange.dates,
          location: currChange.location,
          type: currChange.type,
          id: currChange.id,
        });
      }
    }
  };

  const handleDelete = () => {
    deleteTournament.mutate({ id: tournaments[deleteRow].id });
  };

  const datesToString = (dates: Date[]) => {
    let str = "";
    dates.forEach((date: Date, index: number) => {
      if (date.getMonth() + 1 < 10) str += "0";
      str += `${date.getMonth() + 1}-${date.getDate()}`;
      if (index != dates.length - 1) str += ", ";
    });
    return str;
  };

  const stringToDates = (dates: string) => {
    const split = dates.split(",");
    const datesArray: Date[] = [];
    for (let date of split) {
      date = date.trim();
      if (
        date.length !== 5 ||
        stringToDate(date).toString() === "Invalid Date"
      ) {
        return [];
      }
      datesArray.push(stringToDate(date));
    }
    return datesArray;
  };

  const stringToDate = (date: string) => {
    const dateRegExp = /(\d{2})\.(\d{2})/;
    const dateString: string = date.replace(dateRegExp, "$2-$1");
    return new Date(dateString);
  };

  const checkValidInput = () => {
    if (editRow >= entries.length) {
      if (stringToDates(tempRow.dates).length === 0) return false;
      if (
        tempRow.name.trim().length === 0 ||
        tempRow.dates.trim().length === 0 ||
        tempRow.location.trim().length === 0 ||
        tempRow.format.trim().length === 0
      )
        return false;
    } else {
      if (tempRow.dates !== "" && tempRow.dates.length < 5) return false;
      if (tempRow.dates !== "" && stringToDates(tempRow.dates).length === 0)
        return false;
    }
    setValidInput(true);
    return true;
  };

  return (
    <div className="flex min-w-full flex-col items-center justify-center overflow-scroll px-[5%]">
      {/* Start of input error modal */}
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
      {/* End of input error modal */}

      {/* This is the modal for when things are being deleted */}
      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Confirm Delete</h3>
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
              Yes I&apos;m Sure
            </label>
          </div>
        </div>
      </div>
      {/* End of delete modal */}

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
          {tournaments.map((tournament: Tournament, index) => {
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
                        typeof tournament.dates === "string"
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
                        <button onClick={removeTemporaryRow}>
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
