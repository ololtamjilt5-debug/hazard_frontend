import HazardListItem from "../hazard/HazardListItem"

const RealTimeHazard = () => (
    <>
{/* Hazard List */}
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <HazardListItem 
              key={i}
              userName="С.Лхагвасүрэн" 
              description="Оффисын үүдэнд ус асгарч хөлдсөн байна." 
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-3 text-sm font-medium">
          <button className="text-gray-500">Өмнөх</button>
          <div className="flex gap-2">
            <span>&lt;</span>
            <span className="cursor-pointer">1</span>
            <span className="cursor-pointer">2</span>
            <span className="cursor-pointer">3</span>
            <span className="cursor-pointer">4</span>
            <span className="cursor-pointer">5</span>
            <span>&gt;</span>
          </div>
          <button>Дараах</button>
        </div>
</>
);

export default RealTimeHazard;