import { useState } from "react";

const ReportLocation = ({ value, onChange }) => (
  <input
    type="text"
    value={value} // Parent-аас ирж буй утга
    onChange={(e) => onChange(e.target.value)} // Бичих бүрт Parent-руу дамжуулна
    placeholder="Байршил /цех, хэсэг/"
    className="w-full bg-[#CCCCCC] p-4 rounded-md text-xl font-condensed placeholder:text-gray-600 focus:outline-none"
  />
);

export default ReportLocation;
