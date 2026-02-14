import { useState } from 'react';

const ReportLocation = () => {
  // Хувьсагчаа дотор нь зарлах
  const [formData, setFormData] = useState({ location: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <input 
      name="location"
      value={formData.location}
      onChange={handleChange}
      type="text" 
      placeholder="Байршил ..." 
      className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-ololt-rgbgreen sm:text-sm"
    />
  );
};

export default ReportLocation;