import { TriangleAlert } from 'lucide-react';

const HazardReportHeader = () => (
  <div className="flex items-center justify-center bg-ololt-rgbgreen p-3 shadow-md">
    <div className="flex items-center gap-2"> {/* Gap ашиглавал зай нь илүү жигд байна */}
      <TriangleAlert className='text-white w-6 h-6' strokeWidth={2} />
      <h1 className="text-white text-md font-condensed uppercase">
        Аюулыг мэдээлэх хуудас
      </h1>
    </div>
  </div>
);

export default HazardReportHeader;