import React from "react";

type PropType = {
  name: String;
  header: String;
  content: String;
  actionItem?: any;
  confirmCancelButtons: boolean;
};

const Modal = ({
  name,
  header,
  content,
  actionItem,
  confirmCancelButtons,
}: PropType) => {
  return (
    <React.Fragment key={`${name}-modal`}>
      <input type="checkbox" id={`${name}-modal`} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{header}</h3>
          <p className="py-4">{content}</p>
          <div className="modal-action">
            {confirmCancelButtons ? (
              <>
                <button>
                  <label htmlFor={`${name}-modal`} className="btn">
                    Cancel
                  </label>
                </button>
                <button onClick={actionItem}>
                  <label htmlFor={`${name}-modal`} className="btn">
                    Confirm
                  </label>
                </button>
              </>
            ) : (
              <button onClick={actionItem}>
                <label htmlFor={`${name}-modal`} className="btn">
                  Close
                </label>
              </button>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
