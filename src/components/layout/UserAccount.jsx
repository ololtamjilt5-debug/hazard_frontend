import profile from '../../assets/profile.jpg';

const UserAccount = () => (
  <div className="flex flex-col w-42 items-center text-center gap-2"> 
    {/* Профайл зураг */}
    
          <img className='w-20 h-20 rounded-full shadow-lg' src={profile} alt="" />

    {/* Текст мэдээллүүд */}
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold font-condensed">С.Лхагвасүрэн</h2>
      <p className="text-lg font-condensed text-gray-700 leading-tight">Уулын сургагч багш</p>
      <p className="mt-2 text-sm bg-ololt-rgbgreen px-3 py-1 rounded-full text-white">ID: 901205</p>
    </div>
  </div>
);

export default UserAccount;