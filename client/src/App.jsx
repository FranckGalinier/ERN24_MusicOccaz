import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import InstrumentDetail from './components/InstrumentDetail';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [instruments, setInstruments] = useState([])
  
  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then((res) => res.json())
      .then((data) => setInstruments(data))
      .catch((error) => console.error('Erreur:', error));
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage instruments={instruments} />} />
        <Route path="/instru/:id" element={<InstrumentDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; 2024 MusicOccaz - Tous droits réservés</p>
      </footer>
    </Router>
  )
}

export default App;