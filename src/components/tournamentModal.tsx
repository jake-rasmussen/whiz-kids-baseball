import Modal from "./modal";

type Props = {
  modalId: string;
  tournamentName: string;
  location: string;
  date: string;
  type: string;
};

const TournamentModal = ({
  modalId,
  tournamentName,
  location,
  date,
  type,
}: Props) => {
  return (
    <Modal modalId={modalId}>
      <div className="flex flex-col items-start text-lg font-semibold text-dark-gray">
        <div className="pb-3 text-2xl font-black text-dark-gray">
          {tournamentName}
        </div>

        <div>
          <span className="font-black text-red">Data: </span>
          {date}
        </div>
        <div>
          <span className="font-black text-red">Location: </span>
          {location}
        </div>
        <div>
          <span className="font-black text-red">Type: </span>
          {type}
        </div>
      </div>
    </Modal>
  );
};

export default TournamentModal;
