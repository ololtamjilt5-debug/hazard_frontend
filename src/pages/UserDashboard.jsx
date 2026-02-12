
import UserHeader from "../components/layout/UserHeader";
import UserPanel from "../components/layout/UserPanel";
import HazardStatusPanel from "../components/layout/HazardStatusPanel";
import RealTimeHazard from "../components/layout/RealtimeHazard";
import HazardReportButton from "../components/common/HazardReportButton";
import HazardDeleteButton from "../components/common/HazardDeleteButton";


const UserDashboard = () => {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-20 relative font-roboto">
      
      <UserHeader/>

      <div className="py-4 px-3 space-y-4">
      
      <UserPanel/>

        <hr className="border-b-ololt-rgbgreen border-1" />

      
      <HazardStatusPanel/>
        <hr className="border-b-ololt-rgbgreen border-1" />
      <RealTimeHazard/>  

        
        <div className="flex gap-4">
          <HazardReportButton/>

          <HazardDeleteButton/>       
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;