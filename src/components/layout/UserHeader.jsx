import { CircleUserRound } from 'lucide-react';

const UserHeader = () => (
  <div className="flex items-center justify-center bg-ololt-rgbgreen p-3 shadow-md">
    <div className="flex items-center gap-2"> {/* Gap ашиглавал зай нь илүү жигд байна */}
      <CircleUserRound className='text-white w-6 h-6' strokeWidth={1.5} />
      <h1 className="text-white text-lg font-condensed uppercase">
        Хэрэглэгчийн хэсэг
      </h1>
    </div>
  </div>
);

export default UserHeader;