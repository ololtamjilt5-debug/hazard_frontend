import AllLoadHazard from "../hazard/AllLoadHazard";
import AllRemoveHazard from "../hazard/AllRemoveHazard";
import AllReportHazard from "../hazard/AllReportHazard";

const AllHazard = () => (
    <>
    <div className="grid grid-cols-3 gap-3">
      <AllReportHazard/>
      <AllLoadHazard/>
      <AllRemoveHazard/>      
    </div>
    </>
);

export default AllHazard;