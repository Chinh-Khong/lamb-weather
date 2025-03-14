import React from "react";

const HourlyWeather = ({ hourlyForecast }) => {
  // Đảm bảo forecastList luôn là một mảng
  const forecastList = Array.isArray(hourlyForecast) ? hourlyForecast : [];

  return (
    <div className="w-full md:px-50 p-4 bg-[#cbf2e2]">
      <div className="md:w-[70%] w-full p-4 rounded-xl bg-white">
        <p className="font-600 text-[18px]">Dự báo theo giờ</p>
        <div className="hourly-scroll flex flex-row gap-4 overflow-x-auto">
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
