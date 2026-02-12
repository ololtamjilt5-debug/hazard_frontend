
const HazardListItem = ({ userName, description }) => (
  <div className="border border-gray-300 rounded-xl p-3 flex gap-3 items-center bg-white shadow-sm">
    <div className="flex flex-col items-center min-w-[60px]">
      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-white text-xl">🦔</div>
      <p className="text-[10px] text-gray-00 mt-1">{userName}</p>
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-00 font-roboto line-clamp-2">{description}</p>
      <button className="text-[10px] font-bold float-right mt-1">Дэлгэрэнгүй ...</button>
    </div>
  </div>
);
export default HazardListItem;