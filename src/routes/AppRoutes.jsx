import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import BookRentals from "../pages/BookRentals";
import NavBar from '../components/NavBar';
import BooksTable from '../pages/Books';
import Clients from '../pages/Clients';
import Login from '../pages/Login';

const AppRoutes = ({ toggleDarkMode }) => {
  return (
    <Router>
      <div>
        <NavBar toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={< BooksTable />} />
          <Route path="/rental" element={<BookRentals />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}
export default AppRoutes;