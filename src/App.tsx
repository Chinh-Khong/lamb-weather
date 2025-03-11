import dayjs from 'dayjs';
import HeaderWeather from './components/header-weather/Header.tsx';
import React from "react";
import { useState, useEffect } from "react";
import WeatherCity from './components/weather-city/WeatherCity.tsx';

const App = () => {
  const APIKey = "7a7cd355202c6439978c3c98b07dda6a";
  const [city, setCity] = useState("");
  const [dataWeather, setDataWeather] = useState(null);
  const [error, setError] = useState(null);
  const [dataForecast, setDataForecast] = useState(null);

  useEffect(() => {
    callAPIWeather('Hà Nội')
  }, [])
  const callAPIWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      setError("Vui lòng nhập tên thành phố!");
      setDataWeather(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric&lang=vi`
      );
      const responseForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=metric&lang=vi`
      );
      if (!response.ok || !responseForecast.ok) throw new Error("Không thể lấy dữ liệu thời tiết!");

      const data = await response.json();
      const dataForecast = await responseForecast.json();
      console.log(dataForecast, 'chinh')
      setDataWeather(data);
      setDataForecast(dataForecast);

      setError(null);
    } catch (error: any) {
      setError(error.message);
      setDataWeather(null);
      setDataForecast(null);
    }
  };

  const getGroupedForecast = () => {
    if (!dataForecast) return null;

    const groupedData = {
      morning: null,
      noon: null,
      afternoon: null,
      night: null
    };

    dataForecast.list.forEach((item: any) => {
      const hour = dayjs(item.dt_txt).hour();

      if (hour >= 6 && hour < 12) groupedData.morning = item;
      else if (hour >= 12 && hour < 16) groupedData.noon = item;
      else if (hour >= 16 && hour < 19) groupedData.afternoon = item;
      else if (hour >= 19 && hour <= 23) groupedData.night = item;
    });

    return groupedData;
  };

  const _renderDailyWeather = () => {
    const forecast = getGroupedForecast();

    return (
      <div className='pt-5 pb-16 md:px-10 w-full px-[15px] flex flex-col gap-4 text-[#003870] max-w-[550px] shadow-xl rounded-[12px] border border-gray-300 bg-white'>
        <p className='font-bold text-[20px] hover:text-[#098d4b]'>Nhiệt độ {dataWeather && dataWeather.name}</p>
        <div className='inline-grid md:grid-cols-4 grid-cols-2 gap-[8px]'>
          {forecast && Object.entries(forecast).map(([time, data]: any, index) => (
            <div key={index} className='flex flex-col justify-between items-center gap-4 border-r-1 border-gray-100 pr-2'>
              <p className='font-[600] text-[22px]'>{time === "morning" ? "Sáng" : time === "noon" ? "Trưa" : time === "afternoon" ? "Chiều" : "Tối"}</p>
              <img
                src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                alt="weather icon"
                width={87}
                height={87}
              />
              <p className="text-[18px] font-[400]">{data ? `${Math.round(data.main.temp_min)}° / ${Math.round(data.main.temp_max)}°` : "N/A"}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const _renderWeatherHourl = () => (
    <div className='w-full md:px-50 p-4 bg-[#cbf2e2]'>
      <div className="md:w-[70%] w-full p-4 rounded-xl bg-white">
        <p className="font-600 text-[18px]">Dự báo thời tiết Hà Nội những ngày tới</p>
        <div className="flex flex-row justify-between items-center py-3 border-b-1 border-[#999999]">
          <div className="flex flex-row gap-4 items-center">
            <p>Hôm nay</p>
            <p>18 ddooj / 24 độ</p>
            <div className="flex flex-row gap-2 items-center">
              <p>img</p>
              <p>Nắng đẹp</p>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <p>% mưa</p>
            <p>Sức gió</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App w-full h-full">
      <HeaderWeather callAPIWeather={callAPIWeather} />
      <div className='w-full bg-[#82b6e9] h-12 shadow-lg'></div>
      <div
        className='bg-cover bg-center bg-no-repeat pt-10 pb-16 flex flex-col md:flex-row justify-center items-center gap-9 px-2'
        style={{ backgroundImage: "url('/image/bg-home-lancapse.jpg')" }}
      >
        <WeatherCity dataWeather={dataWeather}/>
        {_renderDailyWeather()}
      </div>
      {_renderWeatherHourl()}

    </div>
  );
}

export default App;
