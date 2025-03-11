import dayjs from "dayjs";
import React from "react";

interface Props {
  dataWeather: any;
}

const WeatherCity = (props: Props) => {
  const { dataWeather } = props;
  
  return (
    <div className='p-5 flex flex-col gap-4 text-[#18211e] md:min-w-[550px] md:max-w-[550px] shadow-xl rounded-[12px] border border-gray-300 bg-white'>
      <p className='font-bold text-[20px] hover:text-[#098d4b]'>Dự báo thời tiết {dataWeather && dataWeather.name}</p>
      <p>Hôm nay, {dayjs().format("DD/MM/YYYY")}</p>
      {dataWeather ?
        (
          <div className='flex flex-col gap-4'>
            <div>
              <div className='flex flex-row gap-6 items-center'>
                <img
                  src={`http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}@2x.png`}
                  alt="weather icon"
                  width={78}
                  height={78}
                />
                <p className="text-[54px] font-bold">{dataWeather.main.temp}°</p>
                <div className='flex flex-col'>
                  <p className="font-bold text-[18px]">{dataWeather.weather[0].description}</p>
                  <p className="text-[#098d4be6]">Cảm giác như {dataWeather.main.feels_like}°C</p>
                </div>
              </div>
            </div>
            <hr className="text-gray-300"></hr>
            <div className="w-full overflow-x-auto sm:overflow-hidden">
              <div className="w-full inline-grid grid-cols-5 md:gap-10 gap-15 justify-between whitespace-nowrap">
                {[
                  { label: "Thấp/Cao", value: `${Math.round(dataWeather.main?.temp_min)}°C / ${Math.round(dataWeather.main?.temp_max)}°C`, url: "./image/thermometer.png" },
                  { label: "Độ ẩm", value: `${dataWeather.main?.humidity}%`, url: "./image/humidity.png" },
                  { label: "Áp suất", value: `${dataWeather.main?.pressure} hPa`, url: "./image/gauge.png" },
                  { label: "Tầm nhìn", value: `${dataWeather.visibility ? dataWeather.visibility / 1000 : "-"} km`, url: "./image/view.png" },
                  { label: "Gió", value: `${dataWeather.wind?.speed} km/h`, url: "./image/wind.png" },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col gap-1 md:min-w-[80px] min-w-[50px]">
                    <img src={item.url} width={20} height={20} alt={item.label} />
                    <p className="font-[600] text-[14px]">{item.label}</p>
                    <p className="text-[14px] font-[500]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (<p>Không có dữ liệu</p>)}
    </div >
  );
}
export default WeatherCity;