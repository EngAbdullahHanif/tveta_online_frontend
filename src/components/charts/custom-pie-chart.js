import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-labels';

const CustomePieChart = ({ data, labels, backgroundColor }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      new Chart(chartContainer.current, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: backgroundColor,
              borderColor: 'white',
            },
          ],
        },
        options: {
          plugins: {
            labels: {
              render: function (args) {
                return (
                  args.value +
                  ' (' +
                  ((args.percentage / 100) * 100).toFixed(0) +
                  '%)'
                );
              },
              fontColor: 'white',
              position: 'left',
            },
          },
          legend: {
            display: false,
          },
        },
      });
    }
  }, []);

  return (
    <div>
      <canvas ref={chartContainer} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: '30px',
          alignItems: 'center',
        }}
      >
        {labels.map((label, index) => (
          <div style={{ marginRight: '15px' }} key={index}>
            <span
              style={{
                backgroundColor: backgroundColor[index],
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
              }}
            />
            {label}: {data[index]}
          </div>
        ))}
      </div>
      <div
        style={{
          // marginRight: '3rem',
          marginTop: '1rem',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        مجموع: {data.reduce((a, b) => a + b, 0)}
      </div>
    </div>
  );
};

export default CustomePieChart;
