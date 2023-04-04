import {
  IconCheck,
  IconCirclePlus,
  IconEdit,
  IconTrash,
  IconX,
} from "@tabler/icons";
import React, { useState } from "react";
import { api } from "../../utils/api";
import { Toaster, toast } from "react-hot-toast";
import Modal from "./Modal";
import { isEmptyString } from "../../utils/helpers";
import { Position } from "@prisma/client";

interface PropType {
  teamId: string;
}

const positionsMap = new Map<string, string>([
  ["FIRST_BASE", "1B"],
  ["SECOND_BASE", "2B"],
  ["THIRD_BASE", "3B"],
  ["SHORTSTOP", "SS"],
  ["CATCHER", "C"],
  ["LEFT_FIELD", "LF"],
  ["CENTER_FIELD", "CF"],
  ["RIGHT_FIELD", "RF"],
  ["PITCHER", "P"],
]);

const acronymMap = new Map<string, string>([
  ["1B", "FIRST_BASE"],
  ["2B", "SECOND_BASE"],
  ["3B", "THIRD_BASE"],
  ["SS", "SHORTSTOP"],
  ["C", "CATCHER"],
  ["LF", "LEFT_FIELD"],
  ["CF", "CENTER_FIELD"],
  ["RF", "RIGHT_FIELD"],
  ["P", "PITCHER"],
]);

