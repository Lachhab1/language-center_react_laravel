import React from 'react';
import { Line } from 'react-chartjs-2';


const LineChart = ({ data }) => {
  const chartData = data || [];
  console.log(chartData);

  const profitColor = '#3f51b5'; // Blue color for profit line
  const expenseColor = '#ff1744'; // Red color for expense line
  const netEarningsColor = '#4caf50'; // Green color for net earnings line
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  return (
    <div>
        <Line
          data={{
            datasets: [
              {
                label: 'Profit',
                data: data?.profit,
                borderColor: profitColor,
                backgroundColor: profitColor,
              },
              {
                label: 'Expense',
                data: data?.expenses,
                borderColor: expenseColor,
                backgroundColor: expenseColor,
              },

              {
                label: 'Net Earnings',
                data: data?.netEarnings,
                borderColor: netEarningsColor,
                backgroundColor: netEarningsColor,
              },
            ],
          }}
        />
    </div>
  );
};

export default LineChart;
