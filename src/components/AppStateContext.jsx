// AppStateContext.js
import React, { createContext, useContext, useReducer } from 'react';

const AppStateContext = createContext();

const initialState = {
  rentalData: {
    rent_id: '',
    rented_at: '',
    expire_at: '',
    id_client: '',
  },
  clientData: {
    id: '',
    card_id: '',
    name: '',
    lastname: '',
  },
  booksData: {
    copies: []
  }
};

function appStateReducer(state, action) {
  switch (action.type) {
    case 'SET_RENTAL_DATA':
      return { ...state, rentalData: action.payload };
    case 'SET_CLIENT_DATA':
      return { ...state, clientData: action.payload };
    case 'SET_BOOK_DATA':
      return { ...state, booksData: action.payload };
    default:
      return state;
  }
}

function AppStateProvider({ children }) {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}

export { AppStateProvider, useAppState };
