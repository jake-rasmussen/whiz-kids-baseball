import { Tournament } from "@prisma/client";
import { IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons";
import React, { useState } from "react";
import { api } from "../../utils/api";
import {
  stringToDates,
  datesToString,
  isEmptyString,
} from "../../utils/helpers";
type PropType = {
  index: number;
  tournamentId: string;
  teamId: string;
  tournament: Tournament;
  editRow: boolean;
  setEditRow: React.Dispatch<React.SetStateAction<number>>;
  newRow: boolean;
  setNewRow: React.Dispatch<React.SetStateAction<boolean>>;
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
    setEditRow,
    newRow,
    setNewRow,
    wait,
    setWait,
    removeTemporaryRow,
    setDeleteRow,
  } = props;

  const [row, setRow] = useState({
    name: "",
    location: "",
    dates: "",
    format: ""
  });
  const [validInput, setValidInput] = useState(true); // Determines if the current input is in a valid state

  const queryClient = api.useContext();

  const onSuccessFn = () => {
    setRow({
      name: "",
      location: "",
      dates: "",
      format: ""
    });
    setEditRow(-1);
    setWait(false);
  };

  const updateTournament = api.tournament.updateTournamentDetails.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      queryClient.tournament.getTournamnetsByTeamId.invalidate({ teamId });
      onSuccessFn();
    },
  });

  const createTournament = api.tournament.createTournament.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      queryClient.tournament.getTournamnetsByTeamId.invalidate({ teamId });
      onSuccessFn();
      setNewRow(false);
    },
  });

  const handleSaveTournament = () => {
    if (!checkValidInput()) {
      setValidInput(false);
      return;
    }
    setEditRow(-1);

    if (
      Object.entries(row).toString() ===
      Object.entries({
        name: "",
        location: "",
        dates: "",
        format: ""
      }).toString()
    ) return;
    

    if (wait) return;

    if (newRow) {
      createTournament.mutate({
        name: row.name,
        dates: stringToDates(row.dates),
        location: row.location,
        type: row.format,
        teamId: teamId,
      });
    } else {
      updateTournament.mutate({
        name: isEmptyString(row.name) ? tournament.name : row.name,
        dates: isEmptyString(row.dates)
          ? tournament.dates
          : stringToDates(row.dates),
        location: isEmptyString(row.location)
          ? tournament.location
          : row.location,
        type: isEmptyString(row.format) ? tournament.type : row.format,
        id: tournamentId,
      });
    }
  };

  const checkValidInput = () => {
    if (newRow) {
      if (stringToDates(row.dates).length === 0) return false;
      if (
        isEmptyString(row.name) ||
        isEmptyString(row.dates) ||
        isEmptyString(row.location) ||
        isEmptyString(row.format)
      )
        return false;
    } else {
      if (
        !isEmptyString(row.dates) &&
        (row.dates.length < 5 || stringToDates(row.dates).length === 0)
      )
        return false;
    }
    if (!isEmptyString(row.dates) && row.dates.at(2) != "-") return false;

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
            disabled={!editRow}
            onChange={(e) => {
              row.name = e.currentTarget.value;
            }}
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
              row.location = e.currentTarget.value;
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
            disabled={!editRow}
            onChange={(e) => {
              row.dates = e.currentTarget.value;
            }}
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
              row.format = e.currentTarget.value;
            }}
          />
        </td>
        <td
          className="whitespace-nowrap text-center text-sm font-light text-dark-gray"
          key="edit"
        >
          {!editRow && !wait ? (
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
          ) : editRow && !wait ? (
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
