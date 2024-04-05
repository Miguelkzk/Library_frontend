// NewRental.js
import React, { useState, useEffect } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GoBack from "./Buttons/GoBack";
import enGB from 'date-fns/locale/en-GB';
import './NewRental.css';
import SearchButton from "./Buttons/SeachButton";
import { ClientService } from "../service/ClientService";
import { useAppState } from "./AppStateContext";
import { useNavigate } from "react-router-dom";
import DeleteButton from "./Buttons/DeleteButton";
import { RetalService } from "../service/RentalService";

function formatDateForStorage(date) {
  return date.toISOString();
}
function clearObjectValues(obj) {
  Object.keys(obj).forEach(key => {
    obj[key] = ''; // O también puedes usar undefined
  });
}
function NewRental({ goBack }) {
  const defaultStartDate = new Date();
  const defaultEndDate = new Date();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [error, setError] = useState('')
  const [cardId, setCardId] = useState('')
  const { state, dispatch } = useAppState();
  const [price, setPrice] = useState();
  const navigate = useNavigate();

  //Manejo de fechas

  useEffect(() => {
    // Inicializa las fechas solo si hay datos en el estado global
    if (state.rentalData.rented_at && state.rentalData.expire_at) {
      setStartDate(new Date(state.rentalData.rented_at));
      setEndDate(new Date(state.rentalData.expire_at));
    }
    else return;

  }, [state]);


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

  //cliente
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
  //datos del formulario

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
  const deleteBook = (data) => (e) => {
    e.preventDefault();
    console.log('borrado', data)
    const updatedCopies = state.booksData.copies.filter((copy) => copy.id !== data.id);

    dispatch({
      type: 'SET_BOOK_DATA',
      payload: {
        ...state.booksData,
        copies: updatedCopies,
      },
    });
  }
  const newClient = () => {
    navigate('/clients', { state: { fromButton: true } });
  }
  const handleSave = async () => {
    const rental = state.rentalData
    const idsArray = state.booksData.copies.map(book => book.id);
    let dataRental = {
      book_rental: {
        rent_id: rental.rent_id,
        rented_at: rental.rented_at,
        expire_at: rental.expire_at,
        client_id: state.clientData.id,
        book_copy_ids: idsArray
      }
    }
    console.log(dataRental);
    console.log(state)
    await RetalService.saveRental(dataRental);
    clearData();
    goBack();
    
  };

  const clearData = () => {
    clearObjectValues(state.clientData)
    clearObjectValues(state.rentalData)

    dispatch({
      type: 'SET_BOOK_DATA',
      payload: {
        ...state.booksData,
        copies: [],
      },
    });
  }


  useEffect(() => {
    calculatePrice()
  })
  const calculatePrice = () => {
    var time = (endDate - startDate) / (1000 * 60 * 60 * 24)
    var price_per_day = 0;
    state.booksData.copies.map((data) => (
      price_per_day += parseInt(data.price_per_day)

    ))
    if (isNaN(time)) time = 0
    setPrice(price_per_day * Math.round(time))
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
            <Button style={{ marginLeft: '12px' }} onClick={newClient}>New client</Button>
          </span>
        </div>
        {error ? (
          <p style={{ color: 'red', fontSize: '1.2rem', fontWeight: 'bold' }}>Error, client not found</p>
        ) : (<p style={{ fontSize: '1rem' }}>Client: {state.clientData.name} {state.clientData.lastname}</p>)}
        <p>Books:</p>
        <ul>
          {state.booksData.copies.map((data) => (
            <li key={data.id}>{data.title}, copy id: {data.id_copy}, price per day: {data.price_per_day}
              <DeleteButton onClick={deleteBook(data)} />
            </li>
          ))}
        </ul>
        <Button variant="primary" onClick={() => (navigate('/'))}>Add copies</Button>
        <p style={{ marginTop: '2rem' }}>Total price: {price}</p>
      </Form>
      <div className="d-flex justify-content-center">
        <GoBack onClick={goBack} />
        <Button variant="danger" onClick={clearData} style={{ marginLeft: '2rem' }}>Clear Data</Button>
        <Button variant="primary" onClick={handleSave} style={{ marginLeft: '2rem' }}>
          Save Rental
        </Button>
      </div>
    </div>
  );
}
//state.booksData.copies
export default NewRental;
