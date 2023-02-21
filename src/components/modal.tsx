import type { ReactNode } from "react";

type Props = {
  modalId: string;
  children: ReactNode;
};

const Modal = ({ modalId, children }: Props) => {
  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <label htmlFor={modalId} className="modal cursor-pointer">
        <div className="modal-box rounded-md p-6">{children}</div>
      </label>
    </>
  );
};

export default Modal;