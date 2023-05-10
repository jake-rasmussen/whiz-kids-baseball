import type { Tournament } from "@prisma/client";
import { IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons";
import React, { useState } from "react";
import { api } from "../../../utils/api";
import {
  dateStringToDates,
  datesToStringRaw,
  isEmptyString,
  isWhitespace,
} from "../../../utils/helpers";
import toast from "react-hot-toast";
import EmptyRow from "../EmptyRow";

type PropType = {
  index: number;
  tournamentId: string;
  teamId: string;
  tournament: Tournament;
  editRow: boolean;
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
    editRow,
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

  const resetRowEdits = () => {
    setRowEdits({
      name: "",
      location: "",
      dates: "",
      format: "",
    });
  };

  const onSuccessFunction = () => {
    resetRowEdits();
    queryClient.tournament.getTournamnetsByTeamId.invalidate({ teamId });
  };

  const createTournament = api.tournament.createTournament.useMutation({
    onMutate() {
      setWait(true);
      toast.loading("Creating Tournament...");
    },
    onSuccess() {
      onSuccessFunction();
      setNewRowCreated(false);
      toast.dismiss();
      toast.success("Sucessfully Created Tournament");
    },
  });

  const updateTournament = api.tournament.updateTournamentDetails.useMutation({
    onMutate() {
      setWait(true);
      toast.loading("Updating Tournament...");
    },
    onSuccess() {
      onSuccessFunction();
      toast.dismiss();
      toast.success("Successfully Updated Tournament");
    },
  });

  const handleSaveTournament = () => {
    if (!checkValidInput()) {
      setValidInput(false);
      return;
    }

    if (wait) return;

    if (
      Object.entries(rowEdits).toString() ===
      Object.entries({
        name: "",
        location: "",
        dates: "",
        format: "",
      }).toString()
    ) {
      setEditRowIndex(-1);
      return;
    }

    if (newRowCreated) {
      createTournament.mutate({
        name: rowEdits.name,
        dates: dateStringToDates(rowEdits.dates),
        location: rowEdits.location,
        type: rowEdits.format,
        teamId: teamId,
      });
    } else {
      updateTournament.mutate({
        name: isEmptyString(rowEdits.name) ? tournament.name : rowEdits.name,
        dates: isEmptyString(rowEdits.dates)
          ? tournament.dates
          : dateStringToDates(rowEdits.dates),
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

  const handleCancelChanges = () => {
    removeTemporaryRow();
    resetRowEdits();
  };

  const checkValidInput = () => {
    if (newRowCreated) {
      if (dateStringToDates(rowEdits.dates).length === 0) return false;
      if (
        isEmptyString(rowEdits.name) ||
        isEmptyString(rowEdits.dates) ||
        isEmptyString(rowEdits.location) ||
        isEmptyString(rowEdits.format)
      )
        return false;
    }

    if (
      !isEmptyString(rowEdits.dates) &&
      (rowEdits.dates.length < 5 ||
        dateStringToDates(rowEdits.dates).length === 0)
    )
      return false;

    if (!isEmptyString(rowEdits.dates) && rowEdits.dates.at(2) != "-")
      return false;

    if (
      isWhitespace(rowEdits.name) ||
      isWhitespace(rowEdits.dates) ||
      isWhitespace(rowEdits.location) ||
      isWhitespace(rowEdits.format)
    )
      return false;

    setValidInput(true);
    return true;
  };

  if (wait && editRow) return <EmptyRow numColumns={4} />;

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
            disabled={!editRow}
            onChange={(e) => {
              setRowEdits({ ...rowEdits, name: e.currentTarget.value });
            }}
            value={rowEdits.name}
          />
        </td>
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={tournament.location}
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRow}
            onChange={(e) => {
              setRowEdits({ ...rowEdits, location: e.currentTarget.value });
            }}
            value={rowEdits.location}
          />
        </td>
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={
              tournament.dates.toString() === "Invalid Date"
                ? "MM-DD"
                : datesToStringRaw(tournament.dates)
            }
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRow}
            onChange={(e) => {
              setRowEdits({ ...rowEdits, dates: e.currentTarget.value });
            }}
            value={rowEdits.dates}
          />
        </td>
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={tournament.type}
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRow}
            onChange={(e) => {
              setRowEdits({ ...rowEdits, format: e.currentTarget.value });
            }}
            value={rowEdits.format}
          />
        </td>
        <td
          className="whitespace-nowrap text-center text-sm font-light text-dark-gray"
          key="edit"
        >
          {!editRow && !wait ? (
            <div>
              <button onClick={() => setEditRowIndex(index)}>
                <IconEdit className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
              </button>
              <button>
                <label
                  htmlFor="delete-modal"
                  onClick={() => setDeleteRow(index)}
                >
                  <IconTrash className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:cursor-pointer hover:text-red" />
                </label>
              </button>
            </div>
          ) : editRow && !wait ? (
            <div>
              <button onClick={handleSaveTournament}>
                <label htmlFor={validInput ? "" : "error-modal"}>
                  <IconCheck className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:cursor-pointer hover:text-red" />
                </label>
              </button>
              <button onClick={handleCancelChanges}>
                <IconX className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:cursor-pointer hover:text-red" />
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
