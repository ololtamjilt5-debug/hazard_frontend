import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Датаг устгах
    localStorage.clear();

    // 2. Баяртай гэж хэлээд шилжүүлэх
    const timer = setTimeout(() => {
      navigate("/LoginPage", { replace: true });
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 font-roboto">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ololt-rgbgreen"></div>
      <p className="mt-4 text-gray-600 font-medium tracking-tight">
        Системээс гарч байна, түр хүлээнэ үү...
      </p>
    </div>
  );
};

export default LogoutPage;
