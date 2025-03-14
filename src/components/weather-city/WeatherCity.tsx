import React from "react";
import dayjs from "dayjs";
import "./WeatherCity.css";

interface Props {
  dataWeather: any;
}
export const WEATHER_STATS = (dataWeather: any) => [
  {
    label: "Thấp/Cao",
    value: `${Math.round(dataWeather.main?.temp_min)}°C / ${Math.round(
      dataWeather.main?.temp_max
    )}°C`,
    url: "./image/thermometer.png",
  },
  {
    label: "Độ ẩm",
    value: `${dataWeather.main?.humidity}%`,
    url: "./image/humidity.png",
  },
  {
    label: "Áp suất",
    value: `${dataWeather.main?.pressure} hPa`,
    url: "./image/gauge.png",
  },
  {
    label: "Tầm nhìn",
    value: `${dataWeather.visibility ? dataWeather.visibility / 1000 : "-"} km`,
    url: "./image/view.png",
  },
  {
    label: "Gió",
    value: `${dataWeather.wind?.speed} km/h`,
    url: "./image/wind.png",
  },
];

const WeatherCity = (props: Props) => {
  const { dataWeather } = props;

  return (
    <div className="weather-city">
      <p className="city-name">Dự báo thời tiết {dataWeather && dataWeather.name}</p>
      <p>Hôm nay, {dayjs().format("DD/MM/YYYY")}</p>
      {dataWeather ? (
        <div className="weather-info">
          <div className="weather-details">
            <img
              src={`http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`}
              alt="weather icon"
              width={78}
              height={78}
            />
            <p className="temperature">{dataWeather.main.temp}°</p>
            <div className="weather-description">
              <p className="description">{dataWeather.weather[0].description}</p>
              <p className="feels-like">Cảm giác như {dataWeather.main.feels_like}°C</p>
            </div>
          </div>
          <hr className="separator" />
          <div className="weather-stats">
            <div className="stats-grid">
              {WEATHER_STATS(dataWeather).map((item, index) => (
                <div key={index} className="stat-item">
                  <img src={item.url} width={20} height={20} alt={item.label} />
                  <p className="stat-label">{item.label}</p>
                  <p className="stat-value">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </div>
  );
};

export default WeatherCity;