import React from "react";
import "./HourlyWeather.css";

const HourlyWeather = ({ hourlyForecast }) => {
  // Đảm bảo forecastList luôn là một mảng
  const forecastList = Array.isArray(hourlyForecast) ? hourlyForecast : [];

  return (
    <div className="hour-forecast-container">
      <div className="hour-content">
        <p className="title">Hourly forecast</p>
        <div className="hour-forecast-list">
          {forecastList.length > 0 ? (
            forecastList.slice(0, 8).map((hour, index) => {
              const formattedTime = hour.dt
                ? new Date(hour.dt * 1000).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
                : "N/A";
              const weatherIcon = hour.weather?.[0]?.icon ?? "01d"; // Icon mặc định
              const temperature = hour.main?.temp ? Math.round(hour.main.temp) : "N/A";
              const description = hour.weather?.[0]?.description ?? "Không có mô tả";

              return (
                <div key={index} className="hour-forecast-detail">
                  <p>{formattedTime}</p>
                  <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="Weather icon" />
                  <p>{temperature}°C</p>
                  <p>{description}</p>
                </div>
              );
            })
          ) : (
            <p>Không có dữ liệu dự báo</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HourlyWeather;
