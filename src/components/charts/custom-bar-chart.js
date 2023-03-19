import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-labels';

const CustomeBarChart = ({ data, labels, backgroundColor }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      new Chart(chartContainer.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: backgroundColor,

              borderColor: 'black',
              barThickness: '40',
              base: '10',
            },
          ],
        },
        options: {
          plugins: {
            labels: {
              render: 'value',
              fontColor: '#fff',
              precision: 0,
            },
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
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
          justifyContent: 'space-between',
          marginTop: '30px',
          alignItems: 'center',
        }}
      >
        {labels.map((label, index) => (
          <div style={{}} key={index}>
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
          // marginRight: '2rem',
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

export default CustomeBarChart;
