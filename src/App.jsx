import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage';
import HazardReport from './pages/HazardReport';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Үндсэн зам */}
        <Route path="/" element={<LoginPage />} />
        {/* Бусад замууд */}
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/HazardReport" element={<HazardReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;