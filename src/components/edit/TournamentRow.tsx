import { Tournament } from "@prisma/client";
import { IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons";
import React, { useState } from "react";
import { api } from "../../utils/api";

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
  setDeleteRow: React.Dispatch<React.SetStateAction<number>>;
  removeTemporaryRow: () => void;
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
    format: "",
  });
  const [validInput, setValidInput] = useState(true); // Determines if the current input is in a valid state

  const queryClient = api.useContext();

  const updateTournament = api.tournament.updateTournamentDetails.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      queryClient.tournament.getTournamnetsByTeamId.invalidate({ teamId });
      setRow({
        name: "",
        location: "",
        dates: "",
        format: "",
      });
      setEditRow(-1);
      setWait(false);
    },
  });

  const createTournament = api.tournament.createTournament.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      queryClient.tournament.getTournamnetsByTeamId.invalidate({ teamId });
      setRow({
        name: "",
        location: "",
        dates: "",
        format: "",
      });
      setEditRow(-1);
      setNewRow(false);
      setWait(false);
    },
  });

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

  const handleSaveTournament = () => {
    if (!checkValidInput()) {
      setValidInput(false);
      return;
    }
    setEditRow(-1);
    
    if (
      row.name === "" &&
      row.dates === "" &&
      row.format === "" &&
      row.location === ""
    )
      return;

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
        name: row.name === "" ? tournament.name : row.name,
        dates: row.dates === "" ? tournament.dates : stringToDates(row.dates),
        location: row.location === "" ? tournament.location : row.location,
        type: row.format === "" ? tournament.type : row.format,
        id: tournamentId,
      });
    }
  };

  const checkValidInput = () => {
    if (newRow) {
      if (stringToDates(row.dates).length === 0) return false;
      if (
        row.name.trim().length === 0 ||
        row.dates.trim().length === 0 ||
        row.location.trim().length === 0 ||
        row.format.trim().length === 0
      )
        return false;
    } else {
      if (row.dates !== "" && row.dates.length < 5) return false;
      if (row.dates !== "" && stringToDates(row.dates).length === 0)
        return false;
    }
    if (row.dates !== "" && row.dates.at(2) != "-") return false;

    setValidInput(true);
    return true;
  };

  return (
    <React.Fragment key={`tournamentTable${index}`}>
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
