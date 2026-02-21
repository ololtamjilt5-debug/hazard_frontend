import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserHeader from "../components/layout/UserHeader";
import UserPanel from "../components/layout/UserPanel";
import TimePanel from "../components/layout/TimePanel";
import RealTimeHazard from "../components/layout/RealtimeHazard";
import HazardReportButton from "../components/common/HazardReportButton";
import HazardDeleteButton from "../components/common/HazardDeleteButton";
import {
  Loader2,
  ShieldAlert,
  Users,
  LayoutDashboard,
  AlertCircle,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// --- Skeleton Loader Component (Дата ачаалах үед харагдах бэлдэц) ---
const DashboardSkeleton = () => (
  <div className="max-w-md mx-auto bg-white min-h-screen p-4 space-y-6 animate-pulse">
    <div className="flex justify-between items-center py-2">
      <div className="w-10 h-10 bg-gray-200 rounded-full" />
      <div className="h-4 w-32 bg-gray-200 rounded" />
      <div className="w-10 h-10 bg-gray-200 rounded-full" />
    </div>
    <div className="h-40 bg-gray-100 rounded-[2rem] w-full" />
    <hr className="border-gray-100" />
    <div className="flex gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-10 bg-gray-100 rounded-xl flex-1" />
      ))}
    </div>
    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-20 bg-gray-100 rounded-xl" />
      ))}
    </div>
    <div className="space-y-4 pt-4">
      <div className="h-4 w-24 bg-gray-200 rounded" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-20 bg-gray-50 rounded-2xl w-full" />
      ))}
    </div>
  </div>
);

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [range, setRange] = useState("7d");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // LocalStorage-оос нэвтэрсэн хэрэглэгчийн мэдээллийг авах
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      // 1. Миний аюулууд (My Dashboard)
      // 2. Компанийн нийт аюулууд (Global Dashboard - Шүүлтүүртэй)
      const [myRes, globalRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/hazards/my`, { headers }),
        axios.get(
          `${API_BASE_URL}/hazards?range=${range}&page=${page}&limit=5`,
          { headers },
        ),
      ]);

      setUserData(myRes.data);
      setGlobalData(globalRes.data);
    } catch (error) {
      console.error("Дата татахад алдаа гарлаа:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [range, page]);

  // Анх удаа уншиж байхад Skeleton харуулна
  if (loading && !userData) return <DashboardSkeleton />;

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-24 relative font-roboto">
      {/* Header хэсэг */}
      <UserHeader />

      <div
        className={`py-4 px-3 space-y-5 transition-opacity duration-300 ${
          loading ? "opacity-50" : "opacity-100"
        }`}
      >
        {/* --- АДМИН УДИРДЛАГА (Зөвхөн Level 3-аас дээш эрхтэй бол харагдана) --- */}
        {user?.level >= 3 && (
          <div className="bg-indigo-50 p-4 rounded-[2rem] border border-indigo-100 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 px-1">
              <ShieldAlert className="text-indigo-600" size={18} />
              <h3 className="text-[11px] font-black text-indigo-900 uppercase tracking-wider">
                Админ удирдлага
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate("/admin/hazards")}
                className="flex flex-col items-center justify-center bg-white border border-indigo-100 p-3 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all group active:scale-95 shadow-sm"
              >
                <LayoutDashboard
                  size={20}
                  className="text-indigo-600 group-hover:text-white mb-1"
                />
                <span className="text-[10px] font-black uppercase tracking-tighter">
                  Аюул батлах
                </span>
              </button>

              <button
                onClick={() => navigate("/admin")}
                className="flex flex-col items-center justify-center bg-white border border-indigo-100 p-3 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all group active:scale-95 shadow-sm"
              >
                <Users
                  size={20}
                  className="text-indigo-600 group-hover:text-white mb-1"
                />
                <span className="text-[10px] font-black uppercase tracking-tighter">
                  Хэрэглэгчид
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Хэрэглэгчийн хувийн мэдээллийн самбар */}
        <UserPanel
          profile={userData?.summary?.profile}
          stats={userData?.summary}
        />

        <hr className="border-gray-100" />

        {/* Хугацаа сонгох хэсэг (7 хоног, 1 сар г.м) */}
        <TimePanel
          selectedRange={range}
          onRangeChange={(newRange) => {
            setRange(newRange);
            setPage(1);
          }}
        />

        {/* Статистик картууд (Нийт, Баталсан, Арилгасан) */}
        <div className="grid grid-cols-3 gap-2">
          <StatCard
            color="bg-red-600"
            label={user?.level < 3 ? "Нийт аюул" : "Мэдээлсэн"}
            count={globalData?.summary?.total}
          />
          <StatCard
            color="bg-orange-500"
            label="Баталсан"
            count={globalData?.summary?.byStatus?.["Баталсан"] || 0}
          />
          <StatCard
            color="bg-green-600"
            label="Арилгасан"
            count={globalData?.summary?.byStatus?.["Арилгасан"] || 0}
          />
        </div>

        {/* Бодит цагийн аюулын жагсаалт */}
        <div className="bg-gray-50 rounded-[2rem] p-4 border border-gray-100 shadow-inner">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-gray-400" />
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-tight">
                {user?.level < 3 ? "Баталгаажсан аюулууд" : "Сүүлийн аюулууд"}
              </h3>
            </div>
            <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase">
              {user?.company || "Манай компани"}
            </span>
          </div>

          <RealTimeHazard
            hazards={globalData?.data}
            total={globalData?.summary?.total}
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>

        {/* Range эсвэл Page солих үед харагдах Overlay Loader */}
        {loading && userData && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/20 backdrop-blur-[1px]">
            <div className="bg-white p-4 rounded-full shadow-xl border border-gray-100">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          </div>
        )}

        {/* Үйлдлийн товчлуурууд (Мэдээлэх, Устгах) */}
        <div className="flex gap-4 fixed bottom-6 left-0 right-0 px-6 max-w-md mx-auto z-40">
          <HazardReportButton />
          <HazardDeleteButton />
        </div>
      </div>
    </div>
  );
};

// --- Туслах Компонент: StatCard (Статистик харуулах карт) ---
const StatCard = ({ color, label, count }) => (
  <div
    className={`${color} text-white rounded-2xl py-3 px-1 text-center shadow-lg shadow-gray-200 border-b-4 border-black/10`}
  >
    <p className="text-[10px] uppercase font-black leading-tight opacity-80">
      {label}
    </p>
    <p className="text-2xl font-black mt-1 tracking-tight">{count || 0}</p>
  </div>
);

export default UserDashboard;
