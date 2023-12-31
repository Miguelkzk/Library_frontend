import { Form, FormControl } from "react-bootstrap";
import GenericModal from "./GenericModal";

function ClientModal({ showModal }) {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    clearClient()
  };
  const handleSave = async () => {

  };
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
    <GenericModal
      show={showModal}
      handleClose={handleCloseModal}
      title={titleModal}
      formContent={formContent}
      onSave={handleSave}
    />
  )
} export default ClientModal;