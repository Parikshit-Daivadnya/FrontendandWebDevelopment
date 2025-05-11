// import React from "react";
import { Modal, Button } from "react-bootstrap";

function ViewDetails({ show, handleClose, student }) {
  if (!student) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeBu on>
        <Modal.Title>Student Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {Object.entries(student).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {value}
          </p>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button on variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewDetails;
