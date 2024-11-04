import React from 'react';
import './chart.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ chartData }) => {
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
      easing: 'easeInSine', 
      onProgress: function(animation) {
        const chartInstance = animation.chart;
        const ctx = chartInstance.ctx;
        ctx.save();
      },
      onComplete: function(animation) {
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

  return <Bar data={chartData} options={options} className='container-chart'/>
};

export default BarChart;
