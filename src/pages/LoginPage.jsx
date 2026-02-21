import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios нэмэх
import logo from "../assets/logo.png";
import oLogo from "../assets/Ologo.png";

const LoginPage = () => {
  const [userId, setUserId] = useState(""); // email -> userId болгов
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Алдааны мэдээлэл харуулах state
  const [loading, setLoading] = useState(false); // Уншиж байх үед товчлуурыг идэвхгүй болгох

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        user_id: userId,
        password: password,
      });

      if (response.data.access_token) {
        // 1. Токенийг хадгална
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // 2. Dashboard руу шилжинэ. App.jsx-ийн ProtectedRoute нь
        // localStorage-ийг шууд унших тул refresh хийх шаардлагагүй.
        navigate("/UserDashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "ID эсвэл нууц үг буруу байна.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-ololt-rgbgreen to-ololt-dark flex flex-col justify-center px-6 py-12 lg:px-8 font-roboto">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="w-52 mx-auto">
          <img src={logo} alt="Logo" />
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-4 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 font-condensed">
            Нэвтрэх
          </h2>
          {/* Алдаа гарвал энд харуулна */}
          {error && (
            <div className="mt-2 text-center text-sm text-red-600 bg-red-50 p-2 rounded-lg">
              {error}
            </div>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="userId"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                ID дугаар
              </label>
              <div className="mt-2">
                <input
                  id="userId"
                  type="text" // email -> text болгов
                  required
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                  placeholder="12345"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Нууц үг
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading} // Уншиж байх үед товчийг идэвхгүй болгох
                className={`flex w-full justify-center rounded-xl bg-ololt-green px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 transition-colors uppercase tracking-wider font-condensed ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center">
        <img src={oLogo} alt="Company Logo" className="w-8" />
        <p className="text-gray-50 pl-2 font-light text-[10px] opacity-80 uppercase tracking-tighter">
          "ОЛОЛТ АМЖИЛТ" ХХК
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
