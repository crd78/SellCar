import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VehiculeList from './asset/pages/VehiculeList';
import Home from './asset/pages/Home';
import Navbar from './asset/pages/Navbaru'; // Corrected import statement
import AuthRouter from './asset/pages/Auth/AuthRouter';
import AdminView from './asset/pages/Admin/AdminView';




function App() {
  return (
    <div className='App'>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicule" element={<VehiculeList />} />
          <Route path="/Auth/*" element={<AuthRouter />} />
          <Route path="/Admin/AdminView" element={<AdminView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App