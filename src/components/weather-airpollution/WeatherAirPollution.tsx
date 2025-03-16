import React from "react";
interface Props {
  airPollutionData: any
}
const WeatherAirPollution = (props: Props) => {
  const { airPollutionData } = props;
  if (!airPollutionData || !airPollutionData.list || airPollutionData.list.length === 0) {
    return <p>Chưa có dữ liệu chất lượng không khí...</p>;
  }

  const aqi = airPollutionData.list[0].main.aqi;
  const components = airPollutionData.list[0].components;

  let aqiDescription = '';
  let aqiClass = '';

  switch (aqi) {
    case 1:
      aqiDescription = 'Tốt';
      aqiClass = 'text-green-500';
      break;
    case 2:
      aqiDescription = 'Khá';
      aqiClass = 'text-yellow-500';
      break;
    case 3:
      aqiDescription = 'Trung bình';
      aqiClass = 'text-orange-500';
      break;
    case 4:
      aqiDescription = 'Xấu';
      aqiClass = 'text-red-500';
      break;
    case 5:
      aqiDescription = 'Rất xấu';
      aqiClass = 'text-purple-700';
      break;
    default:
      aqiDescription = 'Chưa xác định';
      aqiClass = 'text-gray-500';
  }

  return (
    <div className='rounded-lg shadow-md text-black border border-gray-200'>
      <h3 className="text-xl font-bold p-4 border-b border-gray-200">Chỉ số chất lượng không khí (AQI): <span className={`${aqiClass}`}>{aqiDescription}</span></h3>
      <ul className="p-4">
        <li><span className="mr-2 min-w-[40px] font-[500]">CO:</span> {components.co} µg/m³</li>
        <li><span className="mr-2 min-w-[40px] font-[500]">NO:</span> {components.no} µg/m³</li>
        <li><span className="mr-2 min-w-[40px] font-[500]">NO2:</span> {components.no2} µg/m³</li>
        <li><span className="mr-2 min-w-[40px] font-[500]">O3:</span> {components.o3} µg/m³</li>
        <li><span className="mr-2 min-w-[40px] font-[500]">SO2:</span> {components.so2} µg/m³</li>
        <li><span className="mr-2 min-w-[40px] font-[500]">PM2.5:</span> {components.pm2_5} µg/m³</li>
        <li><span className="mr-2 min-w-[40px] font-[500]">PM10:</span> {components.pm10} µg/m³</li>
      </ul>
    </div>
  );
};
export default WeatherAirPollution;