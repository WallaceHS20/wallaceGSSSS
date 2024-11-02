import React from 'react';
import { Line } from 'react-chartjs-2';
import './chart.css'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: chartData.label,
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInCubiclinear',
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
    scales: {
      x: {
        grid: {
          display: false // remove o grid do eixo X
        }
      },
      y: {
        grid: {
          display: false // remove o grid do eixo Y
        }
      }
    }
  };
  return <Line data={chartData} options={options} className='container-chart' />
};

export default LineChart;
