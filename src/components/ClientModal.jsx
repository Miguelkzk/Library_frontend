import React from "react";
import { Modal, Button, Form, FormControl } from "react-bootstrap";

  
function ClientModal({ showModal, handleClose, title, onSave}) {
  const formContent = (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Card id</Form.Label>
        <FormControl type="text"
          placeholder="Enter card id"
          name="card_id"
          value={""}
          onChange={""}
        />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <FormControl type="text"
          placeholder="Enter name"
          name="name"
          value={""}
          onChange={""} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Lastname</Form.Label>
        <FormControl type="text"
          name="lastname"
          placeholder="Enter lastname"
          value={""}
          onChange={""} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <FormControl type="text"
          name="email"
          placeholder="Enter email"
          value={""}
          onChange={""} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Phone</Form.Label>
        <FormControl type="text"
          name="phone"
          placeholder="Enter phone"
          value={""}
          onChange={""} />
      </Form.Group>
    </Form>
  );
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formContent}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ClientModal;
