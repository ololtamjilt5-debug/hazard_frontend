
const StatCard = ({ label, count, bgColor }) => (
  <div className={`${bgColor} p-3 rounded-xl text-white flex flex-col items-center justify-center w-full shadow-sm`}>
    <p className="text-[10px] text-center font-condensed leading-tight uppercase">{label}</p>
    <p className="text-4xl font-bold font-roboto">{count}</p>
  </div>
);

export default StatCard;