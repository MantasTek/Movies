import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MovieBooking } from './components/MovieBooking';
import { Admin } from './components/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/">Booking</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<MovieBooking />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;