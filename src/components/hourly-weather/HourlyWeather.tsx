import React from "react";

const HourlyWeather = ({ hourlyForecast }) => {
  // Đảm bảo forecastList luôn là một mảng
  const forecastList = Array.isArray(hourlyForecast) ? hourlyForecast : [];

  return (
    <div className="flex flex-col gap-2 w-full rounded-lg border border-gray-200 shadow-lg">
      <div className="w-full rounded-xl bg-white">
        <p className="p-4 border-b border-gray-200 font-bold text-[18px]">Dự báo theo giờ</p>
        <div className="hourly-scroll flex flex-row gap-4 overflow-x-auto p-4">
          {forecastList.length > 0 ? (
            forecastList.slice(0, 8).map((hour, index) => {
              const formattedTime = hour.dt
                ? new Date(hour.dt * 1000).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
                : "N/A";
              const weatherIcon = hour.weather?.[0]?.icon ?? "01d"; // Icon mặc định
              const temperature = hour.main?.temp ? Math.round(hour.main.temp) : "N/A";
              const description = hour.weather?.[0]?.description ?? "Không có mô tả";

              return (
                <div key={index} className="hourly-item flex flex-col items-center p-2 min-w-[100px]">
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
