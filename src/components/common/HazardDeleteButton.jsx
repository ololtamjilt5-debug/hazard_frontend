import { useNavigate } from "react-router-dom";

const HazardDeleteButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/HazardRemove")}
      className="flex-1 bg-blue-600 text-white py-4 rounded-xl text-[11px] font-bold uppercase leading-none shadow-lg"
    >
      Аюулыг арилгах
    </button>
  );
};

export default HazardDeleteButton;
