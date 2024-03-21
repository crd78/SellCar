import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VehiculeList from './asset/pages/VehiculeList';
import Home from './asset/pages/Home';
import Navbar from './asset/pages/Navbaru'; // Corrected import statement


function App() {
  return (
    <div className='App'>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicule" element={<VehiculeList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App