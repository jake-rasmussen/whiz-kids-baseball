import { Tournament } from "@prisma/client";
import { IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons";
import React, { useState } from "react";
import { api } from "../../../utils/api";
import {
  stringToDates,
  datesToString,
  isEmptyString,
} from "../../../utils/helpers";

type PropType = {
  index: number;
  tournamentId: string;
  teamId: string;
  tournament: Tournament;
  editRowIndex: boolean;
  setEditRowIndex: React.Dispatch<React.SetStateAction<number>>;
  newRowCreated: boolean;
  setNewRowCreated: React.Dispatch<React.SetStateAction<boolean>>;
  wait: boolean;
  setWait: React.Dispatch<React.SetStateAction<boolean>>;
  removeTemporaryRow: () => void;
  setDeleteRow: React.Dispatch<React.SetStateAction<number>>;
};

const TournamentRow = (props: PropType) => {
  const {
    index,
    teamId,
    tournamentId,
    tournament,
    editRowIndex,
    setEditRowIndex,
    newRowCreated,
    setNewRowCreated,
    wait,
    setWait,
    removeTemporaryRow,
    setDeleteRow,
  } = props;

  const [rowEdits, setRowEdits] = useState({
    name: "",
    location: "",
    dates: "",
    format: "",
  });
  const [validInput, setValidInput] = useState(true);

  const queryClient = api.useContext();

  const onSuccessFunction = () => {
    setRowEdits({
      name: "",
      location: "",
      dates: "",
      format: "",
    });
    setEditRowIndex(-1);
    setWait(false);
  };

  const updateTournament = api.tournament.updateTournamentDetails.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      onSuccessFunction();
      queryClient.tournament.getTournamnetsByTeamId.invalidate({ teamId });
    },
  });

  const createTournament = api.tournament.createTournament.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      onSuccessFunction();
      setNewRowCreated(false);
      // queryClient.tournament.getTournamnetsByTeamId.invalidate({ teamId });
    },
  });

  const handleSaveTournament = () => {
    if (!checkValidInput()) {
      setValidInput(false);
      return;
    }
    setEditRowIndex(-1);

    if (
      Object.entries(rowEdits).toString() ===
      Object.entries({
        name: "",
        location: "",
        dates: "",
        format: "",
      }).toString()
    )
      return;

    if (wait) return;

    if (newRowCreated) {
      createTournament.mutate({
        name: rowEdits.name,
        dates: stringToDates(rowEdits.dates),
        location: rowEdits.location,
        type: rowEdits.format,
        teamId: teamId,
      });
    } else {
      updateTournament.mutate({
        name: isEmptyString(rowEdits.name) ? tournament.name : rowEdits.name,
        dates: isEmptyString(rowEdits.dates)
          ? tournament.dates
          : stringToDates(rowEdits.dates),
        location: isEmptyString(rowEdits.location)
          ? tournament.location
          : rowEdits.location,
        type: isEmptyString(rowEdits.format)
          ? tournament.type
          : rowEdits.format,
        id: tournamentId,
      });
    }
  };

  const checkValidInput = () => {
    if (newRowCreated) {
      if (stringToDates(rowEdits.dates).length === 0) return false;
      if (
        isEmptyString(rowEdits.name) ||
        isEmptyString(rowEdits.dates) ||
        isEmptyString(rowEdits.location) ||
        isEmptyString(rowEdits.format)
      )
        return false;
    } else {
      if (
        !isEmptyString(rowEdits.dates) &&
        (rowEdits.dates.length < 5 ||
          stringToDates(rowEdits.dates).length === 0)
      )
        return false;
    }
    if (!isEmptyString(rowEdits.dates) && rowEdits.dates.at(2) != "-")
      return false;

    setValidInput(true);
    return true;
  };

  return (
    <React.Fragment key={`tournamentRow${index}`}>
      <tr
        className="border-y border-light-gray text-dark-gray shadow-xl"
        key={`practiceTable${index}`}
      >
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={tournament.name}
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRowIndex}
            onChange={(e) => {
              rowEdits.name = e.currentTarget.value;
            }}
          />
        </td>
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={tournament.location}
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRowIndex}
            onChange={(e) => {
              rowEdits.location = e.currentTarget.value;
            }}
          />
        </td>
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={
              tournament.dates.toString() === "Invalid Date"
                ? "MM-DD"
                : datesToString(tournament.dates)
            }
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRowIndex}
            onChange={(e) => {
              rowEdits.dates = e.currentTarget.value;
            }}
          />
        </td>
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={tournament.type}
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRowIndex}
            onChange={(e) => {
              rowEdits.format = e.currentTarget.value;
            }}
          />
        </td>
        <td
          className="whitespace-nowrap text-center text-sm font-light text-dark-gray"
          key="edit"
        >
          {!editRowIndex && !wait ? (
            <div>
              <button onClick={() => setEditRowIndex(index)}>
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
          ) : editRowIndex && !wait ? (
            <div>
              <button onClick={handleSaveTournament}>
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
};

export default TournamentRow;
