// data.js

import { color } from "chart.js/helpers";

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Definindo configurações globais para fontes
Chart.defaults.font.family = 'Roboto, sans-serif'; // Se você quiser usar a fonte Roboto como no resto do projeto
Chart.defaults.font.size = 14; // Tamanho da fonte
Chart.defaults.color = '#FFFFFF'; // Cor da fonte branca


export const data = {

  kinds_counts_Sum: {
    titulo: 'Total de Duplicatas',
    valor: 181.239,
    color: '#0C4EC9',
    total: '20.000',
  },

  kinds_counts: {
    labels: ['Agosto', 'Maio', 'Junho', 'Julho', 'Abril', 'Setembro', 'Janeiro', 'Fevereiro', 'Marco', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
      {
        label: 'Kinds Counts',
        data: [154355, 7806, 5274, 3144, 3047, 1883, 1379, 1327, 1238, 1117, 417, 252],
        borderWidth: 2,
        //borderColor: '#1168ab', 
        //backgroundColor: '#1168ab', 
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      }
    ]
  },

  service_counts_Sum: 881,

  serviceAndgood: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
      {
        label: 'Serviço',
        data: [22, 33, 62, 54, 54, 55, 70, 237, 72, 112, 48, 62], // Dados ordenados de acordo com os meses
        borderColor: 'rgb(208, 191, 240)',
        backgroundColor: 'rgb(208, 191, 240)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Produto',
        data: [1357, 1294, 1176, 2993, 7752, 5219, 3074, 154118, 1811, 1005, 369, 190], // Dados ordenados de acordo com os meses
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ]
  },

  service_counts: {
    labels: ['Agosto', 'Outubro', 'Setembro', 'Julho', 'Dezembro', 'Marco', 'Junho', 'Abril', 'Maio', 'Novembro', 'Fevereiro', 'Janeiro'],
    datasets: [
      {
        label: 'Service Counts',
        data: [237, 112, 72, 70, 62, 62, 55, 54, 54, 48, 33, 22],
      }
    ]
  },

  goods_counts: {
    labels: ['Agosto', 'Maio', 'Junho', 'Julho', 'Abril', 'Setembro', 'Janeiro', 'Fevereiro', 'Marco', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
      {
        label: 'Goods Counts',
        data: [154118, 7752, 5219, 3074, 2993, 1811, 1357, 1294, 1176, 1005, 369, 190],
      }
    ]
  },

  cancelados_counts_sum: {
    titulo: 'Duplicatas Canceladas',
    valor: 43.488,
    color: '#ef3333e8',
  },

  cancelados_counts: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
      {
        label: 'Duplicatas Canceladas',
        data: [16, 41, 117, 42, 30, 20, 89, 42627, 278, 138, 63, 27], // Dados ordenados de acordo com os meses
        borderColor: '#FF6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      }
    ]
  },

  active_counts_sum: {
    titulo: 'Duplicatas Finalizadas',
    valor: 137.281,
    color: 'rgba(49, 131, 131, 0.589)',
  },
  active_counts: {
    labels: ['Agosto', 'Maio', 'Junho', 'Julho', 'Abril', 'Setembro', 'Janeiro', 'Fevereiro', 'Marco', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
      {
        label: 'Duplicatas Finalizadas',
        data: [111705, 7671, 5213, 3027, 2797, 1595, 1351, 1277, 1104, 971, 350, 220],
        backgroundColor: 'rgba(49, 131, 131, 0.589)',
        borderWidth: 2,
        borderColor: 'rgba(49, 131, 131, 0.589)',
        tension: 0.4,
        fill: true,
      }
    ]
  },


  finished_counts: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [
      {
        label: 'Duplicatas Finalizadas',
        data: [12, 9, 17, 208, 105, 41, 28, 23, 10, 8, 4, 5],
        backgroundColor: 'rgba(49, 131, 131, 0.589)',
        borderWidth: 2,
        borderColor: 'rgba(49, 131, 131, 0.589)',
        tension: 0.4,
        fill: true,
      }
    ]
  },



  qtd_estado_goods: {
    labels: ['SP', 'CE', 'MG', 'NA', 'PE'],
    datasets: [
      {
        label: 'Duplicatas de Produtos por Estado',
        data: [157111, 5602, 4000, 3881, 2817],
        backgroundColor: '#1168ab',
      }
    ]
  },


  qtd_estados_canceled_goods: {
    labels: ['SP', 'NA', 'BA', 'SC', 'PA'],
    datasets: [
      {
        label: 'Duplicatas de Produtos por Estado Canceladas',
        data: [42571, 662, 101, 14, 5],
        backgroundColor: '#ef3333e8',
      }
    ]
  },


  qtd_estados_finished_goods: {
    labels: ['SP', 'MG', 'RS', 'SC', 'RJ'],
    datasets: [
      {
        label: 'Duplicatas de Produtos por Estado Finalizadas',
        data: [230, 59, 57, 26, 16],
        backgroundColor: 'rgba(49, 131, 131, 0.589)',
        fill: true
      }
    ]
  },


  qtd_estados_active_goods: {
    labels: ['SP', 'MG', 'RS', 'SC', 'RJ'],
    datasets: [
      {
        label: 'Qtd Estados Active Goods',
        data: [230, 59, 57, 26, 16],
      }
    ]
  },


  qtd_estado_services: {
    labels: ['SP', 'NA', 'RJ', 'PA', 'SC'],
    datasets: [
      {
        label: 'Duplicatas de Serviço por Estado',
        data: [510, 233, 84, 20, 16],
        backgroundColor: '#1168ab',
        tension: 0.4,
      }
    ]
  },


  qtd_estados_cancelados_services: {
    labels: ['NA', 'SP'],
    datasets: [
      {
        label: 'Duplicatas de Serviço por Estado Canceladas',
        data: [111, 17],
        backgroundColor: '#ef3333e8',
      }
    ]
  },


  qtd_estados_finished_services: {
    labels: ['SP', 'SC', 'NA', 'RJ', 'MG'],
    datasets: [
      {
        label: 'Duplicatas de Serviço por Estado Finalizadas',
        data: [16, 15, 8, 2, 1],
        backgroundColor: 'rgba(49, 131, 131, 0.589)',
      }
    ]
  },


  qtd_estados_active_services: {
    labels: ['SP', 'SC', 'NA', 'RJ', 'MG'],
    datasets: [
      {
        label: 'Qtd Estados Active Services',
        data: [16, 15, 8, 2, 1],
      }
    ]
  },

};
