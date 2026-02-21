import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Loader2,
  ExternalLink,
  ShieldCheck,
  ClipboardCheck,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AdminHazards = () => {
  const navigate = useNavigate();
  const [hazards, setHazards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Хүлээгдэж буй");

  // --- Өгөгдөл татах функц ---
  const fetchHazards = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/hazards?range=1y`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Backend-ээс ирсэн жагсаалтыг хадгалах
      setHazards(res.data.data || res.data);
    } catch (err) {
      console.error("Аюулын жагсаалт татахад алдаа гарлаа");
      Swal.fire("Алдаа", "Мэдээлэл татахад алдаа гарлаа", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHazards();
  }, []);

  // --- Статус шинэчлэх үндсэн логик ---
  const handleUpdateStatus = async (hazard, actionType) => {
    let newStatus = "";
    let confirmTitle = "";
    let confirmText = "";
    let confirmColor = "#4f46e5"; // Indigo default

    // Логик тодорхойлох
    if (actionType === "approve") {
      // Хүлээгдэж буй аюулыг батлах үед:
      newStatus = hazard.main_type === "Арилгасан" ? "Арилгасан" : "Баталсан";
      confirmTitle = "Батлах уу?";
      confirmText = `Энэхүү аюулыг "${newStatus}" төлөвт оруулж батлах уу?`;
      confirmColor = "#10b981"; // Emerald
    } else if (actionType === "resolve") {
      // Баталсан аюулыг засагдсан гэж үзвэл:
      newStatus = "Арилгасан";
      confirmTitle = "Арилгасан гэж тэмдэглэх үү?";
      confirmText = "Аюулыг бодитоор бүрэн арилгасан гэдгийг баталж байна уу?";
      confirmColor = "#059669"; // Green
    } else if (actionType === "reject") {
      // Цуцлах үед:
      newStatus = "Цуцалсан";
      confirmTitle = "Цуцлах уу?";
      confirmText = `"${hazard.title}" аюулыг цуцалж, жагсаалтаас хасах уу?`;
      confirmColor = "#ef4444"; // Red
    }

    const confirmResult = await Swal.fire({
      title: confirmTitle,
      text: confirmText,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Тийм",
      cancelButtonText: "Үгүй",
      confirmButtonColor: confirmColor,
    });

    if (confirmResult.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.patch(
          `${API_BASE_URL}/hazards/${hazard.id}/status`,
          { status: newStatus },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        Swal.fire(
          "Амжилттай",
          `Төлөв "${newStatus}" болж шинэчлэгдлээ.`,
          "success",
        );
        fetchHazards(); // Жагсаалтыг дахин шинэчлэх
      } catch (err) {
        Swal.fire(
          "Алдаа",
          err.response?.data?.message || "Төлөв өөрчлөхөд алдаа гарлаа",
          "error",
        );
      }
    }
  };

  // Шүүлтүүр хийх
  const filteredData = hazards.filter((h) => h.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 font-roboto pb-10">
      {/* --- Sticky Header --- */}
      <div className="bg-white px-4 py-4 flex items-center shadow-sm sticky top-0 z-50 border-b border-indigo-100">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-indigo-50 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-indigo-600" />
        </button>
        <div className="ml-3">
          <h1 className="text-lg font-black text-gray-800 uppercase tracking-tight leading-none">
            Аюул баталгаажуулах
          </h1>
          <p className="text-[10px] font-bold text-indigo-500 uppercase mt-1 tracking-widest">
            Админ хяналтын самбар
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* --- Tabs (Шүүлтүүр) --- */}
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-gray-100 overflow-x-auto scrollbar-hide">
          {["Хүлээгдэж буй", "Баталсан", "Арилгасан", "Цуцалсан"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`flex-1 min-w-[85px] py-3 rounded-xl text-[9px] font-black transition-all ${
                filter === tab
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-400"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* --- Жагсаалтын хэсэг --- */}
        {loading ? (
          <div className="flex flex-col items-center py-20 text-gray-300">
            <Loader2 className="animate-spin mb-2" size={32} />
            <p className="text-xs font-bold uppercase tracking-widest">
              Уншиж байна...
            </p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
            <ShieldCheck size={48} className="mx-auto text-gray-100 mb-2" />
            <p className="text-gray-400 font-bold text-sm uppercase">
              Мэдээлэл олдсонгүй
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredData.map((hazard) => (
              <div
                key={hazard.id}
                className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col transition-all"
              >
                {/* Зургийн хэсэг */}
                {hazard.image && (
                  <div className="h-48 w-full relative group">
                    <img
                      src={hazard.image}
                      alt="Hazard"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => window.open(hazard.image, "_blank")}
                      className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white p-2 rounded-xl active:scale-90 transition-transform"
                    >
                      <ExternalLink size={16} />
                    </button>
                    {/* Төрлийн шошго */}
                    <div
                      className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase text-white shadow-lg ${hazard.main_type === "Арилгасан" ? "bg-emerald-500" : "bg-blue-500"}`}
                    >
                      {hazard.main_type}
                    </div>
                  </div>
                )}

                <div className="p-5 space-y-4">
                  {/* Гарчиг болон Төлөв */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-red-500">
                        <AlertTriangle size={14} />
                        <span className="text-[10px] font-black uppercase tracking-wider">
                          {hazard.level} АЮУЛ
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-800 leading-tight">
                        {hazard.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400 flex items-center justify-end gap-1">
                        <Clock size={10} />{" "}
                        {new Date(hazard.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-xl italic border border-gray-100/50">
                    "{hazard.description}"
                  </p>

                  {/* Мэдээлэгч ажилтны мэдээлэл */}
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                    <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-xs uppercase shadow-sm">
                      {hazard.reporter?.first_name?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-800 leading-none">
                        {hazard.reporter?.last_name}{" "}
                        {hazard.reporter?.first_name}
                      </p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 tracking-tighter">
                        {hazard.reporter?.job}
                      </p>
                    </div>
                  </div>

                  {/* --- АДМИНЫ ҮЙЛДЛИЙН ТОВЧЛУУРУУД --- */}
                  <div className="pt-2">
                    {/* 1. Хүлээгдэж буй таб дээрх үйлдлүүд */}
                    {hazard.status === "Хүлээгдэж буй" && (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleUpdateStatus(hazard, "approve")}
                          className="w-full bg-emerald-500 text-white py-3.5 rounded-2xl font-black text-[11px] uppercase flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-emerald-100"
                        >
                          {hazard.main_type === "Арилгасан" ? (
                            <>
                              <ClipboardCheck size={18} /> Арилгасныг батлах
                            </>
                          ) : (
                            <>
                              <CheckCircle2 size={18} /> Мэдээллийг батлах
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(hazard, "reject")}
                          className="w-full bg-red-50 text-red-500 py-3 rounded-2xl font-black text-[11px] uppercase flex items-center justify-center gap-2 active:scale-95 transition-all border border-red-100"
                        >
                          <XCircle size={16} /> Цуцлах
                        </button>
                      </div>
                    )}

                    {/* 2. Баталсан таб дээрх үйлдлүүд (Level 3 Admin Resolve) */}
                    {hazard.status === "Баталсан" && (
                      <button
                        onClick={() => handleUpdateStatus(hazard, "resolve")}
                        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-[11px] uppercase flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 active:scale-95 transition-transform"
                      >
                        <ShieldCheck size={20} /> Аюулыг арилгасан гэж тэмдэглэх
                      </button>
                    )}

                    {/* 3. Арилгасан таб дээрх тайлбар */}
                    {hazard.status === "Арилгасан" && (
                      <div className="flex items-center justify-center gap-2 text-emerald-600 bg-emerald-50 py-3 rounded-2xl border border-emerald-100">
                        <ShieldCheck size={18} />
                        <span className="text-[10px] font-black uppercase">
                          Аюулыг бүрэн арилгасан
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHazards;
