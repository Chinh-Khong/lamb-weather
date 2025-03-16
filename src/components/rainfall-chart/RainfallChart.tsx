import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from "recharts";
import "./RainfallChart.css";

interface Props {
  hourlyForecast: any[]; // Dữ liệu từ API
}

const RainfallChart: React.FC<Props> = ({ hourlyForecast }) => {
  if (!hourlyForecast) return <p>Data download...</p>;

  // Lấy dữ liệu dự báo trong 24 giờ (8 lần, mỗi lần 3 giờ)
  const data = hourlyForecast.slice(0, 8).map((item, index, array) => {
    // Tính tổng lượng mưa của các mục trước đó để có tổng lượng mưa trong 24 giờ
    const rain24h = array.slice(Math.max(0, index - 7), index + 1).reduce((sum, entry) => {
      return sum + (entry.rain ? entry.rain["3h"] || 0 : 0);
    }, 0);

    return {
      time: new Date(item.dt * 1000).getHours() + "h",
      rain: rain24h, // Tổng lượng mưa trong 24 giờ
      temp: item.main.temp, // Nhiệt độ
    };
  });

  return (
    <div className="rainfall-container">
      <h2 className="rainfall-title">Rainfall in the coming hours</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" label={{ value: "mm", angle: -90, position: "insideLeft" }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: "°C", angle: 90, position: "insideRight" }} />
          <Tooltip />
          <Bar yAxisId="left" dataKey="rain" fill="#3498db" name="Lượng mưa 24h (mm)" />
          <Line yAxisId="right" type="monotone" dataKey="temp" stroke="#e74c3c" name="Nhiệt độ (°C)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RainfallChart;
