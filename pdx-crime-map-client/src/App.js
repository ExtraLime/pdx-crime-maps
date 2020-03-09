import React, { useEffect, useState } from "react";
// import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import useDropdown from './useDropdown';
import BarChart from './BarChart';
import CrimeMap from './CrimeMap';
import axios from 'axios';

import "./App.css";
import { filteredOptions, crimeIcon, eventRenderer, stolenVehicleChartData } from './Helper.js'

export default function App() {
  // const [activeCrime, setCrime] = useState(null);
  const [event, EventDropdown] = useDropdown("Crime", "All", filteredOptions);
  const [data, setData] = useState([])
  const [mapData, setMapData] = useState([])

  console.log(data)

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'http://localhost:5431/tweets',
      );
      setData(result.data);
    }

    async function fetchMapData() {
      const result = await axios(
        'http://localhost:5431/map-tweets',
      );
      setMapData(result.data);
    }
    fetchMapData();
    fetchData();
  }, []);

  console.log(mapData)

  // Dark Mode "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"

  return (
    <div className="container">
      <EventDropdown />
      <CrimeMap crimeData={mapData} 
                eventRenderer={eventRenderer} 
                event={event} 
                crimeIcon={crimeIcon} 
        />

      <BarChart data={stolenVehicleChartData(data)}
                text={stolenVehicleChartData(data).datasets[0].label}
        />
    </div>
  );  
}