import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';
var locs = []
var counts = []

const OldChart = () => {
  const [data, setData] = useState([]);

  console.log(data);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'http://localhost:5431/tweets',
      );
      setData(result.data);
    }
    fetchData();
  }, []);
var locs =  data.map(item => (item.location))
var counts = data.map(item => (item.count))}

const state = {
    labels: ['Centennial', 'Powellhurst-Gilbert', 'Parkrose',
    'Kerns','Hazelwood'],
    datasets: [
      {
        label: 'Crime by hood',
        backgroundColor: ['#7a4d5c','#d9b53f','#5a784b','#4c6a7a','#ad826d'],
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [8,7,6,6,5]
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
                text:'Vehicle Stolen',
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