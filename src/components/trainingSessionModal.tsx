import Modal from "./modal";

type Props = {
  modalId: string;
  training: string;
  location: string;
  date: string;
  time: string;
  price: number;
};

const TrainingSessionModal = ({
  modalId,
  training,
  location,
  date,
  time,
  price,
}: Props) => {
  return (
    <Modal modalId={modalId}>
      {/* TODO: Fix issue with text overscrolling */}
      <div className="flex flex-col items-start text-lg font-semibold text-dark-gray">
        <div className="pb-3 text-2xl font-black text-dark-gray">
          {training}
        </div>

        <div>
          <span className="font-black text-red">Location: </span>
          {location}
        </div>
        <div>
          <span className="font-black text-red">Date: </span>
          {date}
        </div>
        <div>
          <span className="font-black text-red">Time: </span>
          {time}
        </div>
        <div>
          <span className="font-black text-red">Price: </span>
          {`$${price}`}
        </div>
        <div className="flex w-full justify-center pt-3">
          <button className="btn-sm  btn mx-3 rounded-md border-0 bg-gradient-to-r from-red to-secondary-red capitalize">
            Register
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TrainingSessionModal;
