import React from 'react';
import Part from './custom-pie-chart';
import CustomGroupedBarChart from './custome-grouped-bar-chart';

function Test() {
  return (
    <div>
      <CustomGroupedBarChart
        firstDataSet={[30, 20, 40, 50]}
        secondDataSet={[20, 30, 50, 10]}
        labels={['چهارده پاس', 'لیسانس', 'ماستر', 'دوکتور']}
        backgroundColor={['#FF6384', '#36A2EB', '#FF6384', '#36A2EB']}
      />
    </div>
  );
}

export default Test;
