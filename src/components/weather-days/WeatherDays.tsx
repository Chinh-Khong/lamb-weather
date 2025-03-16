import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import React from "react";

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
      label: "Thấp/Cao",
      value: `${Math.round(day.minTemp)}°C / ${Math.round(day.maxTemp)}°C`,
      url: "./image/thermometer.png",
    },
    {
      label: "Độ ẩm",
      value: `${day.humidity}%`,
      url: "./image/humidity.png",
    },
    {
      label: "Áp suất",
      value: `${day.pressure ? day.pressure : "-"} hPa`, 
      url: "./image/gauge.png",
    },
    {
      label: "Tầm nhìn",
      value: `${day.visibility ? day.visibility / 1000 : "-"} km`, 
      url: "./image/view.png",
    },
    {
      label: "Gió",
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
  console.log(dataWeather, 'chinh132');
  if (!dataWeather) return null;

  const fiveDayForecast = processForecastData(dataWeather);
  const _renderItemsDrop = (day: any) => {
    return (
      <div className="w-full">
        <div className="grid md:grid-cols-5 grid-cols-3 gap-3 whitespace-nowrap justify-between items-center">
          {WEATHER_STATS(day).map((item, index) => (
            <div key={index} className="flex gap-3 items-center">
              <img className="md:w-[20px] md:h-[30px] w-[20px] h-[20px]" src={item.url} width={20} height={30} alt={item.label} />
              <div>
                <p className="text-[14px] font-[600]">{item.label}</p>
                <p className="text-gray-600">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2 w-full rounded-lg border border-gray-200 shadow-lg">
      <p className="p-4 border-b border-gray-200 font-bold text-[18px]">
        Dự báo thời tiết {nameCity} những ngày tới
      </p>
      {fiveDayForecast.map((day, index) => (
        <Dropdown
          key={index}
          menu={{ items: [{ label: _renderItemsDrop(day), key: `${index}` }] }}
          trigger={["click"]}
        >
          <div className="py-5 px-4 border-b border-gray-100 flex justify-between text-[15px] cursor-pointer">
            <div className="flex flex-row gap-8">
              <p className="font-[600] text-[#18211e]">{day.date}</p>
              <p className="text-[#18211ee6]">{Math.round(day.minTemp)}/{Math.round(day.maxTemp)}°C</p>
              <div className="flex flex-row gap-2 items-center">
                <img src={`https://openweathermap.org/img/wn/${day.icon}.png`} alt={day.description} width={30} />
                <p className="text-[#18211ee6]">{day.description}</p>
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
