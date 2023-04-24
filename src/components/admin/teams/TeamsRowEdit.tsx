import { Team } from "@prisma/client";
import { IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons";
import React, { useState } from "react";
import { api } from "../../../utils/api";
import Loading from "../../LoadingPage";
import { toast } from "react-hot-toast";
import EmptyRow from "../EmptyRow";

type PropType = {
  index: number;
  team: Team;
  editRow: boolean;
  setEditRowIndex: React.Dispatch<React.SetStateAction<number>>;
  newRowCreated: boolean;
  setNewRowCreated: React.Dispatch<React.SetStateAction<boolean>>;
  wait: boolean;
  setWait: React.Dispatch<React.SetStateAction<boolean>>;
  removeTemporaryRow: () => void;
  setDeleteRow: React.Dispatch<React.SetStateAction<number>>;
};

const TeamsRowEdit = (props: PropType) => {
  const {
    index,
    team,
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
  });
  const [validInput, setValidInput] = useState(true);

  const queryClient = api.useContext();

  const resetRowEdits = () => {
    setRowEdits({
      name: "",
    });
  };

  const onSuccessFunction = () => {
    resetRowEdits();
    queryClient.team.getAllTeams.invalidate();
  };

  const updateTeam = api.team.updateTeamName.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      onSuccessFunction();
      toast.success("Successfully Updated Team");
    },
  });

  const createTeam = api.team.createTeam.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      onSuccessFunction();
      setNewRowCreated(false);
      toast.success("Successfully Created Team");
    },
  });

  const handleSaveTeam = () => {
    if (!checkValidInput()) {
      setValidInput(false);
      return true;
    }

    if (wait) return;

    if (rowEdits.name === "") {
      setEditRowIndex(-1);
      return;
    }

    if (newRowCreated) {
      createTeam.mutate({
        name: rowEdits.name,
      });
    } else {
      updateTeam.mutate({
        name: rowEdits.name,
        id: team.id,
      });
    }

    resetRowEdits();
  };

  const handleCancelChanges = () => {
    removeTemporaryRow();
    resetRowEdits();
  };

  const checkValidInput = () => {
    if (newRowCreated) {
      if (rowEdits.name === "") return false;
    }
    return true;
  };

  if (wait && editRow) return <EmptyRow numColumns={1} />;

  return (
    <React.Fragment key={`teamRow${index}`}>
      <tr
        className="border-y border-light-gray text-dark-gray shadow-xl"
        key={`practiceTable${index}`}
      >
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={team.name}
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRow}
            onChange={(e) => {
              setRowEdits({ name: e.currentTarget.value });
            }}
            value={rowEdits.name}
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
                  <IconTrash className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                </label>
              </button>
            </div>
          ) : editRow && !wait ? (
            <div>
              <button onClick={handleSaveTeam}>
                <label htmlFor={validInput ? "" : "error-modal"}>
                  <IconCheck className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                </label>
              </button>
              <button onClick={handleCancelChanges}>
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

export default TeamsRowEdit;
