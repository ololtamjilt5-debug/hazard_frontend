import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Link-ийн оронд useNavigate ашиглана
import logo from '../assets/logo.png';
import oLogo from '../assets/Ologo.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Шилжилт хийх функц

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Нэвтрэх өгөгдөл:", { email, password });
    
    // Энд логик шалгаад амжилттай бол шилжүүлнэ
    if(email && password) {
       navigate('/UserDashboard');
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-ololt-rgbgreen to-ololt-dark flex flex-col justify-center px-6 py-12 lg:px-8 font-roboto">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className='w-52 mx-auto'>
          <img src={logo} alt="Logo"/>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-4 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 font-condensed">
            Нэвтрэх
          </h2>
          <p className="mt-2 text-center text-sm text-gray-500">
            Тавтай морилно уу!
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                ID дугаар
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                  placeholder="123456"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Нууц үг
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-ololt-rgbgreen hover:text-blue-500 transition-colors">
                    Нууц үг сэргээх
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-xl bg-ololt-green px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-600 transition-colors uppercase tracking-wider font-condensed"
              >
                Нэвтрэх
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className='absolute bottom-10 left-0 right-0 flex justify-center items-center'>
        <img src={oLogo} alt="Company Logo" className='w-8'/>
        <p className='text-gray-50 pl-2 font-light text-[10px] opacity-80 uppercase tracking-tighter'>
          "ОЛОЛТ АМЖИЛТ" ХХК
        </p>
      </div>
    </div>
  );
};

export default LoginPage;