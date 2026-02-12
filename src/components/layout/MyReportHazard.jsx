import { CircleX } from 'lucide-react';
import { CircleCheck } from 'lucide-react';
import { Eraser } from 'lucide-react';
import { LoaderCircle } from 'lucide-react';

const MyReportHazard = () => (
    <div className="space-y-1 flex-1">
      <p className="text-[12px] font-medium">Миний мэдээлсэн аюул: 30</p>
      
      <div className="grid grid-cols-2 gap-2"> {/* 4-ийг 2 болгож, зайг нь бага зэрэг ихэсгэв */}
  
        {/* 1. Хүлээгдэж буй */}
        <div className="bg-ololt-orange text-white text-[10px] py-2 rounded-xl text-center flex flex-col justify-center min-h-[45px]">
            <div className="text-[11px]">Хүлээгдэж буй</div>
            <div className="flex justify-center items-center text-lg font-bold">
                <LoaderCircle className="w-6 animate-spin" 
                style={{ animationDuration: '5s' }} // 3 секундэд нэг эргэнэ
                />
                <p className='text-xl px-0.5'>5</p>
            </div>
        </div>

        {/* 2. Цуцалсан */}
        <div className="bg-red-600 text-white text-[10px] py-2 rounded-xl text-center flex flex-col justify-center min-h-[45px]">
            <div className="text-[11px]">Цуцалсан</div>
            <div className="flex justify-center items-center text-lg font-bold">
                <CircleX  className='w-6 pr-1'/>
                <p className='text-xl'>5</p>
            </div>
        </div>

        {/* 3. Баталсан */}
        <div className="bg-ololt-rgbgreen text-white text-[10px] py-2 rounded-xl text-center flex flex-col justify-center min-h-[45px]">
            <div className="text-[11px]">Баталсан</div>
            <div className="flex justify-center items-center text-lg font-bold">
                <CircleCheck  className='w-6 pr-1'/>
                <p className='text-xl'>25</p>
            </div>
        </div>

        {/* 4. Арилсан */}
        <div className="bg-blue-500 text-white text-[10px] py-2 rounded-xl text-center flex flex-col justify-center min-h-[45px]">
            <div className="text-[11px]">Арилгасан</div>
            <div className="flex justify-center items-center text-lg font-bold">
                <Eraser  className='w-6 pr-1'/>
                <p className='text-xl'>20</p>
            </div>
        </div>
        </div>
    </div>
);

export default MyReportHazard;