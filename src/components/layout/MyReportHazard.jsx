import { CircleX, CircleCheck, Eraser, LoaderCircle } from "lucide-react";

const MyReportHazard = ({ total, stats }) => {
  // Backend-ээс ирж буй summary.byStatus объектыг ашиглана
  // Хэрэв өгөгдөл ирээгүй бол 0 гэж харуулна
  const pending = stats?.["Хүлээгдэж буй"] || 0;
  const declined = stats?.["Цуцалсан"] || 0;
  const accepted = stats?.["Баталсан"] || 0;
  const resolved = stats?.["Арилгасан"] || 0;

  return (
    <div className="space-y-1 flex-1">
      <p className="text-[12px] font-medium">
        Миний мэдээлсэн аюул: {total || 0}
      </p>

      <div className="grid grid-cols-2 gap-2">
        {/* 1. Хүлээгдэж буй */}
        <div className="bg-ololt-orange text-white text-[10px] py-2 rounded-xl text-center flex flex-col justify-center min-h-[45px]">
          <div className="text-[11px]">Хүлээгдэж буй</div>
          <div className="flex justify-center items-center text-lg font-bold">
            <LoaderCircle
              className="w-5 animate-spin"
              style={{ animationDuration: "3s" }}
            />
            <p className="text-xl px-0.5">{pending}</p>
          </div>
        </div>

        {/* 2. Цуцалсан */}
        <div className="bg-red-600 text-white text-[10px] py-2 rounded-xl text-center flex flex-col justify-center min-h-[45px]">
          <div className="text-[11px]">Цуцалсан</div>
          <div className="flex justify-center items-center text-lg font-bold">
            <CircleX className="w-5 pr-1" />
            <p className="text-xl">{declined}</p>
          </div>
        </div>

        {/* 3. Баталсан */}
        <div className="bg-ololt-rgbgreen text-white text-[10px] py-2 rounded-xl text-center flex flex-col justify-center min-h-[45px]">
          <div className="text-[11px]">Баталсан</div>
          <div className="flex justify-center items-center text-lg font-bold">
            <CircleCheck className="w-5 pr-1" />
            <p className="text-xl">{accepted}</p>
          </div>
        </div>

        {/* 4. Арилгасан */}
        <div className="bg-blue-500 text-white text-[10px] py-2 rounded-xl text-center flex flex-col justify-center min-h-[45px]">
          <div className="text-[11px]">Арилгасан</div>
          <div className="flex justify-center items-center text-lg font-bold">
            <Eraser className="w-5 pr-1" />
            <p className="text-xl">{resolved}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReportHazard;
