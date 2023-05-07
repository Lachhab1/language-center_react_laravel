import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  const labels = data.map((item) => item.course);
  const studentCounts = data.map((item) => item.students);
  const colors = ['#3f51b5', '#ff1744', '#00bcd4', '#4caf50', '#ffc107'];

  const datasets = [
    {
      label: 'Number of Students',
      data: studentCounts,
      backgroundColor: colors.slice(0, data.length),
    },
  ];

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Bar
      data={{
        labels,
        datasets,
      }}
      options={options}
      style={{height:"70vh" , maxHeight:"400px"}}
    />
  );
};

export default BarChart;
