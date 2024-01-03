import React, { useState } from "react";
import { Modal, Button, Form, FormControl } from "react-bootstrap";


function ClientModal({ showModal, handleClose, title, onSave }) {
  const [client, setClient] = useState({
    id: '',
    card_id: '',
    name: '',
    lastname: '',
    email: '',
    phone: ''
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value
    }));
  };
  const handleSave = () => {
    console.log(client)
  }
  const clearClient = () => {
    setClient({
      card_id: '',
      name: '',
      lastname: '',
      email: '',
      phone: ''
    })
  }
  const CloseModal = () => {
    clearClient();
    handleClose();
  }
  const formContent = (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Card id</Form.Label>
        <FormControl type="text"
          placeholder="Enter card id"
          name="card_id"
          value={client.card_id}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <FormControl type="text"
          placeholder="Enter name"
          name="name"
          value={client.name}
          onChange={handleInputChange} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Lastname</Form.Label>
        <FormControl type="text"
          name="lastname"
          placeholder="Enter lastname"
          value={client.lastname}
          onChange={handleInputChange} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <FormControl type="text"
          name="email"
          placeholder="Enter email"
          value={client.email}
          onChange={handleInputChange} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Phone</Form.Label>
        <FormControl type="text"
          name="phone"
          placeholder="Enter phone"
          value={client.phone}
          onChange={handleInputChange} />
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
        <Button variant="secondary" onClick={CloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ClientModal;
