import HeaderWeather from './components/header-weather/Header.tsx';
import React from "react";
import { useState, useEffect } from "react";
import WeatherCity from './components/weather-city/WeatherCity.tsx';
import HourlyWeather from './components/hourly-weather/HourlyWeather.tsx';
import WeatherSession from './components/weather-session/WeatherSession.tsx';
import WeatherDays from './components/weather-days/WeatherDays.tsx';

const App = () => {
  const APIKey = "7a7cd355202c6439978c3c98b07dda6a";
  const [city, setCity] = useState("");
  const [dataWeather, setDataWeather] = useState(null);
  const [error, setError] = useState(null);
  const [dataForecast, setDataForecast] = useState(null);
  console.log(dataForecast, 'chinht')
  useEffect(() => {
    callAPIWeather('Hà Nội');
  }, []);

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
      const resngafy = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=39.099724&lon=-94.578331&dt=1643803200&appid="97c384b07577b174d93727e571569e75"`
      );
      console.log(resngafy.json(), 'chinh89')
      if (!response.ok || !responseForecast.ok) throw new Error("Không thể lấy dữ liệu thời tiết!");

      const data = await response.json();
      const dataForecast = await responseForecast.json();

      setDataWeather(data);
      setDataForecast(dataForecast.list);

      setError(null);
    } catch (error) {
      setError(error.message);
      setDataWeather(null);
    }
  };

  const Select_Search = [
    { label: 'Hiện tại', value: '#' },
    { label: 'Theo giờ', value: '#' },
    { label: '3 ngày tới', value: '#' },
    { label: '5 ngày tới', value: '#' },
    { label: '7 ngày tới', value: '#' },
    { label: '10 ngày tới', value: '#' },
    { label: '15 ngày tới', value: '#' },
    { label: '20 ngày tới', value: '#' },
    { label: '30 ngày tới', value: '#' },
  ];

  const _renderNgafy = () => {
    return (
      <div className="w-full flex flex-row items-center justify-center gap-6 whitespace-nowrap">
        {Select_Search.map((item, index) => {
          return (
            <div key={index} className="bg-white py-2 px-3 rounded-lg flex items-center justify-center cursor-pointer">
              <p className="hover:text-[#65c997]">{item.label}</p>
            </div>
          );
        })}
      </div>
    );
  };


  return (
    <div className="App w-full h-full">
      <HeaderWeather callAPIWeather={callAPIWeather} />
      <div className='w-full bg-[#015e3f] p-3 shadow-lg flex items-center'>
        {_renderNgafy()}
      </div>
      <div
        className='bg-cover bg-center bg-no-repeat pt-10 pb-16 flex flex-col md:flex-row justify-center items-center gap-9 px-2'
        style={{ backgroundImage: "url('/image/bg-home-lancapse.jpg')" }}
      >
        <WeatherCity dataWeather={dataWeather} />
        <WeatherSession
          dataWeather={dataWeather}
          dataForecast={dataForecast}
        />
      </div>
      <HourlyWeather hourlyForecast={dataForecast} />
      <div className="flex flex-col md:flex-row gap-4 w-full md:px-48 md:py-8">
        <WeatherDays
          dataWeather={dataWeather}
        />
        <div className="md:w-40% bg-red-500">
          Chính
        </div>
      </div>
    </div>
  );
}

export default App;
