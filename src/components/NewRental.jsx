import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GoBack from "./Buttons/GoBack";
import enGB from 'date-fns/locale/en-GB';
import './NewRental.css';
import ClientModal from "./ClientModal";

function formatDateForStorage(date) {
  return date.toISOString();
}

function NewRental({ goBack }) {
  const defaultStartDate = new Date();
  const defaultEndDate = new Date();
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [showModal, setShowModal] = useState(false);
  const [rental, setRental] = useState({
    rent_id: '',
    rented_at: formatDateForStorage(defaultStartDate),
    expire_at: formatDateForStorage(defaultEndDate)
  });

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setRental((prevRental) => ({
      ...prevRental,
      rented_at: formatDateForStorage(date)
    }));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setRental((prevRental) => ({
      ...prevRental,
      expire_at: formatDateForStorage(date)
    }));
  };

  const handleSave = () => {
    console.log(rental);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRental((prevRental) => ({
      ...prevRental,
      [name]: value
    }));
  };
  const handleOpenModal = () => {
    setShowModal(true)
    console.log(showModal)
  };
  const handleCloseModal = () => {
    setShowModal(false);

  }
  return (
    <div className="container mt-3" style={{ width: '50%' }}>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Rental ID</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter rental ID"
            name="rent_id"
            value={rental.rent_id}
            onChange={handleInputChange}
          />
        </Form.Group>
        <div className="calendar">
          <Form.Group className="mb-3" style={{ width: '45%', marginRight: '5%' }}>
            <Form.Label>Rented at </Form.Label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="dd/MM/yyyy"
              className="form-control"
              locale={enGB}
            />
          </Form.Group>
          <Form.Group className="mb-3" style={{ width: '45%', marginLeft: '5%' }}>
            <Form.Label>Expire_at</Form.Label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="dd/MM/yyyy"
              className="form-control"
              locale={enGB}
            />
          </Form.Group>
        </div>
        <div className="client">
          <Form.Group className="mb-3" style={{ width: '75%' }}>
            <Form.Label>Card Id</Form.Label>
            <FormControl
              type="text"
              placeholder="Enter the client's card id "
              name="rent_id"
              value={rental.rent_id}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button className="mt-3" onClick={handleOpenModal}>New client</Button>
        </div>
        <Button variant="primary" onClick={handleSave}>
          Save Rental
        </Button>
      </Form>
      <GoBack onClick={goBack} />
      <ClientModal
      showModal={showModal}
      handleClose={handleCloseModal}
      title={'New client'}
      onSave={""}/>
    </div>
  );
}

export default NewRental;
