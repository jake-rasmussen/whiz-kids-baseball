import type { Player } from "@prisma/client";
import { Position } from "@prisma/client";
import { IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons";
import {
  acronymToPositions,
  isEmptyString,
  isWhitespace,
  positionsToString,
} from "../../../utils/helpers";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../utils/api";
import EmptyCard from "../EmptyCard";

type PropType = {
  index: number;
  teamId: string;
  editRow: boolean;
  player: Player;
  wait: boolean;
  setWait: React.Dispatch<React.SetStateAction<boolean>>;
  newPlayerCreated: boolean;
  setNewPlayerCreated: React.Dispatch<React.SetStateAction<boolean>>;
  editIndex: number;
  setEditIndex: React.Dispatch<React.SetStateAction<number>>;
  setDeleteRowIndex: React.Dispatch<React.SetStateAction<number>>;
  removeTemporyPlayer: () => void;
};

const RosterCard = (props: PropType) => {
  const {
    index,
    teamId,
    editRow,
    player,
    wait,
    setWait,
    newPlayerCreated,
    setNewPlayerCreated,
    editIndex,
    setEditIndex,
    setDeleteRowIndex,
    removeTemporyPlayer,
  } = props;

  const [playerEdits, setPlayerEdits] = useState({
    firstName: "",
    lastName: "",
    gradYear: "",
    school: "",
    position: "",
  });
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    setName(fullName);
  }, [fullName]);

  const [validInput, setValidInput] = useState(true);

  const queryClient = api.useContext();

  const resetPlayerEdits = () => {
    setPlayerEdits({
      firstName: "",
      lastName: "",
      gradYear: "",
      school: "",
      position: "",
    });
    setFullName("");
  };

  const onSuccessFunction = () => {
    resetPlayerEdits();
    queryClient.player.getPlayersByTeamId.invalidate({ teamId });
  };

  const createPlayer = api.player.createPlayer.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      onSuccessFunction();
      setNewPlayerCreated(false);
      toast.success("Successfully Created Player");
    },
  });

  const updatePlayer = api.player.updatePlayer.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      onSuccessFunction();
      toast.success("Successfully Updated Player");
    },
  });

  const handleSavePlayer = () => {
    if (!checkValidInput()) {
      setValidInput(false);
      return;
    }

    if (wait) return;

    if (
      Object.entries(playerEdits).toString() ===
      Object.entries({
        firstName: "",
        lastName: "",
        gradYear: "",
        school: "",
        position: "",
      }).toString()
    ) {
      setEditIndex(-1);
      return;
    }

    if (newPlayerCreated) {
      createPlayer.mutate({
        firstName: playerEdits.firstName,
        lastName: playerEdits.lastName,
        graduationYear: +playerEdits.gradYear,
        school: playerEdits.school,
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

    resetPlayerEdits();
  };

  const handleCancelChanges = () => {
    removeTemporyPlayer();
    resetPlayerEdits();
  };

  const setName = (fullName: string) => {
    const split = fullName.split(" ");
    let first = "";
    let last = "";

    if (split.length === 0) return false;
    if (split[0] !== undefined) {
      first = split[0].trim();
    }
    if (split.length > 1 && split[1] !== undefined) {
      last = split[1].trim();
    }

    setPlayerEdits({
      ...playerEdits,
      firstName: first,
      lastName: last,
    });

    return true;
  };

  const checkValidInput = () => {
    if (newPlayerCreated) {
      if (
        isEmptyString(playerEdits.firstName) ||
        isEmptyString(playerEdits.lastName) ||
        isEmptyString(playerEdits.gradYear) ||
        isEmptyString(playerEdits.position) ||
        isEmptyString(playerEdits.school)
      )
        return false;
      if (playerEdits.gradYear.length != 4) return false;
      if (acronymToPositions(playerEdits.position).length === 0) return false;
      if (
        playerEdits.lastName.length === 0 ||
        playerEdits.lastName.length === 0
      )
        return false;
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

    if (
      isWhitespace(playerEdits.gradYear) ||
      isWhitespace(playerEdits.position) ||
      isWhitespace(playerEdits.school)
    )
      return false;

    if (
      fullName.length !== 0 &&
      (playerEdits.firstName.trim().length === 0 ||
        playerEdits.lastName.trim().length === 0)
    )
      return false;

    setValidInput(true);
    return true;
  };

  if (wait && editRow) return <EmptyCard />;

  return (
    <div className="card w-96 bg-dark-gray shadow-xl">
      <div className="card-body">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row">
            <div>
              <p className="text-white">
                Name:
                <input
                  type="text"
                  placeholder={player.firstName + " " + player.lastName}
                  className="input input-sm w-full overflow-ellipsis bg-white capitalize
                      text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-dark-gray disabled:text-red disabled:placeholder-light-gray"
                  disabled={editIndex !== index}
                  onChange={(e) => {
                    setFullName(e.currentTarget.value);
                  }}
                  value={editIndex === index ? fullName : ""}
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
                    setPlayerEdits({
                      ...playerEdits,
                      gradYear: e.currentTarget.value,
                    });
                  }}
                  value={editIndex === index ? playerEdits.gradYear : ""}
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
                    setPlayerEdits({
                      ...playerEdits,
                      school: e.currentTarget.value,
                    });
                  }}
                  value={editIndex === index ? playerEdits.school : ""}
                />
              </p>
              <p className="text-white">
                Position:
                <input
                  type="text"
                  placeholder={
                    player.positions.length === 0
                      ? "Position (C, P, LF...)"
                      : positionsToString(player.positions)
                  }
                  className="input input-sm w-full overflow-ellipsis bg-white capitalize
                      text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-dark-gray disabled:text-red disabled:placeholder-light-gray"
                  disabled={editIndex !== index}
                  onChange={(e) => {
                    setPlayerEdits({
                      ...playerEdits,
                      position: e.currentTarget.value,
                    });
                  }}
                  value={editIndex === index ? playerEdits.position : ""}
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
                    onClick={() => setDeleteRowIndex(index)}
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
                <button onClick={handleCancelChanges}>
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
  );
};

export default RosterCard;
