import HazardListItem from "../hazard/HazardListItem";

const RealTimeHazard = ({ hazards, currentPage, onPageChange }) => {
  const limit = 5;
  const total = hazards?.length || 0;

  // 1. Хугацаагаар эрэмбэлэх (Хамгийн сүүлийнх нь эхэндээ)
  // created_at утгыг Date объект болгож хөрвүүлэн харьцуулна
  const sortedHazards = hazards
    ? [...hazards].sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
      })
    : [];

  const totalPages = Math.ceil(total / limit) || 1;

  // 2. Эрэмбэлэгдсэн датаг хуудсаар таслах
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const currentHazards = sortedHazards.slice(startIndex, endIndex);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <div className="space-y-3">
        {currentHazards.map((item) => (
          <HazardListItem
            key={item.id}
            id={item.id} // ID-г энд дамжуулна
            userName={`${item.reporter?.first_name} ${item.reporter?.last_name}`}
            description={item.description}
            userImage={item.reporter?.user_image}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 text-sm font-medium mt-6 mb-4">
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={`transition-colors ${currentPage === 1 ? "text-gray-300" : "text-black font-bold"}`}
          >
            Өмнөх
          </button>

          <div className="flex gap-2 items-center">
            {pages.map((num) => (
              <span
                key={num}
                onClick={() => onPageChange(num)}
                className={`cursor-pointer px-2 py-1 rounded-md transition-all ${
                  currentPage === num
                    ? "bg-ololt-rgbgreen text-white"
                    : "hover:text-ololt-rgbgreen"
                }`}
              >
                {num}
              </span>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className={`transition-colors ${currentPage === totalPages ? "text-gray-300" : "text-black font-bold"}`}
          >
            Дараах
          </button>
        </div>
      )}
    </>
  );
};

export default RealTimeHazard;
