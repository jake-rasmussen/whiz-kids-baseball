import { IconCirclePlus } from "@tabler/icons";
import React, { useState } from "react";
import { api } from "../../../utils/api";
import { toast } from "react-hot-toast";
import Modal from "../Modal";
import type { Player } from "@prisma/client";
import RosterCard from "./RosterCard";
import LoadingComponent from "../../LoadingComponent";
import Error from "next/error";

interface PropType {
  teamId: string;
}

const Roster = (props: PropType) => {
  const { teamId } = props;
  const [editIndex, setEditIndex] = useState(-1);
  const [deleteIndex, setDeleteRowIndex] = useState(-1);
  const [wait, setWait] = useState(false);
  const [newPlayerCreated, setNewPlayerCreated] = useState(false);

  const {
    data: players,
    isLoading,
    isError,
    error,
  } = api.player.getPlayersByTeamId.useQuery(
    { teamId },
    {
      refetchOnWindowFocus: false,
      onSuccess() {
        setEditIndex(-1);
        setWait(false);
      },
    }
  );

  const queryClient = api.useContext();
  const deletePlayer = api.player.deletePlayer.useMutation({
    onMutate() {
      setWait(true);
      toast.loading("Deleting Player...");
    },
    onSuccess() {
      queryClient.player.getPlayersByTeamId.invalidate({ teamId });
      toast.dismiss();
      toast.success("Successfully Deleted Player");
    },
  });

  if (isLoading) {
    return <LoadingComponent />;
  } else if (isError) {
    return <Error statusCode={error.data?.httpStatus || 500} />;
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
    setNewPlayerCreated(true);
  };

  const removeTemporaryPlayer = () => {
    if (newPlayerCreated) players.pop();
    setEditIndex(-1);
    setNewPlayerCreated(false);
  };

  const handleDeletePlayer = () => {
    if (wait) return;
    const playerToBeDeleted = players[deleteIndex];
    if (playerToBeDeleted) {
      deletePlayer.mutate({ id: playerToBeDeleted.id });
    } else {
      toast.dismiss();
      toast.error("Error Deleting Player");
    }
  };

  return (
    <div className="flex w-full flex-wrap place-content-center gap-5 pb-10">
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
      {players.map((player: Player, index: number) => (
        <RosterCard
          index={index}
          teamId={teamId}
          editRow={index === editIndex}
          player={player}
          wait={wait}
          setWait={setWait}
          newPlayerCreated={newPlayerCreated}
          setNewPlayerCreated={setNewPlayerCreated}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
          setDeleteRowIndex={setDeleteRowIndex}
          removeTemporyPlayer={removeTemporaryPlayer}
          key={`roster${player.lastName}${index}`}
        />
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
