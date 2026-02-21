import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ReportLocation from "../components/hazard/ReportLocation";
import { Loader2 } from "lucide-react"; // Loading spinner-т зориулж нэмэв

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

const API_BASE_URL = import.meta.env.VITE_API_URL;

const HazardRemove = () => {
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
    main_type: "Арилгасан",
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
    // 1. Давхар дарахаас хамгаална
    if (isSending) return;

    if (!formData.location.trim() || !formData.description.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Анхаар!",
        text: "Байршил болон арилгасан арга хэмжээг бөглөнө үү.",
        confirmButtonColor: "#2563EB",
      });
      return;
    }

    // 2. Илгээж эхэлснийг тэмдэглэнэ
    setIsSending(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    if (selectedFile) {
      data.append("image", selectedFile);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API_BASE_URL}/hazards/create`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Амжилттай!",
          text: "Аюулыг арилгасан мэдээлэл бүртгэгдлээ.",
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(() => navigate("/UserDashboard"), 2000);
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Алдаа!",
        text:
          err.response?.data?.message || "Сервер рүү илгээхэд алдаа гарлаа.",
        confirmButtonColor: "#EF4444",
      });
      // 3. Алдаа гарвал дахин илгээх боломжийг нээнэ
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-roboto pb-10">
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

      <div className="bg-blue-600 text-white p-4 flex items-center justify-center gap-2 shadow-md">
        <span className="text-xl">⚠️</span>
        <h1 className="text-lg font-bold uppercase tracking-wider">
          Аюулыг арилгах хуудас
        </h1>
      </div>

      <div className="p-6 space-y-5 max-w-md mx-auto">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
          <p className="text-blue-700 font-medium">
            Та арилгасан аюулынхаа мэдээллийг энд оруулна уу.
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-gray-700 ml-1">
            Арилгасан байршил:
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
            className="w-full bg-[#F3F4F6] p-4 rounded-md text-xl font-condensed outline-none border-b-2 border-blue-200 cursor-pointer"
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
            Арилгасан арга хэмжээ:
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Ямар арга хэмжээ авч арилгасан бэ? ..."
            rows={4}
            className="w-full bg-[#F3F4F6] p-4 rounded-md text-xl font-condensed focus:outline-none resize-none border-b-2 border-blue-200"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-gray-700 ml-1">
            Аюулын нөлөөлөл:
          </label>
          <select
            value={formData.impact}
            onChange={(e) => handleChange("impact", e.target.value)}
            className="w-full bg-[#F3F4F6] p-4 rounded-md text-xl font-condensed outline-none border-b-2 border-blue-200 cursor-pointer"
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
            className="w-full bg-[#F3F4F6] p-4 rounded-md text-xl font-condensed outline-none border-b-2 border-blue-200 cursor-pointer"
          >
            {HazardLevel.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {previewUrl && (
          <div className="w-full h-40 bg-gray-50 rounded-md overflow-hidden border border-dashed border-blue-300">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-2">
          <button
            type="button"
            onClick={() => cameraInputRef.current.click()}
            className="bg-blue-50 text-blue-600 p-4 rounded-md flex items-center justify-center gap-2 font-condensed text-lg border border-blue-200 active:bg-blue-100"
          >
            <span>📷</span> Дараах зураг
          </button>
          <button
            type="button"
            onClick={() => galleryInputRef.current.click()}
            className="bg-blue-50 text-blue-600 p-4 rounded-md flex items-center justify-center gap-2 font-condensed text-lg border border-blue-200 active:bg-blue-100"
          >
            <span>☁️</span> Галерей
          </button>
        </div>

        <div className="pt-6">
          <button
            onClick={handleSend}
            disabled={isSending}
            className={`w-full py-4 rounded-xl text-xl font-bold uppercase shadow-lg transition-all flex items-center justify-center gap-3 ${
              isSending
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 active:scale-95 hover:bg-blue-700"
            } text-white`}
          >
            {isSending ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                ТҮР ХҮЛЭЭНЭ ҮҮ...
              </>
            ) : (
              "БҮРТГЭХ"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HazardRemove;
