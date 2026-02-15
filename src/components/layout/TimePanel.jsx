const TimePanel = ({ selectedRange, onRangeChange }) => {
  const ranges = [
    { label: "24ц", value: "24h" },
    { label: "7 хоног", value: "7d" },
    { label: "Сар", value: "1m" },
    { label: "Улирал", value: "quarter" },
    { label: "1 жил", value: "1y" },
  ];

  return (
    <div className="bg-[#18252c] rounded-lg p-1 flex justify-between text-white text-[12px] font-condensed uppercase mb-1">
      {ranges.map((r) => (
        <button
          key={r.value}
          onClick={() => onRangeChange(r.value)}
          className={`px-3 py-1 rounded-md transition-all ${
            selectedRange === r.value
              ? "bg-white text-black shadow"
              : "text-white"
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
};

export default TimePanel;
