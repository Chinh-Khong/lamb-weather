import { ClockCircleOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

interface Props {
  callAPIWeather: (cityName: string) => void;
}

const HeaderWeather = (props: Props) => {
  const { callAPIWeather } = props;
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [searchData, setSearchData] = useState("hanoi");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='w-full px-2 bg-[#098d4b] py-3 md:py-6 md:px-52 flex flex-row md:justify-between items-center gap-4'>
      <div className='flex flex-row md:gap-38 gap-3'>
        <img
          src="./image/weather-logo.png"
          width={45}
          height={45}
        />
        <div className='md:min-w-[500px] bg-[#ffffff14] rounded-md flex flex-row justify-between items-center'>
          <input
            placeholder="Tìm kiếm"
            className="bg-[#ffffff14] w-full h-full border-none px-4 placeholder-white focus:outline-none text-white rounded-md"
            onChange={(e: any) => setSearchData(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                callAPIWeather(searchData);
              }
            }}
          />
          <div className='px-2 bg-[#ffffff14] h-full flex justify-center items-center'>
            <div
              className='py-2 px-4 flex items-center justify-center cursor-pointer bg-[#098d4b] rounded-sm'
              onClick={() => callAPIWeather(searchData)}
            >
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