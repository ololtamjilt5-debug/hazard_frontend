import { useNavigate } from "react-router-dom";

const HazardListItem = ({ id, userName, description, userImage }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Хэрэглэгчийн зураг */}
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          <img
            src={userImage || "https://via.placeholder.com/150"}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <p className="text-[10px] text-gray-400 font-bold uppercase">
            {userName}
          </p>
          <p className="text-sm text-gray-700 line-clamp-2 leading-tight w-48">
            {description}
          </p>
        </div>
      </div>

      {/* Дэлгэрэнгүй товч */}
      <button
        onClick={() => navigate(`/HazardDetail/${id}`)}
        className="text-blue-600 text-xs font-bold underline whitespace-nowrap ml-2"
      >
        Дэлгэрэнгүй ...
      </button>
    </div>
  );
};

export default HazardListItem;
