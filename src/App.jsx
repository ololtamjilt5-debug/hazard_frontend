import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HazardReport from "./pages/HazardReport";
import UserDashboard from "./pages/UserDashboard";

function App() {
  // Браузерын санах ойноос токен байгаа эсэхийг шалгах
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Хэрэв нэвтэрсэн бол шууд Dashboard руу, үгүй бол Login руу */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/UserDashboard" /> : <LoginPage />
          }
        />

        <Route
          path="/LoginPage"
          element={
            isAuthenticated ? <Navigate to="/UserDashboard" /> : <LoginPage />
          }
        />

        {/* Нэвтрээгүй хэрэглэгч Dashboard руу орж болохгүй байхаар хамгаалж болно */}
        <Route
          path="/UserDashboard"
          element={
            isAuthenticated ? <UserDashboard /> : <Navigate to="/LoginPage" />
          }
        />

        <Route
          path="/HazardReport"
          element={
            isAuthenticated ? <HazardReport /> : <Navigate to="/LoginPage" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
