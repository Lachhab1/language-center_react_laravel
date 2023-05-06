import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data, interval, onIntervalChange }) => {
  const chartData = data[interval] || [];

  const handleChange = (event) => {
    onIntervalChange(event.target.value);
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const profitColor = '#3f51b5'; // Blue color for profit line
  const expenseColor = '#ff1744'; // Red color for expense line
  const netEarningsColor = '#4caf50'; // Green color for net earnings line

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            value="year"
            checked={interval === 'year'}
            onChange={handleChange}
          />
          Yearly
        </label>
        <label>
          <input
            type="radio"
            value="month"
            checked={interval === 'month'}
            onChange={handleChange}
          />
          Monthly
        </label>
      </div>
      {chartData.length > 0 ? (
        <Line
          data={{
            labels: chartData.map((item) => (interval === 'year' ? item.year : item.month)),
            datasets: [
              {
                label: 'Profit',
                data: chartData.map((item) => item.profit),
                borderColor: profitColor,
                backgroundColor: profitColor,
              },
              {
                label: 'Expense',
                data: chartData.map((item) => item.expense),
                borderColor: expenseColor,
                backgroundColor: expenseColor,
              },
              {
                label: 'Net Earnings',
                data: chartData.map((item) => item.profit - item.expense),
                borderColor: netEarningsColor,
                backgroundColor: netEarningsColor,
                fill: false,
              },
            ],
          }}
          options={options}
        />
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default LineChart;
