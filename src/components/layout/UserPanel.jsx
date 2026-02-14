import UserAccount from "./UserAccount";
import MyReportHazard from "./MyReportHazard";
import MyRemoveHazard from "./MyRemoveHazard";
import MyTaskHazard from "./MyTaskHazard";

const UserPanel = ({ profile, stats }) => (
  <div className="flex gap-4 items-start">
    <UserAccount profile={profile} />

    <div className="space-y-1 flex-1">
      {/* Нийт тоог 'total' нэрээр, 
         статусуудыг 'stats' нэрээр дамжуулна 
      */}
      <MyReportHazard total={stats?.reportedCount} stats={stats?.byStatus} />

      <MyRemoveHazard count={stats?.fixedCount} />
      <MyTaskHazard />
    </div>
  </div>
);

export default UserPanel;
