import { ClockCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Image } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const HeaderWeather = () => {
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-full px-2 bg-[#098d4b] py-3 md:py-6 md:px-50 flex flex-row md:justify-between items-center gap-4'>
      <div className='flex flex-row md:gap-38 gap-3'>
        <img
          src="./weather-logo.png"
          width={45}
          height={45}
        />
        <div className='md:min-w-[500px] bg-[#ffffff14] rounded-md flex flex-row justify-between items-center'>
          <input
            placeholder="Tìm kiếm"
            className='bg-[#ffffff14] w-full h-full border-none px-4 placeholder-white focus:outline-none text-white rounded-md'
          />

          <div className='px-2 bg-[#ffffff14] h-full flex justify-center items-center'>
            <div className='py-2 px-4 flex items-center justify-center cursor-pointer bg-[#098d4b] rounded-sm'>
              <SearchOutlined style={{ color: 'white', fontWeight: '600' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="text-white flex items-center gap-2">
        <span className="hidden sm:inline"><ClockCircleOutlined /> Giờ địa phương:</span>
        <div className="flex flex-col md:flex-row">
          <span className="font-semibold md:min-w-[65px]">
            {currentTime.format('HH:mm:ss')}
          </span>
          <span className="font-semibold">
            {currentTime.format('DD/MM/YYYY')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderWeather;