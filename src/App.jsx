import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HazardReport from "./pages/HazardReport";
import HazardRemove from "./pages/HazardRemove";
import UserDashboard from "./pages/UserDashboard";
import HazardDetail from "./pages/HazardDetail";
import LogoutPage from "./pages/LogoutPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/auth/AdminRoute";
import AdminHazards from "./pages/AdminHazards";

// --- ТУСЛАХ КОМПОНЕНТУУД ---

// Зөвхөн нэвтэрсэн хэрэглэгч орох замууд
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    // Хэрэв токен байхгүй бол нэвтрэх хуудас руу шилжүүлнэ
    return <Navigate to="/LoginPage" replace />;
  }
  return children;
};

// Нэвтэрсэн хэрэглэгч дахин Login руу орохоос сэргийлэх замууд
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (token) {
    // Хэрэв аль хэдийн нэвтэрсэн бол шууд Dashboard руу шилжүүлнэ
    return <Navigate to="/UserDashboard" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Нэвтрэх хуудас - Нэвтэрсэн бол харагдахгүй */}
        <Route
          path="/LoginPage"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        {/* Хамгаалагдсан замууд - Зөвхөн токентой үед харагдана */}
        <Route
          path="/UserDashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/HazardReport"
          element={
            <ProtectedRoute>
              <HazardReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/HazardRemove"
          element={
            <ProtectedRoute>
              <HazardRemove />
            </ProtectedRoute>
          }
        />

        <Route
          path="/HazardDetail/:id"
          element={
            <ProtectedRoute>
              <HazardDetail />
            </ProtectedRoute>
          }
        />

        {/* АДМИН ХЭСЭГ (Зөвхөн Level 3, 4) */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/hazards" element={<AdminHazards />} />
        </Route>

        {/* Үндсэн зам (/) */}
        <Route path="/" element={<Navigate to="/UserDashboard" replace />} />

        {/* Буруу зам руу орвол */}
        <Route path="*" element={<Navigate to="/" replace />} />

        <Route path="/Logout" element={<LogoutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
