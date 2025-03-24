import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import React from "react";
import "./WeatherDays.css";

interface Props {
  dataWeather: any;
  nameCity: string;
}

export const WEATHER_STATS = (day: any) => {
  if (!day) {
    return [];
  }

  return [
    {
      label: "Low/high",
      value: `${Math.round(day.minTemp)}°C / ${Math.round(day.maxTemp)}°C`,
      url: "./image/thermometer.png",
    },
    {
      label: "Humidity",
      value: `${day.humidity}%`,
      url: "./image/humidity.png",
    },
    {
      label: "Gauge",
      value: `${day.pressure ? day.pressure : "-"} hPa`, 
      url: "./image/gauge.png",
    },
    {
      label: "View",
      value: `${day.visibility ? day.visibility / 1000 : "-"} km`, 
      url: "./image/view.png",
    },
    {
      label: "Wind",
      value: `${day.windSpeed} km/h`,
      url: "./image/wind.png",
    },
  ];
};


const processForecastData = (dataForecast: any) => {
  if (!dataForecast || dataForecast.length === 0) return [];

  const dailyData: any = {};

  dataForecast.forEach((entry: any) => {
    const date = new Date(entry.dt * 1000).toLocaleDateString("vi-VN");
    if (!dailyData[date]) {
      dailyData[date] = {
        minTemp: entry.main.temp_min,
        maxTemp: entry.main.temp_max,
        description: entry.weather[0].description,
        icon: entry.weather[0].icon,
        humidity: entry.main.humidity,
        windSpeed: entry.wind.speed,
        pressure: entry.main.pressure, 
        visibility: entry.visibility,  
      };
    } else {
      dailyData[date].minTemp = Math.min(dailyData[date].minTemp, entry.main.temp_min);
      dailyData[date].maxTemp = Math.max(dailyData[date].maxTemp, entry.main.temp_max);
    }
  });

  return Object.entries(dailyData).slice(0, 6).map(([date, data]: any) => ({ date, ...data }));
};

const WeatherDays = (props: Props) => {
  const {dataWeather, nameCity} = props;
  if (!dataWeather) return null;

  const fiveDayForecast = processForecastData(dataWeather);
  const _renderItemsDrop = (day: any) => {
    return (
      <div className="w-full">
        <div className="day-list">
          {WEATHER_STATS(day).map((item, index) => (
            <div key={index} className="day-index">
              <img className="weather-icon" src={item.url} width={20} height={30} alt={item.label} />
              <div>
                <p className="label">{item.label}</p>
                <p className="value">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="day-forecast-container">
      <p className="title">
        Weather forecast for {nameCity} in the coming days
      </p>
      {fiveDayForecast.map((day, index) => (
        <Dropdown
          key={index}
          menu={{ items: [{ label: _renderItemsDrop(day), key: `${index}` }] }}
          trigger={["click"]}
        >
          <div className="day-forecast-content">
            <div className="day-forecast-detail">
              <p className="date">{day.date}</p>
              <p className="day-temp">{Math.round(day.minTemp)}/{Math.round(day.maxTemp)}°C</p>
              <div className="day-infor">
                <img src={`https://openweathermap.org/img/wn/${day.icon}.png`} alt={day.description} width={30} />
                <p className="day-weather">{day.description}</p>
              </div>
            </div>
            <DownOutlined className="cursor-pointer" />
          </div>
        </Dropdown>
      ))}
    </div>
  );
};

export default WeatherDays;
