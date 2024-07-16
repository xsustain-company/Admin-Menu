import PropTypes from "prop-types";
import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { CSVLink } from "react-csv";

const ExportCSVModal = ({ show, onCloseClick, data }:any) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
        <ModalHeader toggle={onCloseClick}></ModalHeader>
          <ModalBody className="py-3 px-5">
          <div className="mt-2 text-center">
          <i className="ri-file-text-line display-5 text-success"></i>
              <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                  <h4>Are you sure ?</h4>
                  <p className="text-muted mx-4 mb-0">
                      Are you sure you want to export CSV file?
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
              <CSVLink
                  data={data}
                  type="button"
                  onClick={onCloseClick}
                  className="btn w-sm btn-success "
                  id="delete-record"
              >
              Download
              </CSVLink>
              </div>
      </ModalBody>
    </Modal>
  );
};

ExportCSVModal.propTypes = {
  onCloseClick: PropTypes.func,
  data: PropTypes.any,
  show: PropTypes.any,
};

export default ExportCSVModal;