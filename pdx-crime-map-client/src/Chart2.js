import React, { useEffect, useState } from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

const state = {
  labels: ['UNWANTED PERSON', 'THEFT', 'SUSPICIOUS SUBJ, VEH, OR CIRCUMSTANCE',
  'ASSAULT','DISTURBANCE'],
  datasets: [
    {
      label: 'Crime by hood',
      backgroundColor: ['#7a4d5c','#d9b53f','#5a784b','#4c6a7a','#ad826d'],
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [39,31,13,12,12]
    }
  ]
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Portland Downtown',
              fontSize:20
            },
            legend:{
              display:false,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}