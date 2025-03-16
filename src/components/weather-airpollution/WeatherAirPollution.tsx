import React from "react";
import "./WeatherAirPollution.css"; // Import file CSS

interface Props {
  airPollutionData: any;
}

const WeatherAirPollution = (props: Props) => {
  const { airPollutionData } = props;
  if (!airPollutionData || !airPollutionData.list || airPollutionData.list.length === 0) {
    return <p>No air quality data ...</p>;
  }

  const aqi = airPollutionData.list[0].main.aqi;
  const components = airPollutionData.list[0].components;

  let aqiDescription = "";
  let aqiClass = "aqi-unknown";

  switch (aqi) {
    case 1:
      aqiDescription = "Good";
      aqiClass = "aqi-good";
      break;
    case 2:
      aqiDescription = "Fair";
      aqiClass = "aqi-fair";
      break;
    case 3:
      aqiDescription = "Moderate";
      aqiClass = "aqi-moderate";
      break;
    case 4:
      aqiDescription = "Poor";
      aqiClass = "aqi-poor";
      break;
    case 5:
      aqiDescription = "Very Poor";
      aqiClass = "aqi-very-poor";
      break;
  }

  return (
    <div className="air-pollution-container">
      <h3 className="air-pollution-header">
        Air quality index (AQI): <span className={aqiClass}>{aqiDescription}</span>
      </h3>
      <ul className="air-pollution-content">
        <li className="air-pollution-item"><span>CO:</span> {components.co} µg/m³</li>
        <li className="air-pollution-item"><span>NO:</span> {components.no} µg/m³</li>
        <li className="air-pollution-item"><span>NO2:</span> {components.no2} µg/m³</li>
        <li className="air-pollution-item"><span>O3:</span> {components.o3} µg/m³</li>
        <li className="air-pollution-item"><span>SO2:</span> {components.so2} µg/m³</li>
        <li className="air-pollution-item"><span>PM2.5:</span> {components.pm2_5} µg/m³</li>
        <li className="air-pollution-item"><span>PM10:</span> {components.pm10} µg/m³</li>
      </ul>
    </div>
  );
};

export default WeatherAirPollution;