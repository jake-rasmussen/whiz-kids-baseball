import { Alumni } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import { isEmptyString } from "../../../utils/helpers";
import { IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons";
import React from "react";
import toast from "react-hot-toast";
import EmptyRow from "../EmptyRow";

type PropType = {
  index: number;
  alumn: Alumni;
  editRow: boolean;
  setEditRowIndex: React.Dispatch<React.SetStateAction<number>>;
  newRowCreated: boolean;
  setNewRowCreated: React.Dispatch<React.SetStateAction<boolean>>;
  wait: boolean;
  setWait: React.Dispatch<React.SetStateAction<boolean>>;
  removeTemporaryRow: () => void;
  setDeleteRow: React.Dispatch<React.SetStateAction<number>>;
};

const AlumniRowEdit = (props: PropType) => {
  const {
    index,
    alumn,
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
    firstName: "",
    lastName: "",
    organization: "",
    year: "",
  });
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    setName(fullName);
  }, [fullName]);

  const [validInput, setValidInput] = useState(true);

  const queryClient = api.useContext();

  const resetRowEdits = () => {
    setRowEdits({
      firstName: "",
      lastName: "",
      organization: "",
      year: "",
    });
    setFullName("");
  };

  const onSuccessFunction = () => {
    resetRowEdits();
    queryClient.alumni.getAllAlumni.invalidate();
  };

  const createAlumni = api.alumni.createAlumni.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      onSuccessFunction();
      setNewRowCreated(false);
      toast.success("Successfully Created Alumni");
    },
  });

  const updateAlumni = api.alumni.updateAlumni.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      onSuccessFunction();
      toast.success("Successfully Updated Alumni");
    },
  });

  const handleSaveAlumn = () => {
    if (!checkValidInput()) {
      setValidInput(false);
      return;
    }

    if (wait) return;

    if (
      rowEdits.firstName === "" &&
      rowEdits.lastName === "" &&
      rowEdits.organization === "" &&
      rowEdits.year === ""
    ) {
      setEditRowIndex(-1);
      return;
    }

    if (newRowCreated) {
      createAlumni.mutate({
        firstName: rowEdits.firstName,
        lastName: rowEdits.lastName,
        organization: rowEdits.organization,
        year: +rowEdits.year,
      });
    } else {
      updateAlumni.mutate({
        id: alumn.id,
        firstName: isEmptyString(rowEdits.firstName)
          ? alumn.firstName
          : rowEdits.firstName,
        lastName: isEmptyString(rowEdits.lastName)
          ? alumn.lastName
          : rowEdits.lastName,
        organization: isEmptyString(rowEdits.organization)
          ? alumn.organization
          : rowEdits.organization,
        year: isEmptyString(rowEdits.year) ? alumn.year : +rowEdits.year,
      });
    }

    resetRowEdits();
  };

  const handleCancelChanges = () => {
    removeTemporaryRow();
    resetRowEdits();
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

    setRowEdits({
      ...rowEdits,
      firstName: first,
      lastName: last,
    });

    return true;
  };

  const checkValidInput = () => {
    if (newRowCreated) {
      if (
        rowEdits.firstName === "" ||
        rowEdits.lastName === "" ||
        rowEdits.organization === "" ||
        rowEdits.year === ""
      )
        return false;
      if (rowEdits.year.length != 4) return false;
    } else {
      if (rowEdits.firstName != "" && rowEdits.lastName === "") return false;
    }

    if (
      rowEdits.year != "" &&
      (rowEdits.year.length != 4 || Number.isNaN(+rowEdits.year))
    )
      return false;

    return true;
  };

  if (wait && editRow) return <EmptyRow numColumns={3} />;

  return (
    <React.Fragment key={`alumniRow${index}`}>
      <tr
        className="border-y border-light-gray text-dark-gray shadow-xl"
        key={`alumniTable${index}`}
      >
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={alumn.firstName + " " + alumn.lastName}
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRow}
            onChange={(e) => {
              setFullName(e.currentTarget.value);
            }}
            value={fullName}
          />
        </td>
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={alumn.organization}
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRow}
            onChange={(e) => {
              setRowEdits({ ...rowEdits, organization: e.currentTarget.value });
            }}
            value={rowEdits.organization}
          />
        </td>
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={alumn.year === -1 ? "YYYY" : alumn.year.toString()}
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRow}
            onChange={(e) => {
              setRowEdits({ ...rowEdits, year: e.currentTarget.value });
            }}
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
              <button onClick={handleSaveAlumn}>
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

export default AlumniRowEdit;