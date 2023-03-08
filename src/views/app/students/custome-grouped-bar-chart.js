import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-labels';

const CustomGroupedBarChart = ({
  firstDataSet,
  secondDataSet,
  labels,
  backgroundColor,
}) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      new Chart(chartContainer.current, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'اناث',
              data: firstDataSet,
              backgroundColor: backgroundColor[0],
              borderColor: 'white',
              barThickness: '40',
            },
            {
              label: 'ذکور',
              data: secondDataSet,
              backgroundColor: backgroundColor[1],
              borderColor: 'white',
              barThickness: '40',
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
            {label}: {firstDataSet[index] + secondDataSet[index]}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: '1rem',
          fontSize: '20px',
          fontWeight: 'bold',
        }}
      >
        مجموع:{' '}
        {firstDataSet.reduce((a, b) => a + b, 0) +
          secondDataSet.reduce((a, b) => a + b, 0)}
      </div>
    </div>
  );
};

export default CustomGroupedBarChart;
