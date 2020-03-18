import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {
  const { data, text } = props;

  return (
    <Bar
      data={data}
      options={{
        title:{
          display:true,
          text:text,
          fontSize:20
        },
        legend:{
          display:false,
          position:'right'
        }
      }}
    />
  );
};

export default BarChart;