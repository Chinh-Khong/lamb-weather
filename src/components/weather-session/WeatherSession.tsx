import dayjs from "dayjs";
import React from "react";

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
    <div className='pt-5 pb-16 md:px-10 w-full px-[15px] flex flex-col gap-4 text-[#003870] max-w-[550px] shadow-xl rounded-[12px] border border-gray-300 bg-white'>
      <p className='font-bold text-[20px] hover:text-[#098d4b]'>
        Nhiệt độ {dataWeather && dataWeather.name}
      </p>
      <div className='inline-grid md:grid-cols-4 grid-cols-2 gap-[8px]'>
        {forecast &&
          Object.entries(forecast).map(([time, data]: any, index) => (
            <div
              key={index}
              className='flex flex-col justify-between items-center gap-4 border-r-1 border-gray-100 pr-2'
            >
              <p className='font-[600] text-[22px]'>
                {time === "morning"
                  ? "Sáng"
                  : time === "noon"
                    ? "Trưa"
                    : time === "afternoon"
                      ? "Chiều"
                      : "Tối"}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${data?.weather[0].icon}@2x.png`}
                alt="weather icon"
                width={87}
                height={87}
              />
              <p className="text-[18px] font-[400]">
                {data ? `${Math.round(data.main.temp_min)}° / ${Math.round(data.main.temp_max)}°` : "N/A"}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WeatherSession;