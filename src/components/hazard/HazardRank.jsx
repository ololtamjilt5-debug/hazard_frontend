import { useState } from 'react';

const HazardRank = () => {
  // 1. Төлөв (state)-ийг компонент дотор зарлах
  const [formData, setFormData] = useState({
    category: ""
  });

  // 2. Өөрчлөлтийг хянах функцыг дотор нь бичих
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Консол дээр сонгосон утгыг харах (шалгах зорилгоор)
    console.log("Сонгосон аюул:", value);
  };

  return (
    <div className="relative w-full max-w-md"> {/* max-w-md нь хэт өргөн болохоос сэргийлнэ */}
      <select 
        name="category"
        value={formData.category} 
        onChange={handleChange}
        className="block w-full appearance-none rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-ololt-rgbgreen sm:text-sm"
      >
        <option value="" disabled>Аюулын ангилал сонгох</option>
        <option value="fire">Гал түймэр</option>
        <option value="electric">Цахилгаан</option>
        <option value="other">Бусад</option>
      </select>
      
      {/* Сумны дүрс (баруун талд байрлах) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
        <svg className="fill-current h-6 w-6" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>

      {/* Сонгосон утгыг доор нь харуулах (туршиж үзэхэд хялбар болгох үүднээс) */}
      {formData.category && (
        <p className="mt-2 text-sm text-gray-600">
          Сонгосон: <span className="font-bold">{formData.category}</span>
        </p>
      )}
    </div>
  );
};

export default HazardRank;