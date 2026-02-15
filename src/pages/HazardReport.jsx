import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import HazardReportHeader from "../components/layout/HazardReportHeader";
import ReportLocation from "../components/hazard/ReportLocation";
import HazardReportSendButton from "../components/common/HazardReportSendButton";

const HazardType = [
  "Гал түймэр",
  "Ажлын орчин",
  "Гар багаж",
  "Суурин тоног төхөөрөмж",
  "Хөдөлгөөнт тоног төхөөрөмж",
  "Гар ажиллагаа",
  "Материал түүхий эд",
  "Арга барил, үйлдэл",
  "Энергийн эх үүсвэр",
  "Байгаль цаг уур",
  "Гэрээтийн үйл ажиллагаа",
  "Бусад",
];
const HazardImpact = ["Хүнд", "Эд хөрөнгөд", "Байгаль орчинд"];
const HazardLevel = ["Маш их", "Их", "Дунд зэрэг", "Бага", "Маш бага"];

const HazardReport = () => {
  const navigate = useNavigate();
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // --- ШИНЭ: Илгээж буй төлөвийг хянах state ---
  const [isSending, setIsSending] = useState(false);

  const [formData, setFormData] = useState({
    location: "",
    type: "Бусад",
    description: "",
    impact: "Хүнд",
    level: "Дунд зэрэг",
    main_type: "Мэдээлсэн",
    status: "Хүлээгдэж буй",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      Swal.fire({
        icon: "success",
        title: "Зураг сонгогдлоо",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const handleSend = async () => {
    // 1. Хэрэв аль хэдийн илгээж байгаа бол функцийг шууд зогсооно
    if (isSending) return;

    if (!formData.location.trim() || !formData.description.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Анхаар!",
        text: "Байршил болон тайлбарыг заавал бөглөнө үү.",
        confirmButtonColor: "#10B981",
      });
      return;
    }

    // 2. Илгээх төлөвийг TRUE болгож товчийг түгжинэ
    setIsSending(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (selectedFile) data.append("image", selectedFile);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://hazard-hunter-api.onrender.com/hazards/create",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      Swal.fire({
        icon: "success",
        title: "Амжилттай!",
        text: "Аюул амжилттай мэдээлэгдлээ.",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => navigate("/UserDashboard"), 2000);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Алдаа!",
        text: err.response?.data?.message || "Алдаа гарлаа.",
        confirmButtonColor: "#EF4444",
      });
      // 3. Алдаа гарвал дахин илгээх боломжтой болгохын тулд FALSE болгоно
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-roboto pb-10">
      <HazardReportHeader />

      <div className="p-6 space-y-5 max-w-md mx-auto">
        {/* Нууц input-үүд */}
        <input
          type="file"
          ref={cameraInputRef}
          className="hidden"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
        />
        <input
          type="file"
          ref={galleryInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* Формын талбарууд (Location, Type, Description, Impact, Level) */}
        <div className="space-y-1">
          <label className="text-sm font-bold text-gray-700 ml-1">
            Байршил:
          </label>
          <ReportLocation
            value={formData.location}
            onChange={(val) => handleChange("location", val)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-gray-700 ml-1">
            Аюулын ангилал:
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange("type", e.target.value)}
            className="w-full bg-[#CCCCCC] p-4 rounded-md text-xl font-condensed outline-none appearance-none cursor-pointer"
          >
            {HazardType.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-gray-700 ml-1">
            Тайлбар:
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Дэлгэрэнгүй ..."
            rows={4}
            className="w-full bg-[#CCCCCC] p-4 rounded-md text-xl font-condensed placeholder:text-gray-600 focus:outline-none resize-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-gray-700 ml-1">
            Аюулын нөлөөлөл:
          </label>
          <select
            value={formData.impact}
            onChange={(e) => handleChange("impact", e.target.value)}
            className="w-full bg-[#CCCCCC] p-4 rounded-md text-xl font-condensed outline-none cursor-pointer"
          >
            {HazardImpact.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-gray-700 ml-1">
            Аюулын үнэлгээ:
          </label>
          <select
            value={formData.level}
            onChange={(e) => handleChange("level", e.target.value)}
            className="w-full bg-[#CCCCCC] p-4 rounded-md text-xl font-condensed outline-none cursor-pointer"
          >
            {HazardLevel.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Зураг сонгох хэсэг */}
        <div className="space-y-2">
          {previewUrl && (
            <div className="w-full h-40 bg-gray-100 rounded-md overflow-hidden border border-dashed border-gray-400">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => cameraInputRef.current.click()}
              className="bg-[#CCCCCC] p-4 rounded-md flex items-center justify-center gap-2 font-condensed text-lg active:bg-gray-400"
            >
              <span>📷</span> Зураг дарах
            </button>
            <button
              type="button"
              onClick={() => galleryInputRef.current.click()}
              className="bg-[#CCCCCC] p-4 rounded-md flex items-center justify-center gap-2 font-condensed text-lg active:bg-gray-400"
            >
              <span>☁️</span> Зураг оруулах
            </button>
          </div>
        </div>

        {/* ИЛГЭЭХ ТОВЧ */}
        <div
          className={`flex item-center justify-center pt-6 transition-all ${isSending ? "opacity-50 grayscale cursor-not-allowed" : "cursor-pointer"}`}
          onClick={handleSend}
        >
          {/* loading үед товчлуур дээр "Илгээж байна..." гэж харуулбал илүү гоё */}
          <div className="relative">
            <HazardReportSendButton />
            {isSending && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/20 rounded-xl">
                <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HazardReport;
