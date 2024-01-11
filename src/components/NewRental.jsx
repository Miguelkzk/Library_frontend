// NewRental.js
import React, { useState, useEffect } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GoBack from "./Buttons/GoBack";
import enGB from 'date-fns/locale/en-GB';
import './NewRental.css';
import ClientModal from "./ClientModal";
import SearchButton from "./Buttons/SeachButton";
import { ClientService } from "../service/ClientService";
import { useAppState } from "./AppStateContext";
import { useNavigate } from "react-router-dom";

function formatDateForStorage(date) {
  return date.toISOString();
}

function NewRental({ goBack }) {
  const defaultStartDate = new Date();
  const defaultEndDate = new Date();
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [error, setError] = useState('')
  const [cardId, setCardId] = useState('')
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();

  const handleStartDateChange = (date) => {
    setStartDate(date);
    dispatch({
      type: 'SET_RENTAL_DATA',
      payload: {
        ...state.rentalData,
        rented_at: formatDateForStorage(date)
      },
    });
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    dispatch({
      type: 'SET_RENTAL_DATA',
      payload: {
        ...state.rentalData,
        expire_at: formatDateForStorage(date)
      },
    });
  };

  const searchClient = async () => {
    const filter = cardId
    const dataClient = await ClientService.searchClient(filter)
    if (dataClient != null) {
      setError(false)
      dispatch({
        type: 'SET_CLIENT_DATA',
        payload: {
          id: dataClient.id,
          card_id: dataClient.card_id,
          name: dataClient.name,
          lastname: dataClient.lastname,
        },
      });
    }
    else {
      setError('Client not found')
      dispatch({
        type: 'SET_CLIENT_DATA',
        payload: {
          id: '',
          card_id: '',
          name: '',
          lastname: '',
        },
      });
    }
  }

  const handleSave = () => {
    console.log(state.rentalData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'SET_RENTAL_DATA',
      payload: {
        ...state.rentalData,
        [name]: value,
      },
    });

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'SET_CLIENT_DATA',
      payload: {
        ...state.clientData,
        [name]: value,
      },
    });
    setCardId(e.target.value)
  };

  const saveDates = () => {
    // Puedes realizar alguna acción antes de navegar, si es necesario
    navigate('/');
  };

  useEffect(() => {
    // Inicializa las fechas solo si hay datos en el estado global
    if (state.rentalData.rented_at && state.rentalData.expire_at) {
      setStartDate(new Date(state.rentalData.rented_at));
      setEndDate(new Date(state.rentalData.expire_at));
    }
  }, [state]);
  return (
    <div className="container mt-3" style={{ width: '50%' }}>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Rental ID</Form.Label>
          <FormControl
            type="text"
            placeholder="Enter rental ID"
            name="rent_id"
            value={state.rentalData.rent_id}
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
          <Form.Group className="mb-3" style={{ width: '60%' }}>
            <Form.Label>Card Id</Form.Label>
            <FormControl
              type="text"
              placeholder="Enter the client's card id "
              name="card_id"
              value={state.clientData.card_id}
              onChange={handleChange}
            />
          </Form.Group>
          <span className="mt-3">
            <SearchButton onClick={searchClient} />
            <Button style={{ marginLeft: '12px' }}>New client</Button>
          </span>
        </div>
        {error ? (
          <p style={{ color: 'red', fontSize: '1.2rem', fontWeight: 'bold' }}>Error, client not found</p>
        ) : (<p style={{ fontSize: '1rem' }}>Client: {state.clientData.name} {state.clientData.lastname}</p>)}
        <Button variant="primary" onClick={saveDates}>Add copies</Button>
        <Button variant="primary" onClick={handleSave}>
          Save Rental
        </Button>
      </Form>
      <GoBack onClick={goBack} />
    </div>
  );
}

export default NewRental;
