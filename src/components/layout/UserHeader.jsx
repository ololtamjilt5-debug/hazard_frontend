import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LogOut } from "lucide-react"; // Icon ашиглавал илүү nice

const UserHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Системээс гарах",
      text: "Та гарахдаа итгэлтэй байна уу?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10B981", // Ололт ногоон өнгө
      cancelButtonColor: "#EF4444", // Улаан өнгө
      confirmButtonText: "Тийм, гаръя",
      cancelButtonText: "Үгүй",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // 1. Санах ойг цэвэрлэх
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // 2. Login хуудас руу шилжүүлэх
        // ProtectedRoute ашиглаж байгаа тул navigate хийхэд шууд хаагдана
        navigate("/LoginPage", { replace: true });

        // Нэмэлтээр амжилтын мессеж харуулж болно
        Swal.fire({
          title: "Баяртай!",
          text: "Та амжилттай гарлаа.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-ololt-rgbgreen rounded-full flex items-center justify-center text-white font-bold">
          U
        </div>
        <span className="font-bold text-gray-700">Миний Профайл</span>
      </div>

      {/* Гарах товчлуур */}
      <button
        onClick={handleLogout}
        className="flex items-center text-red-500 font-medium text-sm hover:bg-red-50 p-2 rounded-lg transition-colors"
      >
        <LogOut size={18} className="mr-1" />
        Гарах
      </button>
    </div>
  );
};

export default UserHeader;
