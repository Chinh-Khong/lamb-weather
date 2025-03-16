import dayjs from "dayjs";
import React from "react";
import "./WeatherSession.css";

interface Props {
  dataWeather: any,
  dataForecast: any
}

const WeatherSession = (props: Props) => {
  const { dataWeather, dataForecast } = props;
  const getGroupedForecast = () => {
    if (!dataForecast) return null;

    const groupedData = {
      morning: null,
      noon: null,
      afternoon: null,
      night: null
    };

    dataForecast.forEach((item: any) => {
      const hour = dayjs(item.dt_txt).hour();

      if (hour >= 6 && hour < 12) groupedData.morning = item;
      else if (hour >= 12 && hour < 16) groupedData.noon = item;
      else if (hour >= 16 && hour < 19) groupedData.afternoon = item;
      else if (hour >= 19 && hour <= 23) groupedData.night = item;
    });

    return groupedData;
  };
  const forecast = getGroupedForecast();

  return (
    <div className="session-container">
      <p className="city-name">
         {dataWeather && dataWeather.name} temperature
      </p>
      <div className="session-content">
        {forecast &&
          Object.entries(forecast).map(([time, data]: any, index) => (
            <div
              key={index}
              className="session-detail"
            >
              <p className="title">
                {time === "morning"
                  ? "Morning"
                  : time === "midday"
                    ? "Midday"
                    : time === "afternoon"
                      ? "Afternoon "
                      : "Evening"}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                alt="weather icon"
                width={87}
                height={87}
              />
              <p className="session-temp">
                {data ? `${Math.round(data.main.temp_min)}° / ${Math.round(data.main.temp_max)}°` : "N/A"}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WeatherSession;