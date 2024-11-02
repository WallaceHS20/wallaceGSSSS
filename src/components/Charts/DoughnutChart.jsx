import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './chart.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ chartData }) => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gráfico de Barras',
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInSine',
      onProgress: function (animation) {
        const chartInstance = animation.chart;
        const ctx = chartInstance.ctx;
        ctx.save();
      },
      onComplete: function (animation) {
        const chartInstance = animation.chart;
        const ctx = chartInstance.ctx;
        ctx.restore();
      },
    },
    
  };

  return <Doughnut data={chartData} options={options} className='container-chart' />
};

export default DoughnutChart;
