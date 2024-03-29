import type { Training } from "@prisma/client";
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
  training: Training;
  editRowIndex: number;
  setEditRowIndex: React.Dispatch<React.SetStateAction<number>>;
  newRowCreated: boolean;
  setNewRowCreated: React.Dispatch<React.SetStateAction<boolean>>;
  wait: boolean;
  setWait: React.Dispatch<React.SetStateAction<boolean>>;
  removeTemporaryRow: () => void;
  setDeleteRow: React.Dispatch<React.SetStateAction<number>>;
};

const TrainingRowEdit = (props: PropType) => {
  const {
    index,
    training,
    editRowIndex: editRowIndex,
    setEditRowIndex,
    newRowCreated,
    setNewRowCreated,
    wait,
    setWait,
    removeTemporaryRow,
    setDeleteRow,
  } = props;

  const [rowEdits, setRowEdits] = useState({
    fullName: "",
    location: "",
    dateTime: new Date("Invalid"),
    totalSlots: -1,
    availableSlots: -1,
    price: -1,
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
      dateObject.setMonth(training.dateTime.getMonth());
      dateObject.setDate(training.dateTime.getDate());
    }

    const dateWithTime = timeStringToTimeAsDate(time);

    if (dateWithTime.toString() !== "Invalid Date") {
      dateObject.setHours(dateWithTime.getHours());
      dateObject.setMinutes(dateWithTime.getMinutes());
    } else {
      dateObject.setHours(training.dateTime.getHours());
      dateObject.setMinutes(training.dateTime.getMinutes());
    }

    setRowEdits((rowEdits) => {
      return {
        ...rowEdits,
        dateTime: dateObject,
      };
    });
  }, [date, time, training.dateTime]);

  const [validInput, setValidInput] = useState(true);

  const queryClient = api.useContext();

  const resetRowEdits = () => {
    setRowEdits({
      fullName: "",
      location: "",
      dateTime: new Date("Invalid"),
      totalSlots: -1,
      availableSlots: -1,
      price: -1,
    });
    setTime("");
    setDate("");
  };

  const onSuccessFunction = () => {
    resetRowEdits();
    queryClient.training.getAllTrainingsForAdmin.invalidate();
  };

  const createTraining = api.training.createTraining.useMutation({
    onMutate() {
      setWait(true);
      toast.loading("Creating Training...");
    },
    onSuccess() {
      onSuccessFunction();
      setNewRowCreated(false);
      toast.dismiss();
      toast.success("Successfully Created Training");
    },
  });

  const updateTraining = api.training.updateTraining.useMutation({
    onMutate() {
      setWait(true);
      toast.loading("Updating Training...");
    },
    onSuccess() {
      onSuccessFunction();
      toast.dismiss();
      toast.success("Successfully Updated Training");
    },
  });

  const handleSaveTraining = () => {
    if (!checkValidInput()) {
      setValidInput(false);
      return true;
    }

    if (wait) return;

    if (
      rowEdits.location === "" &&
      time === "" &&
      date === "" &&
      rowEdits.fullName === "" &&
      rowEdits.totalSlots === -1 &&
      rowEdits.price === -1
    ) {
      setEditRowIndex(-1);
      return;
    }

    if (newRowCreated) {
      createTraining.mutate({
        name: rowEdits.fullName,
        location: rowEdits.location,
        dateTime: rowEdits.dateTime,
        totalSlots: rowEdits.totalSlots,
        price: rowEdits.price,
      });
    } else {
      updateTraining.mutate({
        name: rowEdits.fullName === "" ? training.name : rowEdits.fullName,
        location:
          rowEdits.location === "" ? training.location : rowEdits.location,
        dateTime:
          rowEdits.dateTime.toString() === "Invalid Date"
            ? training.dateTime
            : rowEdits.dateTime,
        totalSlots:
          rowEdits.totalSlots === -1
            ? training.totalSlots
            : rowEdits.totalSlots,
        price: rowEdits.price === -1 ? training.price : rowEdits.price,
        id: training.id,
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
        isEmptyString(time) ||
        isEmptyString(date) ||
        isEmptyString(rowEdits.fullName) ||
        rowEdits.totalSlots === -1 ||
        rowEdits.price === -1 ||
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

    if (
      isWhitespace(rowEdits.location) ||
      isWhitespace(time) ||
      isWhitespace(date) ||
      isWhitespace(rowEdits.fullName)
    )
      return false;

    return true;
  };

  if (wait && editRowIndex === index) return <EmptyRow numColumns={6} />;

  return (
    <React.Fragment key={`trainingRow${index}`}>
      <tr
        className="border-y border-light-gray text-dark-gray shadow-xl"
        key={`trainingTable${index}`}
      >
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={training.name}
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={editRowIndex !== index}
            onChange={(e) => {
              setRowEdits({ ...rowEdits, fullName: e.currentTarget.value });
            }}
            value={rowEdits.fullName}
          />
        </td>
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={training.location}
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
              training.dateTime.toString() === "Invalid Date"
                ? "MM-DD"
                : dateToStringRaw(training.dateTime)
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
              training.dateTime.toString() === "Invalid Date"
                ? "HH:MMAA"
                : dateToTimeStringRaw(training.dateTime)
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
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={
              training.totalSlots === -1
                ? "Number of Slots"
                : training.totalSlots.toString()
            }
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={editRowIndex !== index}
            onChange={(e) => {
              setRowEdits({ ...rowEdits, totalSlots: +e.currentTarget.value });
            }}
            value={
              rowEdits.totalSlots === -1 ||
              rowEdits.totalSlots === 0 ||
              Number.isNaN(rowEdits.totalSlots)
                ? ""
                : rowEdits.totalSlots
            }
          />
        </td>
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={
              training.price === -1 ? "Price" : training.price.toString()
            }
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={editRowIndex !== index}
            onChange={(e) => {
              setRowEdits({ ...rowEdits, price: +e.currentTarget.value });
            }}
            value={
              rowEdits.price === -1 ||
              rowEdits.totalSlots === 0 ||
              Number.isNaN(rowEdits.price)
                ? ""
                : rowEdits.price
            }
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
              <button onClick={handleSaveTraining}>
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

export default TrainingRowEdit;
