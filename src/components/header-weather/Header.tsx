import { ClockCircleOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import "./header.css";

interface Props {
  callAPIWeather: (cityName: string) => void;
}

const HeaderWeather = (props: Props) => {
  const { callAPIWeather } = props;
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [searchData, setSearchData] = useState("hanoi");
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const APIKey = "7a7cd355202c6439978c3c98b07dda6a";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchCitySuggestions = async (query: string) => {
    if (!query.trim()) {
      setCitySuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${APIKey}`
      );
      const data = await response.json();
      setCitySuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const handleSearch = () => {
    if (searchData.trim()) {
      callAPIWeather(searchData);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="header-container">
      <div className="header-content">
        <img
          src="./image/weather-logo.png"
          width={45}
          height={45}
          alt="Weather Logo"
        />
        <div className="search-container">
          <div className="search-city">
            <div className="search-content">
              <input
                placeholder="Tìm kiếm"
                className="custom-input"
                onChange={(e) => {
                  setSearchData(e.target.value);
                  fetchCitySuggestions(e.target.value);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              <div className="button-search">
                <div
                  className="button-click"
                  onClick={handleSearch}
                >
                  <SearchOutlined style={{ color: 'white', fontWeight: '600' }} />
                </div>
              </div>
            </div>
            {showSuggestions && citySuggestions.length > 0 && (
              <div className="custom-dropdown">
                {citySuggestions.map((city, index) => (
                  <div
                    key={index}
                    className="item-dropdown"
                    onClick={() => {
                      callAPIWeather(city.name);
                      setShowSuggestions(false);
                      setSearchData(city.name);
                    }}
                  >
                    {city.name}, {city.country}
                  </div>
                ))}
              </div>
            )}
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
