import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const DoughnutChart = ({ maleCount, femaleCount }) => {
  const data = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Number of Students',
        data: [maleCount, femaleCount],
        backgroundColor:['#3f51b5', '#ff1744'],
        borderColor: ['#242B5E', '#D60A0B'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Doughnut data={data} options={options} width={100} />;
};

export default DoughnutChart;
