import { useEffect, useState } from "react";
import axios from "axios";
import UserHeader from "../components/layout/UserHeader";
import UserPanel from "../components/layout/UserPanel";
import TimePanel from "../components/layout/TimePanel";
import RealTimeHazard from "../components/layout/RealtimeHazard";
import HazardReportButton from "../components/common/HazardReportButton";
import HazardDeleteButton from "../components/common/HazardDeleteButton";
import { Loader2 } from "lucide-react";

// --- Skeleton Loader Component ---
const DashboardSkeleton = () => (
  <div className="max-w-md mx-auto bg-white min-h-screen p-4 space-y-6 animate-pulse">
    {/* Header Skeleton */}
    <div className="flex justify-between items-center py-2">
      <div className="w-10 h-10 bg-gray-200 rounded-full" />
      <div className="h-4 w-32 bg-gray-200 rounded" />
      <div className="w-10 h-10 bg-gray-200 rounded-full" />
    </div>

    {/* UserPanel Skeleton */}
    <div className="h-36 bg-gray-100 rounded-2xl w-full" />

    <hr className="border-gray-100" />

    {/* TimePanel Skeleton */}
    <div className="flex gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-10 bg-gray-100 rounded-lg flex-1" />
      ))}
    </div>

    {/* StatCards Skeleton */}
    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-20 bg-gray-100 rounded-xl" />
      ))}
    </div>

    <hr className="border-gray-100" />

    {/* List Skeleton (RealTimeHazard хэсэг) */}
    <div className="space-y-4">
      <div className="h-4 w-24 bg-gray-200 rounded" />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-16 bg-gray-50 rounded-xl w-full" />
      ))}
    </div>
  </div>
);

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [range, setRange] = useState("7d");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [myRes, globalRes] = await Promise.all([
          axios.get("https://hazard-hunter-api.onrender.com/hazards/my", {
            headers,
          }),
          axios.get(
            `https://hazard-hunter-api.onrender.com/hazards?range=${range}&page=${page}&limit=5`,
            {
              headers,
            },
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

    fetchAllData();
  }, [range, page]);

  // 1. Анх удаа уншиж байхад (userData байхгүй үед) Skeleton харуулна
  if (loading && !userData) return <DashboardSkeleton />;

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-24 relative font-roboto">
      <UserHeader />

      {/* 2. Дата солигдож байх үед (Loading) контентыг бага зэрэг бүдгэрүүлж харуулна */}
      <div
        className={`py-4 px-3 space-y-4 transition-opacity duration-300 ${loading ? "opacity-50" : "opacity-100"}`}
      >
        <UserPanel
          profile={userData?.summary?.profile}
          stats={userData?.summary}
        />

        <hr className="border-b-ololt-rgbgreen border-1" />

        <TimePanel
          selectedRange={range}
          onRangeChange={(newRange) => {
            setRange(newRange);
            setPage(1);
          }}
        />

        <div className="grid grid-cols-3 gap-2">
          <StatCard
            color="bg-red-600"
            label="Мэдээлсэн"
            count={globalData?.summary?.total}
          />
          <StatCard
            color="bg-orange-500"
            label="Арилгаж буй"
            count={globalData?.summary?.byStatus?.["Баталсан"]}
          />
          <StatCard
            color="bg-green-600"
            label="Арилгасан"
            count={globalData?.summary?.byStatus?.["Арилгасан"]}
          />
        </div>

        <hr className="border-b-ololt-rgbgreen border-1" />

        <RealTimeHazard
          hazards={globalData?.data}
          total={globalData?.summary?.total}
          currentPage={page}
          onPageChange={(newPage) => setPage(newPage)}
        />

        {/* 3. Range эсвэл Page солигдох үед жижиг Spinner төвд нь харуулах (Сонголтоор) */}
        {loading && userData && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/20">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
        )}

        <div className="flex gap-4 fixed bottom-6 left-0 right-0 px-6 max-w-md mx-auto z-40">
          <HazardReportButton />
          <HazardDeleteButton />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ color, label, count }) => (
  <div
    className={`${color} text-white rounded-xl py-3 px-1 text-center shadow-md`}
  >
    <p className="text-[10px] uppercase font-bold leading-tight">{label}</p>
    <p className="text-2xl font-black mt-1">{count || 0}</p>
  </div>
);

export default UserDashboard;
