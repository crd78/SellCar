import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VehiculeList from './asset/pages/VehiculeList';
import Home from './asset/pages/Home';
import Navbar from './asset/pages/Navbaru'; // Corrected import statement
import AuthRouter from './asset/pages/Auth/AuthRouter';



function App() {
  return (
    <div className='App'>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicule" element={<VehiculeList />} />
          <Route path="/Auth/*" element={<AuthRouter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App