import { useState } from 'react';
import HazardReportSendButton from '../components/common/HazardReportSendButton';
import HazardReportHeader from '../components/layout/HazardReportHeader';
import ReportLocation from '../components/hazard/ReportLocation';
import HazardRank from '../components/hazard/HazardRank';

const HazardReport = () => {
  // Өгөгдлүүдээ хадгалах state-үүд
  const [formData, setFormData] = useState({
    location: '',
    category: '',
    description: '',
    impact: '',
    rating: ''
  });

  // Утга өөрчлөгдөх үед ажиллах функц
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSend = () => {
    console.log("Илгээх өгөгдөл:", formData);
    // Энд API-руу өгөгдөл илгээх логик бичигдэнэ
    alert("Амжилттай илгээгдлээ!");
  };

  return (
    <div className="min-h-screen bg-white font-roboto">
      {/* Header */}
      <HazardReportHeader/>

      <div className="p-6 space-y-4 max-w-md mx-auto">
        
        {/* Байршил */}
        <ReportLocation/>

        {/* Аюулын ангилал */}
        <HazardRank/>

        {/* Дэлгэрэнгүй */}
        <div className="relative">
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Дэлгэрэнгүй ..." 
            rows={6}
            className="w-full bg-[#CCCCCC] p-4 rounded-md text-xl font-condensed placeholder:text-gray-600 focus:outline-none resize-none"
          />
          <button className="absolute bottom-4 left-4 text-red-500 text-sm hover:underline">
            🎤 Voice оруулах
          </button>
        </div>

        {/* Аюулын нөлөөлөл - Одоогоор статик байгаа тул ирээдүйд сонголт болгож болно */}
        <div className="bg-[#CCCCCC] p-4 rounded-md cursor-pointer active:bg-gray-400 transition-colors">
          <p className="text-xl font-condensed text-center">Аюулын нөлөөлөл /сонголтоор/</p>
          <p className="text-[10px] text-center text-gray-700">Хүн, Эд хөрөнгө, Байгаль орчин</p>
        </div>

        {/* Аюулын үнэлгээ */}
        <div className="bg-[#CCCCCC] p-4 rounded-md text-center text-xl font-condensed cursor-pointer active:bg-gray-400">
          Аюулын үнэлгээ /сонголтоор/
        </div>

        {/* Зураг авах хэсэг */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <button className="bg-[#CCCCCC] p-4 rounded-md flex items-center justify-center gap-2 font-condensed text-lg hover:bg-gray-400 transition-colors">
            <span>📷</span> Зураг дарах
          </button>
          <button className="bg-[#CCCCCC] p-4 rounded-md flex items-center justify-center gap-2 font-condensed text-lg hover:bg-gray-400 transition-colors">
            <span>☁️</span> Зураг оруулах
          </button>
        </div>

        {/* ИЛГЭЭХ */}
        <div className="flex item-center justify-center pt-8">
          <HazardReportSendButton/>
        </div>
      </div>
    </div>
  );
};

export default HazardReport;