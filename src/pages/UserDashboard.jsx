import { useEffect, useState } from "react";
import axios from "axios";
import UserHeader from "../components/layout/UserHeader";
import UserPanel from "../components/layout/UserPanel";
import TimePanel from "../components/layout/TimePanel";
import RealTimeHazard from "../components/layout/RealtimeHazard";
import HazardReportButton from "../components/common/HazardReportButton";
import HazardDeleteButton from "../components/common/HazardDeleteButton";

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [range, setRange] = useState("7d");
  const [page, setPage] = useState(1); // 1. Хуудасны state нэмэх
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // 2. API хүсэлтэд page болон limit (жишээ нь 5) дамжуулах
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
  }, [range, page]); // 3. Хуудас солигдох бүрт API-г дахин дуудна

  if (loading && !userData)
    return <div className="text-center mt-20">Уншиж байна...</div>;

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-24 relative font-roboto">
      <UserHeader />

      <div className="py-4 px-3 space-y-4">
        <UserPanel
          profile={userData?.summary?.profile}
          stats={userData?.summary}
        />

        <hr className="border-b-ololt-rgbgreen border-1" />

        {/* Range солигдоход хуудсыг 1 рүү буцаах нь зөв байдаг */}
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

        {/* 4. RealTimeHazard-руу хэрэгтэй бүх props-г дамжуулах */}
        <RealTimeHazard
          hazards={globalData?.data}
          total={globalData?.summary?.total} // Энд утга ирж байгаа эсэхийг шалгаарай
          currentPage={page}
          onPageChange={(newPage) => setPage(newPage)}
        />

        <div className="flex gap-4 fixed bottom-6 left-0 right-0 px-6 max-w-md mx-auto">
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
