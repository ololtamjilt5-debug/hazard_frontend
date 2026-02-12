import UserAccount from "./UserAccount";
import MyReportHazard from "./MyReportHazard";
import MyRemoveHazard from "./MyRemoveHazard";
import MyTaskHazard from "./MyTaskHazard";

const UserPanel = () => (
  <div className="flex gap-4 items-start"> 
    
    {/* Зүүн тал: Профайл хэсэг */}
    <UserAccount />
    <div className="space-y-1 flex-1">
    <MyReportHazard />

    <MyRemoveHazard />
    
     <MyTaskHazard />
    </div>
  </div>
);

export default UserPanel;