const Roster = (props: PropType) => {
  const { teamId } = props;
  const [editIndex, setEditIndex] = useState(-1);
  const [deleteIndex, setDeleteRow] = useState(-1);
  const [wait, setWait] = useState(false);
  const [newPlayerCreated, setNewPlayer] = useState(false);

  const [playerEdits, setPlayerEdits] = useState({
    firstName: "",
    lastName: "",
    gradYear: "",
    school: "",
    position: "",
  });

  const [validInput, setValidInput] = useState(true);

  const {
    data: players,
    isLoading,
    isError,
  } = api.player.getPlayersByTeamId.useQuery(
    { teamId },
    { refetchOnWindowFocus: false }
  );

  const queryClient = api.useContext();

  const onSuccessFn = () => {
    setPlayerEdits({
      firstName: "",
      lastName: "",
      gradYear: "",
      school: "",
      position: "",
    });
    setEditIndex(-1);
    setWait(false);
  };

  const deletePlayer = api.player.deletePlayer.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      onSuccessFn();
      queryClient.player.getPlayersByTeamId.invalidate({ teamId });
    },
  });

  const updatePlayer = api.player.updatePlayer.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      onSuccessFn();
    },
  });

  const createPlayer = api.player.createPlayer.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      onSuccessFn();
    },
  });

  if (isLoading) {
    return <>Loading...</>;
  } else if (isError) {
    return <div>Error...</div>;
  }

  const addTemporaryPlayer = (index: number) => {
    if (editIndex !== -1) return;

    players.push({
      id: "",
      firstName: "Full",
      lastName: "Name",
      graduationYear: -1,
      school: "School",
      positions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      teamId: teamId,
    });

    setEditIndex(index);
    setNewPlayer(true);
  };

  const removeTemporaryPlayer = () => {
    if (newPlayerCreated) players.pop();
    setEditIndex(-1);
    setNewPlayer(false);
  };

  const handleDeletePlayer = (index: number) => {
    if (wait) return;
    const playerToBeDeleted = players[deleteIndex];
    if (playerToBeDeleted) {
      deletePlayer.mutate({ id: playerToBeDeleted.id });
    } else {
      toast.error("Error Deleting Player");
    }
  };

  const handleSavePlayer = () => {
    if (!checkValidInput()) {
      setValidInput(false);
      return;
    }
    setEditIndex(-1);

    if (
      Object.entries(playerEdits).toString() ===
      Object.entries({
        firstName: "",
        lastName: "",
        gradYear: "",
        school: "",
        position: "",
      }).toString()
    )
      return;

    if (wait) return;

    const player = players[editIndex];
    if (player === undefined) return;

    if (newPlayerCreated) {
      createPlayer.mutate({
        firstName: playerEdits.firstName,
        lastName: playerEdits.lastName,
        graduationYear: +playerEdits.gradYear,
        school: playerEdits.gradYear,
        positions: acronymToPositions(playerEdits.position),
        teamId: teamId,
      });
    } else {
      updatePlayer.mutate({
        id: player.id,
        firstName: isEmptyString(playerEdits.firstName)
          ? player.firstName
          : playerEdits.firstName,
        lastName: isEmptyString(playerEdits.lastName)
          ? player.lastName
          : playerEdits.lastName,
        graduationYear: isEmptyString(playerEdits.gradYear)
          ? player.graduationYear
          : +playerEdits.gradYear,
        school: isEmptyString(playerEdits.school)
          ? player.school
          : playerEdits.school,
        positions: isEmptyString(playerEdits.position)
          ? player.positions
          : acronymToPositions(playerEdits.position),
        teamId: teamId,
      });
    }
  };

  const setName = (fullName: string) => {
    const split = fullName.split(" ");
    if (split.length === 0) return false;
    if (split.length === 1 && split[0] !== undefined) {
      playerEdits.firstName = split[0].trim();
    }
    if (split.length > 1 && split[1] !== undefined) {
      playerEdits.lastName = split[1].trim();
    }

    return true;
  };

  const checkValidInput = () => {
    if (newPlayerCreated) {
      if (
        playerEdits.firstName === "" ||
        playerEdits.lastName === "" ||
        playerEdits.gradYear === "" ||
        playerEdits.position === "" ||
        playerEdits.school === ""
      )
        return false;
      if (playerEdits.gradYear.length != 4) return false;
      if (acronymToPositions(playerEdits.position).length === 0) return false;
    } else {
      if (
        !isEmptyString(playerEdits.gradYear) &&
        playerEdits.gradYear.length != 4
      )
        return false;

      if (
        !isEmptyString(playerEdits.position) &&
        acronymToPositions(playerEdits.position).length === 0
      )
        return false;

      if (
        !isEmptyString(playerEdits.firstName) &&
        isEmptyString(playerEdits.lastName)
      )
        return false;
    }

    setValidInput(true);
    return true;
  };

  const positionToAcronym = (position: string) => {
    if (!positionsMap.has(position)) return "";
    return positionsMap.get(position);
  };

  const acronymToPositions = (acronyms: string) => {
    const split = acronyms.split(",");
    const positionArray: Position[] = [];
    for (let acronym of split) {
      acronym = acronym.trim();
      acronym = acronym.toUpperCase();
      if (!acronymMap.has(acronym)) return [];
      positionArray.push(acronymMap.get(acronym) as Position);
    }
    return positionArray;
  };

  return (
    <div className="flex w-full flex-wrap place-content-center gap-5 pb-10">
      <Toaster position="bottom-center" />
      <Modal
        name="error"
        header="Invalid Input"
        content="Please make sure that all fields of the new row have been filled
            out, that the date field is formatted properly, and that a valid
            date has been provided"
        confirmCancelButtons={false}
      ></Modal>
      <Modal
        name="delete"
        header="Confirm Delete"
        content="Are you sure you want to delete this player?"
        actionItem={handleDeletePlayer}
        confirmCancelButtons={true}
      ></Modal>
      {players.map((player: any, index: number) => (
        <div
          className="card w-96 bg-dark-gray shadow-xl"
          key={`roster${index}`}
        >
          <div className="card-body">
            <div className="flex flex-col justify-center">
              <div className="flex flex-row">
                <div>
                  <p className="text-white">
                    Name:
                    <input
                      type="text"
                      placeholder={`${player.firstName} ${player.lastName}`}
                      className="input input-sm w-full overflow-ellipsis bg-white capitalize
                        text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-dark-gray disabled:text-red disabled:placeholder-light-gray"
                      disabled={editIndex !== index}
                      onChange={(e) => {
                        setName(e.currentTarget.value);
                      }}
                    />
                  </p>
                  <p className="text-white">
                    Graduation Year:
                    <input
                      type="text"
                      placeholder={
                        player.graduationYear === -1
                          ? "YYYY"
                          : `${player.graduationYear}`
                      }
                      className="input input-sm w-full overflow-ellipsis bg-white capitalize
                        text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-dark-gray disabled:text-red disabled:placeholder-light-gray"
                      disabled={editIndex !== index}
                      onChange={(e) => {
                        playerEdits.gradYear = e.currentTarget.value;
                      }}
                    />
                  </p>
                  <p className="text-white">
                    School:
                    <input
                      type="text"
                      placeholder={`${player.school}`}
                      className="input input-sm w-full overflow-ellipsis bg-white capitalize
                        text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-dark-gray disabled:text-red disabled:placeholder-light-gray"
                      disabled={editIndex !== index}
                      onChange={(e) => {
                        playerEdits.school = e.currentTarget.value;
                      }}
                    />
                  </p>
                  <p className="text-white">
                    Position:
                    <input
                      type="text"
                      placeholder={
                        player.positions.length === 0
                          ? "Position (C, P, LF...)"
                          : player.positions.map(
                              (position: string, index: number) =>
                                index != player.positions.length - 1
                                  ? `${positionToAcronym(position)}`
                                  : ` ${positionToAcronym(position)}`
                            )
                      }
                      className="input input-sm w-full overflow-ellipsis bg-white capitalize
                        text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-dark-gray disabled:text-red disabled:placeholder-light-gray"
                      disabled={editIndex !== index}
                      onChange={(e) => {
                        playerEdits.position = e.currentTarget.value;
                      }}
                    />
                  </p>
                </div>

                {editIndex === -1 ? (
                  <div className="flex flex-col p-2">
                    <button onClick={() => setEditIndex(index)}>
                      <IconEdit className="mx-2 text-white transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                    </button>
                    <button>
                      <label
                        onClick={() => setDeleteRow(index)}
                        htmlFor="delete-modal"
                      >
                        <IconTrash className="mx-2 text-white transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                      </label>
                    </button>
                  </div>
                ) : editIndex === index ? (
                  <div className="flex flex-col p-2">
                    <button onClick={handleSavePlayer}>
                      <label htmlFor={validInput ? "" : "error-modal"}>
                        <IconCheck className="mx-2 text-white transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                      </label>
                    </button>
                    <button onClick={removeTemporaryPlayer}>
                      <IconX className="mx-2 text-white transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col p-2">
                    <button>
                      <IconEdit className="mx-2 text-light-gray" />
                    </button>
                    <button>
                      <IconTrash className="mx-2 text-light-gray" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex w-full justify-center">
        {editIndex === -1 && !wait ? (
          <button
            className="min-w-12 min-h-12 mt-4
            transition duration-300 ease-in-out hover:scale-150 hover:text-red"
            onClick={() => addTemporaryPlayer(players.length)}
          >
            <IconCirclePlus />
          </button>
        ) : (
          <button className="min-w-12 min-h-12 mt-4 text-light-gray">
            <IconCirclePlus />
          </button>
        )}
      </div>
    </div>
  );
};

export default Roster;
