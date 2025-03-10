import HeaderWeather from './components/header-weather/Header.tsx';
import React from "react";

const App = () => {
  const _renderWeatherCity = () => (
    <div className='pt-10 pb-10 px-10 flex flex-col gap-4 text-[#003870] md:min-w-[550px] shadow-xl rounded-[12px] border border-gray-300 bg-white'>
      <p className='font-bold text-[24px]'>Dự báo thời tiết Hà Nội</p>
      <p>Hôm nay, 07/03/2025</p>
      <div className='flex flex-col gap-4'>
        <div>
          <div className='flex flex-row gap-6 items-center'>
            Img
            <p>20 độ</p>
            <div className='flex flex-col gap-4'>
              <p>Bầu trời Quang Đãng</p>
              <p>Cảm giác như 19 độ</p>
            </div>
          </div>
        </div>
        <hr></hr>
        <div className="w-full overflow-x-auto sm:overflow-hidden">
          <div className="flex flex-row gap-2 whitespace-nowrap max-w-[300px]">
            <div>Thấp/Cao</div>
            <div>Thấp/Cao</div>
            <div>Thấp/Cao</div>
            <div>Thấp/Cao</div>
            <div>Thấp/Cao</div>
            <div>Thấp/Cao</div>
            <div>Thấp/Cao</div>

          </div>
        </div>
      </div>
    </div >
  );
  const _renderWeatherBuoi = () => (
    <div className='pt-10 pb-16 md:px-10 w-[96%] px-[15px] flex flex-col gap-4 text-[#003870] max-w-[550px] shadow-xl rounded-[12px] border border-gray-300 bg-white'>
      <p className='font-bold text-[24px]'>Nhiệt độ Hà Nội</p>
      <div className='inline-grid md:grid-cols-4 grid-cols-2 gap-[8px]'>
        <div className='flex flex-col justify-between items-center gap-8 border-r-1 border-gray-100 pr-2'>
          <p className='font-[600]'>Ngày</p>
          <div>Img</div>
          <p>16 độ / 15 độ</p>
        </div>
        <div className='flex flex-col justify-between items-center gap-8 border-r-1 border-gray-100 pr-2'>
          <p className='font-[600]'>Ngày</p>
          <div>Img</div>
          <p>16 độ / 15 độ</p>
        </div>
        <div className='flex flex-col justify-between items-center gap-8 border-r-1 border-gray-100 pr-2'>
          <p className='font-[600]'>Ngày</p>
          <div>Img</div>
          <p>16 độ / 15 độ</p>
        </div>
        <div className='flex flex-col justify-between items-center gap-8 border-r-1 border-gray-100 pr-2'>
          <p className='font-[600]'>Ngày</p>
          <div>Img</div>
          <p>16 độ / 15 độ</p>
        </div>
      </div>
    </div>
  );

  const _renderWeatherHourl = () => (
    <div className='w-full md:px-50 p-4 bg-[#cbf2e2]'>
      <div className="md:w-[70%] w-full p-4 rounded-xl bg-white">
        <p className="font-600 text-[18px]">Dự báo thời tiết Hà Nội những ngày tới</p>
        <div className="flex flex-row justify-between items-center py-3 border-b-1 border-[#999999]">
          <div className="flex flex-row gap-4 items-center">
            <p>Hôm nay</p>
            <p>18 ddooj / 24 độ</p>
            <div className="flex flex-row gap-2 items-center">
              <p>img</p>
              <p>Nắng đẹp</p>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <p>% mưa</p>
            <p>Sức gió</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App w-full h-full">
      <HeaderWeather />
      <div className='w-full bg-[#82b6e9] h-12 shadow-lg'></div>
      <div
        className='bg-cover bg-center bg-no-repeat pt-10 pb-16 flex flex-col md:flex-row justify-center items-center gap-9'
        style={{ backgroundImage: "url('/image/bg-home-lancapse.jpg')" }}
      >
        {_renderWeatherCity()}
        {_renderWeatherBuoi()}
      </div>
      {_renderWeatherHourl()}
    </div>
  );
}

export default App;
