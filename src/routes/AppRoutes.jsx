import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import BookRentals from "../pages/BookRentals";
import NavBar from '../components/NavBar';
import BooksTable from '../pages/Books';
import Clients from '../pages/Clients';

const AppRoutes = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={< BooksTable />} />
          <Route path="/rental" element={<BookRentals />} />
          <Route path="/clients" element={<Clients />} />
        </Routes>
      </div>
    </Router>
  )
}
export default AppRoutes;