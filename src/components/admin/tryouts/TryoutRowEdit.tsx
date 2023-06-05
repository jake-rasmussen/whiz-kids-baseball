import type { Tryout } from "@prisma/client";
import { IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import { toast } from "react-hot-toast";
import EmptyRow from "../EmptyRow";
import {
  dateToTimeStringRaw,
  dateToStringRaw,
  dateStringToDate,
  timeStringToTimeAsDate,
  isEmptyString,
  isWhitespace,
} from "../../../utils/helpers";

type PropType = {
  index: number;
  tryout: Tryout;
  editRowIndex: number;
  setEditRowIndex: React.Dispatch<React.SetStateAction<number>>;
  newRowCreated: boolean;
  setNewRowCreated: React.Dispatch<React.SetStateAction<boolean>>;
  wait: boolean;
  setWait: React.Dispatch<React.SetStateAction<boolean>>;
  removeTemporaryRow: () => void;
  setDeleteRow: React.Dispatch<React.SetStateAction<number>>;
};

const TryoutRowEdit = (props: PropType) => {
  const {
    index,
    tryout,
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
    location: "",
    dateTime: new Date(),
  });
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const dateObject = new Date();

    const dateWithDate = dateStringToDate(date);

    if (dateWithDate.toString() !== "Invalid Date") {
      dateObject.setMonth(dateWithDate.getMonth());
      dateObject.setDate(dateWithDate.getDate());
    } else {
      dateObject.setMonth(tryout.dateTime.getMonth());
      dateObject.setDate(tryout.dateTime.getDate());
    }

    const dateWithTime = timeStringToTimeAsDate(time);

    if (dateWithTime.toString() !== "Invalid Date") {
      dateObject.setHours(dateWithTime.getHours());
      dateObject.setMinutes(dateWithTime.getMinutes());
    } else {
      dateObject.setHours(tryout.dateTime.getHours());
      dateObject.setMinutes(tryout.dateTime.getMinutes());
    }

    setRowEdits((rowEdits) => {
      return {
        ...rowEdits,
        dateTime: dateObject,
      };
    });
  }, [date, time, tryout.dateTime]);

  const [validInput, setValidInput] = useState(true);

  const queryClient = api.useContext();

  const resetRowEdits = () => {
    setRowEdits({
      location: "",
      dateTime: new Date("Invalid"),
    });
    setTime("");
    setDate("");
  };

  const onSuccessFunction = () => {
    resetRowEdits();
    queryClient.tryout.getAllTryouts.invalidate();
  };

  const createTryout = api.tryout.createTryout.useMutation({
    onMutate() {
      setWait(true);
      toast.loading("Creating Tryout");
    },
    onSuccess() {
      onSuccessFunction();
      setNewRowCreated(false);
      toast.dismiss();
      toast.success("Successfully Created Tryout");
    },
  });

  const updateTryout = api.tryout.updateTryout.useMutation({
    onMutate() {
      setWait(true);
      toast.loading("Updating Tryout...");
    },
    onSuccess() {
      onSuccessFunction();
      toast.dismiss();
      toast.success("Successfully Updated Tryout");
    },
  });

  const handleSaveTryout = () => {
    if (!checkValidInput()) {
      setValidInput(false);
      return true;
    }

    if (wait) return;

    if (rowEdits.location === "" && time === "" && date === "") {
      setEditRowIndex(-1);
      return;
    }

    if (newRowCreated) {
      createTryout.mutate({
        location: rowEdits.location,
        dateTime: rowEdits.dateTime,
      });
    } else {
      updateTryout.mutate({
        location:
          rowEdits.location === "" ? tryout.location : rowEdits.location,
        dateTime:
          rowEdits.dateTime.toString() === "Invalid Date"
            ? tryout.dateTime
            : rowEdits.dateTime,
        id: tryout.id,
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
      if (
        isEmptyString(rowEdits.location) ||
        rowEdits.dateTime.toString() === "Invalid Date"
      )
        return false;
    }

    if (
      time.length > 0 &&
      timeStringToTimeAsDate(time).toString() === "Invalid Date"
    )
      return false;
    if (date.length > 0 && dateStringToDate(date).toString() === "Invalid Date")
      return false;

    if (time.length > 0 && time.charAt(2) != ":") return false;
    if (date.length > 0 && date.charAt(2) != "-") return false;

    if (isWhitespace(rowEdits.location)) return false;

    return true;
  };

  if (wait && editRowIndex === index) return <EmptyRow numColumns={3} />;

  return (
    <React.Fragment key={`tryoutRow${index}`}>
      <tr
        className="border-y border-light-gray text-dark-gray shadow-xl"
        key={`practiceTable${index}`}
      >
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={tryout.location}
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={editRowIndex !== index}
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
              tryout.dateTime.toString() === "Invalid Date"
                ? "MM-DD"
                : dateToStringRaw(tryout.dateTime)
            }
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={editRowIndex !== index}
            onChange={(e) => {
              setDate(e.currentTarget.value);
            }}
            value={date}
          />
        </td>
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={
              tryout.dateTime.toString() === "Invalid Date"
                ? "HH:MMAA"
                : dateToTimeStringRaw(tryout.dateTime)
            }
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={editRowIndex !== index}
            onChange={(e) => {
              setTime(e.currentTarget.value);
            }}
            value={time}
          />
        </td>
        <td
          className="whitespace-nowrap text-center text-sm font-light text-dark-gray"
          key="edit"
        >
          {editRowIndex === -1 && !wait ? (
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
          ) : editRowIndex === index && !wait ? (
            <div>
              <button onClick={handleSaveTryout}>
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

export default TryoutRowEdit;
