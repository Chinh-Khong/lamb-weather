import { DownOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import React from "react";
interface Props {
  dataWeather: any,
}
export const WEATHER_STATS = (dataWeather: any) => {
  if (!dataWeather || !dataWeather.main) {
    return [];
  }

  return [
    {
      label: "Thấp/Cao",
      value: `${Math.round(dataWeather.main.temp_min)}°C / ${Math.round(
        dataWeather.main.temp_max
      )}°C`,
      url: "./image/thermometer.png",
    },
    {
      label: "Độ ẩm",
      value: `${dataWeather.main.humidity}%`,
      url: "./image/humidity.png",
    },
    {
      label: "Áp suất",
      value: `${dataWeather.main.pressure} hPa`,
      url: "./image/gauge.png",
    },
    {
      label: "Tầm nhìn",
      value: `${dataWeather.visibility ? dataWeather.visibility / 1000 : "-"
        } km`,
      url: "./image/view.png",
    },
    {
      label: "Gió",
      value: `${dataWeather.wind?.speed} km/h`,
      url: "./image/wind.png",
    },
  ];
};

const WeatherDays = (props: Props) => {
  const { dataWeather } = props;

  const _renderItem = () => {
    return (
      <Dropdown menu={{ items }} trigger={['click']}>
        <div className="py-5 px-2 border-b-1 border-gray-300 flex flex-row justify-between text-[15px]">
          <div className="flex flex-row gap-8">
            <p className="font-[600] text-[#18211e] ">Hôm nay</p>
            <p className="text-[#18211ee6]">23/28</p>
            <div className="flex flex-row gap-2">
              IMG
              <p className="text-[#18211ee6]">Mây cụm</p>
            </div>
          </div>
          <div className="flex flex-row gap-8 text-[#18211ee6]" onClick={(e) => e.preventDefault()} >
            <div className="hidden md:flex flex-row gap-1 ">
              <img width={16} src="./image/humidity.png" alt="" />
              % nước
            </div>
            <p className="hidden md:flex flex-row gap-1">
              <img width={13} height={8} src="./image/wind.png" alt="" />
              sức gió
            </p>
            <DownOutlined className="cursor-pointer" />
          </div>
        </div>
      </Dropdown>
    );
  };

  const _renderItemsDrop = () => {
    return (
      <div className="w-full">
        <div className="grid md:grid-cols-5 grid-cols-3 gap-3 whitespace-nowrap justify-between items-center">
          {WEATHER_STATS(dataWeather).map((item, index) => (
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
  }

  const items: MenuProps["items"] = [
    {
      label: _renderItemsDrop(),
      key: "0",
    }
  ];


  return (
    <div className=' flex flex-col gap-2 md:w-[70%] w-full p-4 rounded-lg border border-gray-200 shadow-xl'>
      <p>Dự báo thời tiết Hà Nội những ngày tới</p>
      {_renderItem()}
      {_renderItem()}
      {_renderItem()}
      {_renderItem()}
      {_renderItem()}
      {_renderItem()}
      {_renderItem()}
    </div>
  );
}

export default WeatherDays;