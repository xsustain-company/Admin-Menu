import React from "react";
import { Modal, ModalBody } from "reactstrap";
// import { loadAnimation } from "lottie-web";
// import { defineElement } from "lord-icon-element";

// // register lottie and define custom element
// defineElement(loadAnimation);
// import '@lordicon/lord-icon-element/lord-icon-element.js';

interface DeleteModalProps {
  show ?: boolean;
  onDeleteClick ?: () => void;
  onCloseClick ?: () => void;
  recordId ?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ show, onDeleteClick, onCloseClick, recordId }) => {
  return (
    <Modal fade={true} isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
          <i className="ri-delete-bin-line display-5 text-danger"></i>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4>Are you sure ?</h4>
            <p className="text-muted mx-4 mb-0">
              Are you sure you want to remove this record {recordId ? recordId : ""} ?
            </p>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            Close
          </button>
          <button
            type="button"
            className="btn w-sm btn-danger "
            id="delete-record"
            onClick={onDeleteClick}
          >
            Yes, Delete It!
          </button>
        </div>
      </ModalBody>
    </Modal>
  ) as unknown as JSX.Element;
};

export default DeleteModal;