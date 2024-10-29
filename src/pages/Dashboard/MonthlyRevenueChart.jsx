import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const MonthlyRevenueChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Monthly Revenue',
      data: [1000, 1200, 1500, 1800, 2000, 2200, 2500, 2800, 3000, 3200, 3500, 3800],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  });

  return (
    <Line data={chartData} options={{
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Monthly Revenue'
      }
    }} />
  );
};

export default MonthlyRevenueChart;