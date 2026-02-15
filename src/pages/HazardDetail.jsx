import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  MapPin,
  AlertTriangle,
  ShieldCheck,
  Clock,
} from "lucide-react";

const HazardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hazard, setHazard] = useState(null);
  const [loading, setLoading] = useState(true);

  // Render дээрх таны Backend хаяг
  const API_BASE_URL = "https://hazard-hunter-api.onrender.com";

  useEffect(() => {
    const fetchHazardDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/hazards/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHazard(response.data);
      } catch (error) {
        console.error("Мэдээлэл татахад алдаа гарлаа:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHazardDetail();
  }, [id, API_BASE_URL]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        <span className="ml-3 font-medium text-gray-600">Уншиж байна...</span>
      </div>
    );

  if (!hazard)
    return (
      <div className="text-center mt-20 font-bold text-gray-500">
        Мэдээлэл олдсонгүй.
      </div>
    );

  // Статусаас хамаарч өнгө тодорхойлох
  const statusColor =
    hazard.status === "Арилгасан"
      ? "bg-green-100 text-green-700 border-green-200"
      : hazard.status === "Цуцалсан"
        ? "bg-red-100 text-red-700 border-red-200"
        : "bg-orange-100 text-orange-700 border-orange-200";

  return (
    <div className="min-h-screen bg-gray-50 pb-10 font-roboto">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center shadow-sm sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="ml-4 text-lg font-bold text-gray-800">
          Аюулын дэлгэрэнгүй
        </h1>
      </div>

      <div className="max-w-md mx-auto">
        {/* Аюулын зураг - Cloudinary URL ашиглах хэсэг */}
        <div className="w-full h-72 bg-gray-200 relative overflow-hidden">
          <img
            // Cloudinary-гаас ирсэн бүтэн URL-ыг (https://res.cloudinary.com/...) шууд ашиглана
            src={hazard.image}
            alt="Hazard"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/400x300?text=Зураг+байхгүй";
            }}
          />
          <div
            className={`absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase border ${statusColor} shadow-md`}
          >
            {hazard.status}
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Байршил ба Үндсэн мэдээлэл */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-start">
              <MapPin className="text-blue-500 mt-1" size={20} />
              <div className="ml-3">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
                  Байршил
                </p>
                <p className="text-gray-800 font-semibold">{hazard.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-4">
              <div className="flex items-center">
                <AlertTriangle className="text-orange-500" size={20} />
                <div className="ml-2">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                    Түвшин
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {hazard.level}
                  </p>
                </div>
              </div>
              <div className="flex items-center border-l pl-4 border-gray-100">
                <ShieldCheck className="text-green-500" size={20} />
                <div className="ml-2">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                    Ангилал
                  </p>
                  <p className="text-sm font-bold text-gray-800">
                    {hazard.type}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Тайлбар */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-2">
              Тайлбар
            </p>
            <p className="text-gray-700 leading-relaxed text-lg font-condensed">
              {hazard.description}
            </p>
          </div>

          {/* Мэдээлэгч ба Хугацаа */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                {hazard.reporter?.first_name?.charAt(0) || "U"}
              </div>
              <div className="ml-3">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                  Мэдээлсэн
                </p>
                <p className="text-sm font-bold text-gray-800">
                  {hazard.reporter?.first_name} {hazard.reporter?.last_name}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-gray-400 justify-end mb-1">
                <Clock size={12} />
                <span className="text-[10px] ml-1 font-black">
                  {hazard.created_at
                    ? new Date(hazard.created_at).toLocaleDateString()
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {hazard.status === "Хүлээгдэж буй" && (
          <div className="px-4 mt-2 pb-10">
            <button
              onClick={() =>
                navigate("/HazardRemove", { state: { hazardId: hazard.id } })
              }
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-blue-700 active:scale-95 transition-all uppercase tracking-wider"
            >
              АЮУЛЫГ АРИЛГАХ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HazardDetail;
