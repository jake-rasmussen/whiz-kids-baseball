import Modal from "./modal"

type Props = {
  modalId: string;
  title: string;
  location: string;
  startTime: string;
  endTime: string;
};

function PracticeModal({
  modalId,
  title,
  location,
  startTime,
  endTime,
}: Props) {
  return (
    <Modal modalId={modalId}>
      <div className="flex w-full flex-col items-start truncate text-lg font-medium text-dark-gray">
        <div className="pb-3 text-2xl font-black text-dark-gray">{title}</div>
        <div>
          <span className="font-black text-red">Location: </span>
          {location}
        </div>
        <div>
          <span className="font-black text-red">Start Time: </span>
          {startTime}
        </div>
        <div>
          <span className="font-black text-red">End Time: </span>
          {endTime}
        </div>
        <div className="flex justify-center py-5"></div>
      </div>
    </Modal>
  );
}

export default PracticeModal;
