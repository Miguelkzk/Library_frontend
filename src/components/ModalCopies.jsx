import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import BookCopies from "./BookCopies";

function CopyModal({ show, handleClose, handleSave, handleCreate, copy }) {
  const [copyId, setCopyId] = useState("");

  // Use useEffect para actualizar el estado cuando el prop 'copy' cambia
  useEffect(() => {
    if (copy) {
      setCopyId(copy.id_copy || "");
    } else {
      // Si no hay una copia proporcionada, restablece el estado
      setCopyId("");
    }
  }, [copy]);

  const handleStatusChange = (e) => {
    setCopyId(e.target.value);
  };

  const onSave = () => {
    const updatedCopy = { ...copy, id_copy: copyId };
    if (copy == null) {
      const copy = {
        id_copy: copyId,
        book_id: 0
      }
      handleCreate(copy)
    }

    else {
      handleSave(updatedCopy);
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{copy && copy.id_copy ? "Edit Copy" : "Create Copy"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="copyStatus">
          <Form.Label>Copy id:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter copy id"
            value={copyId}
            onChange={handleStatusChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CopyModal;
