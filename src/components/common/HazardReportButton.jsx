import { useNavigate } from "react-router-dom";

const HazardReportButton = () => {
  const navigate = useNavigate(); // Next.js-ийн useRouter биш useNavigate ашиглана

  const handleNavigation = () => {
    navigate("/HazardReport");
  };

  return (
    <button
      onClick={handleNavigation}
      className="flex-1 bg-ololt-rgbgreen text-white py-4 rounded-xl text-[11px] font-bold uppercase leading-none shadow-lg"
    >
      Аюулыг мэдээллэх
    </button>
  );
};

export default HazardReportButton;
