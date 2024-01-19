import { useEffect, useState } from "react";
import { ClientService } from "../service/ClientService";
import ViewButton from "../components/Buttons/ViewButton";
import { Button, Form, FormControl, Table } from "react-bootstrap";
import EditButton from "../components/Buttons/EditButton";
import DeleteButton from "../components/Buttons/DeleteButton";
import GenericModal from "../components/GenericModal";
import ConfirmModal from "../components/ConfirmModal";
import { useLocation } from "react-router-dom";

function Clients() {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('')
  const [isedit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const location = useLocation();
  const [client, setClient] = useState({
    id: '',
    card_id: '',
    name: '',
    lastname: '',
    email: '',
    phone: ''
  })
  const fetchClients = async () => {
    const clientsData = await ClientService.getClients();
    setClients(clientsData);
  }
  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (location.state && location.state.fromButton) {
      handleOpenModal()
    }
  }, [location.state])


  const handleCloseModal = () => {
    setShowModal(false);
    setIsEdit(false)
    clearClient()
  };
  const handleSave = async () => {
    if (isedit) {
      await ClientService.editClient(client)
    }
    else {
      await ClientService.saveClient(client);
    }

    handleCloseModal();
    await fetchClients();
    setIsEdit(false)
    clearClient();

  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value
    }));
  };
  const handleOpenModal = () => {
    setTitleModal('New Client')
    setShowModal(true);
  };
  const handleEdit = (client) => {
    setTitleModal('Edit client')
    setClient({
      id: client.id,
      card_id: client.card_id,
      name: client.name,
      lastname: client.lastname,
      email: client.email,
      phone: client.phone
    });
    setShowModal(true);
    setIsEdit(true);
  };
  const clearClient = () => {
    setClient({
      card_id: '',
      name: '',
      lastname: '',
      email: '',
      phone: ''
    })
  }
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    clearClient();
  };

  const handleConfirmDelete = async () => {
    await ClientService.deleteClient(client)
    setShowDeleteModal(false);
    await fetchClients();
    clearClient();

  };
  const handleDelete = (client) => {
    setClient(client)
    setShowDeleteModal(true)
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
    <><div className="container mt-3">
      <Button onClick={handleOpenModal} >Add Client</Button>
      <Table hover style={{ fontSize: '18px', marginTop: '2rem' }}>
        <thead>
          <tr>
            <th>Card id</th>
            <th>Name</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.card_id}</td>
              <td>{client.name}</td>
              <td>{client.lastname}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td> <EditButton onClick={() => handleEdit(client)} /> </td>
              <td><DeleteButton onClick={() => handleDelete(client)} /></td>
            </tr>
          ))}
        </tbody>
      </Table >
      <GenericModal
        show={showModal}
        handleClose={handleCloseModal}
        title={titleModal}
        formContent={formContent}
        onSave={handleSave}
      />
      <ConfirmModal
        show={showDeleteModal}
        handleClose={handleCancelDelete}
        title="Confirm delete"
        content={`Are you sure you want to delete the client with card id: ${client.card_id} ?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
    </>
  )
}
export default Clients;