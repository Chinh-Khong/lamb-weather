import { ClockCircleOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "./Header.css";

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
    <div className="header-container">
      <div className= "header-content">
        <img
          src="./image/weather-logo.png"
          width={45}
          height={45}
        />
        <div className="search-container">
          <input
            placeholder="Tìm kiếm"
            className="search-bar"
            onChange={(e: any) => setSearchData(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                callAPIWeather(searchData);
              }
            }}
          />
          <div className="search-button">
            <div
              className="button"
              onClick={() => callAPIWeather(searchData)}
            >
              <SearchOutlined style={{ color: 'white', fontWeight: '600' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="clock-container">
        <span className="clock"><ClockCircleOutlined /> Local time:</span>
        <div className="clock-detail">
          <span className="time-display">
            {currentTime.format('HH:mm:ss')}
          </span>
          <span className="date-display">
            {currentTime.format('DD/MM/YYYY')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeaderWeather;