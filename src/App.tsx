import HeaderWeather from './components/header-weather/Header.tsx';
import React from "react";
import { useState, useEffect } from "react";
import WeatherCity from './components/weather-city/WeatherCity.tsx';
import HourlyWeather from './components/hourly-weather/HourlyWeather.tsx';
import WeatherSession from './components/weather-session/WeatherSession.tsx';
import WeatherDays from './components/weather-days/WeatherDays.tsx';
import RainfallChart from './components/rainfall-chart/RainfallChart.tsx';
import WeatherAirPollution from './components/weather-airpollution/WeatherAirPollution.tsx';

const App = () => {
  const APIKey = "7a7cd355202c6439978c3c98b07dda6a";
  const [dataWeather, setDataWeather] = useState(null);
  const [error, setError] = useState(null);
  const [dataForecast, setDataForecast] = useState(null);
  const [airPollutionData, setAirPollutionData] = useState(null);

  useEffect(() => {
    callAPIWeather('Hà Nội');
  }, []);

  useEffect(() => {
    if (dataWeather && dataWeather.coord) {
      callAirPollutionData(dataWeather.coord.lat, dataWeather.coord.lon);
    }
  }, [dataWeather]);

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
      setDataWeather(data);
      setDataForecast(dataForecast.list);
      setError(null);
    } catch (error) {
      setError(error.message);
      setDataWeather(null);
    }
  };

  const callAirPollutionData = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${APIKey}`
      );
      const airPollution = await response.json();
      setAirPollutionData(airPollution);
    } catch (error) {
      setError('Không thể lấy dữ liệu chất lượng không khí!');
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const _renderBinhMinh = () => {
    return (
      <div
        className="bg-red-500 p-8 bg-cover bg-center bg-no-repeat rounded-md flex flex-col gap-16 text-white"
        style={{ backgroundImage: "url('/image/bg-sunrise-sunset.png')" }}>
        <h2 className="text-xl font-bold">Bình minh / Hoàng hôn</h2>
        {dataWeather && (
          <div className="flex flex-row justify-between text-xl font-bold">
            <p>{formatTime(dataWeather.sys.sunrise)} AM</p>
            <p> {formatTime(dataWeather.sys.sunset)} PM</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="App w-full h-full">
      <HeaderWeather callAPIWeather={callAPIWeather} />
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
      <div className="flex flex-col md:flex-row gap-4 w-full md:px-48 md:py-8">
        <div className="flex flex-col gap-4 md:w-[70%] w-full">
          <HourlyWeather hourlyForecast={dataForecast} />
          <WeatherDays
            dataWeather={dataForecast}
            nameCity={dataWeather && dataWeather.name}
          />
        </div>
        <div className="md:w-40% flex flex-col gap-6">
          {_renderBinhMinh()}
          <WeatherAirPollution airPollutionData={airPollutionData} />
        </div>
      </div>
      <div className="container mx-auto p-4">
        {dataForecast && <RainfallChart hourlyForecast={dataForecast} />}

      </div>
    </div>
  );
}

export default App;
