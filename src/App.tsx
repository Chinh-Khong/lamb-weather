import React, { useState, useEffect } from "react";
import HeaderWeather from './components/header-weather/Header.tsx';
import WeatherCity from './components/weather-city/WeatherCity.tsx';
import HourlyWeather from './components/hourly-weather/HourlyWeather.tsx';
import WeatherSession from './components/weather-session/WeatherSession.tsx';
import WeatherDays from './components/weather-days/WeatherDays.tsx';
import RainfallChart from './components/rainfall-chart/RainfallChart.tsx';
import WeatherAirPollution from './components/weather-airpollution/WeatherAirPollution.tsx';
import "./App.css";

const App = () => {
  const APIKey = "7a7cd355202c6439978c3c98b07dda6a";
  const [dataWeather, setDataWeather] = useState(null);
  const [error, setError] = useState(null);
  const [dataForecast, setDataForecast] = useState(null);
  const [airPollutionData, setAirPollutionData] = useState(null);
  const [city, setCity] = useState('new york');
  const [debouncedCity, setDebouncedCity] = useState(city);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedCity(city);
    }, 500); 

    return () => clearTimeout(timeoutId); 
  }, [city]);

  useEffect(() => {
    if (debouncedCity) {
      callAPIWeather(debouncedCity);
    }
  }, [debouncedCity]);

  const callAPIWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      setError("Vui lòng nhập tên thành phố!");
      setDataWeather(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric&lang=en`
      );
      const responseForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=metric&lang=en`
      );
      if (!response.ok || !responseForecast.ok) throw new Error("Weather data cannot be taken !");

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

  useEffect(() => {
    if (dataWeather && dataWeather.coord) {
      callAirPollutionData(dataWeather.coord.lat, dataWeather.coord.lon);
    }
  }, [dataWeather]);

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

  const _renderSunInfor = () => {
    return (
      <div
        className="sun-info-container"
        style={{ backgroundImage: "url('/image/bg-sunrise-sunset.png')" }}>
        <h2 className="sun-info-title">Sunrise / Sunset</h2>
        {dataWeather && (
          <div className="sun-info-time">
            <p>{formatTime(dataWeather.sys.sunrise)} AM</p>
            <p>{formatTime(dataWeather.sys.sunset)} PM</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full">
      <HeaderWeather callAPIWeather={callAPIWeather} />
      <div
        className="weather-container"
        style={{ backgroundImage: "url('/image/bg-home-lancapse.jpg')" }}
      >
        <WeatherCity dataWeather={dataWeather} />
        <WeatherSession
          dataWeather={dataWeather}
          dataForecast={dataForecast}
        />
      </div>

      <div className="forecast-container">
        <div className="forecast-content">
          <HourlyWeather hourlyForecast={dataForecast} />
          <WeatherDays
            dataWeather={dataForecast}
            nameCity={dataWeather && dataWeather.name}
          />
        </div>
        <div className="infor-container">
          {_renderSunInfor()}
          <WeatherAirPollution airPollutionData={airPollutionData} />
        </div>
      </div>

      <div className="rainfall-container" style={{ backgroundImage: "url('/image/bg-home-lancapse.jpg')" }}
      >
        {dataForecast && <RainfallChart hourlyForecast={dataForecast} />}
      </div>
    </div>
  );
}

export default App;
