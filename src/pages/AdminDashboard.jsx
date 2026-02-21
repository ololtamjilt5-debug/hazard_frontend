import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {
  ArrowLeft,
  UserPlus,
  UserCircle,
  KeyRound,
  Briefcase,
  ChevronRight,
  Loader2,
  Users,
  Building2,
  Trash2,
  Search,
  UserX,
  UserCheck,
  LockKeyhole,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [listLoading, setListLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("active");

  const [formData, setFormData] = useState({
    user_id: "",
    password: "",
    first_name: "",
    last_name: "",
    job: "Ажилтан",
    company: currentUser?.level === 3 ? currentUser?.company : "",
    user_level: currentUser?.level === 4 ? 3 : 1,
  });

  const fetchUsers = async () => {
    try {
      setListLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const rawUsers = res.data.map((u) => ({
        ...u,
        isActive: u.isActive !== false,
      }));
      let filtered = rawUsers;
      if (currentUser?.level === 4)
        filtered = rawUsers.filter((u) => u.user_level === 3);
      else if (currentUser?.level === 3)
        filtered = rawUsers.filter(
          (u) => u.company === currentUser.company && u.user_level < 3,
        );

      setUsers(filtered.sort((a, b) => b.id - a.id));
    } catch (err) {
      console.error("Алдаа гарлаа");
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    const match = `${u.first_name} ${u.last_name} ${u.user_id}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return match && (activeTab === "active" ? u.isActive : !u.isActive);
  });

  // --- НУУЦ ҮГ СОЛИХ ФУНКЦ ---
  const handleChangePassword = async (userId, userName) => {
    const { value: newPassword } = await Swal.fire({
      title: `${userName}-н нууц үг солих`,
      input: "password",
      inputLabel: "Шинэ нууц үг оруулна уу",
      inputPlaceholder: "Шинэ нууц үг...",
      showCancelButton: true,
      confirmButtonText: "Хадгалах",
      cancelButtonText: "Болих",
      inputAttributes: {
        minlength: 4,
        autocapitalize: "off",
        decorrect: "off",
      },
    });

    if (newPassword) {
      try {
        const token = localStorage.getItem("token");
        await axios.patch(
          `${API_BASE_URL}/users/${userId}/password`,
          { password: newPassword },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        Swal.fire("Амжилттай!", "Нууц үг шинэчлэгдлээ.", "success");
      } catch (err) {
        Swal.fire("Алдаа!", "Нууц үг солиход алдаа гарлаа.", "error");
      }
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    Swal.fire({
      title: "Итгэлтэй байна уу?",
      text: `${userName} хэрэглэгчийг хаах гэж байна!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Тийм, хаах!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`${API_BASE_URL}/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          Swal.fire("Хаагдлаа!", "", "success");
          fetchUsers();
        } catch (err) {
          Swal.fire("Алдаа!", "Алдаа гарлаа", "error");
        }
      }
    });
  };

  const getLevelBadge = (level) => {
    const colors = {
      4: "bg-purple-100 text-purple-700",
      3: "bg-blue-100 text-blue-700",
      2: "bg-orange-100 text-orange-700",
      1: "bg-gray-100 text-gray-700",
    };
    return colors[level] || colors[1];
  };

  return (
    <div className="min-h-screen bg-gray-50 font-roboto pb-20">
      <div className="bg-white px-4 py-4 flex items-center shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="ml-4 text-lg font-black text-gray-800 uppercase">
          Удирдлагын хэсэг
        </h1>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Registration Accordion */}
        <details className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden transition-all group">
          <summary className="list-none p-6 flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-50 p-3 rounded-2xl group-open:bg-indigo-600 group-open:text-white transition-colors">
                <UserPlus size={24} />
              </div>
              <h3 className="font-black text-gray-800 uppercase text-sm">
                Шинэ хэрэглэгч бүртгэх
              </h3>
            </div>
            <ChevronRight
              size={20}
              className="text-gray-400 group-open:rotate-90 transition-transform"
            />
          </summary>
          <div className="px-6 pb-6 pt-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                const token = localStorage.getItem("token");
                axios
                  .post(`${API_BASE_URL}/users/register`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then(() => {
                    Swal.fire("Амжилттай", "", "success");
                    fetchUsers();
                  })
                  .catch((err) =>
                    Swal.fire("Алдаа", err.response?.data?.message, "error"),
                  )
                  .finally(() => setLoading(false));
              }}
              className="space-y-4"
            >
              <div className="relative">
                <Building2
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                  size={18}
                />
                <input
                  type="text"
                  disabled={currentUser?.level === 3}
                  className={`w-full border py-3.5 pl-12 pr-4 rounded-xl font-bold ${currentUser?.level === 3 ? "bg-gray-100" : "bg-gray-50"}`}
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Овог"
                  className="bg-gray-50 border py-3.5 px-4 rounded-xl font-bold"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Нэр"
                  className="bg-gray-50 border py-3.5 px-4 rounded-xl font-bold"
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                />
              </div>
              <input
                type="text"
                placeholder="Албан тушаал"
                className="w-full bg-gray-50 border py-3.5 px-4 rounded-xl font-bold"
                value={formData.job}
                onChange={(e) =>
                  setFormData({ ...formData, job: e.target.value })
                }
              />
              {currentUser?.level === 4 && (
                <input
                  type="text"
                  placeholder="Нэвтрэх ID"
                  className="w-full bg-gray-50 border py-3.5 px-4 rounded-xl font-bold"
                  value={formData.user_id}
                  onChange={(e) =>
                    setFormData({ ...formData, user_id: e.target.value })
                  }
                />
              )}
              <input
                type="password"
                placeholder="Нууц үг"
                className="w-full bg-gray-50 border py-3.5 px-4 rounded-xl font-bold"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase"
              >
                {loading ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  "Бүртгэл дуусгах"
                )}
              </button>
            </form>
          </div>
        </details>

        {/* Search & Tabs */}
        <div className="space-y-4">
          <div className="sticky top-[72px] bg-gray-50 pt-2 z-40 space-y-3">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Нэр эсвэл ID..."
                className="w-full bg-white border py-4 pl-12 pr-4 rounded-2xl shadow-sm outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex bg-gray-200/50 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("active")}
                className={`flex-1 py-2.5 rounded-lg text-xs font-black transition-all ${activeTab === "active" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500"}`}
              >
                ИДЭВХТЭЙ
              </button>
              <button
                onClick={() => setActiveTab("inactive")}
                className={`flex-1 py-2.5 rounded-lg text-xs font-black transition-all ${activeTab === "inactive" ? "bg-white text-red-600 shadow-sm" : "text-gray-500"}`}
              >
                ХААГДСАН
              </button>
            </div>
          </div>

          {/* User List */}
          {listLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-gray-300" />
            </div>
          ) : (
            <div className="space-y-3">
              {filteredUsers.map((u) => (
                <div
                  key={u.id}
                  className={`bg-white p-4 rounded-[2rem] border shadow-sm flex items-center justify-between transition-all ${!u.isActive ? "opacity-75 bg-gray-50" : "hover:border-indigo-100"}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg border shadow-inner ${!u.isActive ? "bg-gray-200 text-gray-400" : "bg-indigo-50 text-indigo-500"}`}
                    >
                      {u.first_name?.charAt(0)}
                    </div>
                    <div className="space-y-1">
                      <h4
                        className={`font-bold text-sm ${!u.isActive ? "text-gray-500 line-through" : "text-gray-900"}`}
                      >
                        {u.last_name} {u.first_name}
                      </h4>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-md font-black">
                            ID: {u.user_id}
                          </span>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">
                            {u.job}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-indigo-500/70">
                          <Building2 size={12} />
                          <p className="text-[10px] font-bold uppercase">
                            {u.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div
                      className={`px-3 py-1 rounded-full text-[10px] font-black border ${!u.isActive ? "bg-gray-100 text-gray-400" : getLevelBadge(u.user_level)}`}
                    >
                      LVL {u.user_level}
                    </div>
                    <div className="flex gap-1">
                      {u.isActive && (
                        <button
                          onClick={() =>
                            handleChangePassword(u.id, u.first_name)
                          }
                          className="p-2 text-indigo-400 hover:bg-indigo-50 rounded-xl transition-all"
                          title="Нууц үг солих"
                        >
                          <LockKeyhole size={18} />
                        </button>
                      )}
                      {u.isActive && currentUser.user_id !== u.user_id && (
                        <button
                          onClick={() => handleDeleteUser(u.id, u.first_name)}
                          className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all"
                          title="Хаах"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
