import { useEffect, useState } from "react";
import axios from "axios";
import UserHeader from "../components/layout/UserHeader";
import UserPanel from "../components/layout/UserPanel";
import HazardStatusPanel from "../components/layout/HazardStatusPanel";
import RealTimeHazard from "../components/layout/RealtimeHazard";
import HazardReportButton from "../components/common/HazardReportButton";
import HazardDeleteButton from "../components/common/HazardDeleteButton";

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/hazards/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error("Дата татахад алдаа гарлаа:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="text-center mt-20">Уншиж байна...</div>;

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-20 relative font-roboto">
      <UserHeader />
      <div className="py-4 px-3 space-y-4">
        {/* Датаг UserPanel-руу дамжуулна */}
        <UserPanel
          profile={dashboardData?.summary?.profile}
          stats={dashboardData?.summary}
        />
        <hr className="border-b-ololt-rgbgreen border-1" />

        {/* Статус болон Жагсаалт руу дата дамжуулах */}
        <HazardStatusPanel stats={dashboardData?.summary?.byStatus} />
        <hr className="border-b-ololt-rgbgreen border-1" />
        <RealTimeHazard hazards={dashboardData?.data} />

        <div className="flex gap-4">
          <HazardReportButton />
          <HazardDeleteButton />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
