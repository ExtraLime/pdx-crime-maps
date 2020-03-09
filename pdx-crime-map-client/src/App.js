import React, { useEffect, useState } from "react";
import useDropdown from './useDropdown';
import BarChart from './BarChart';
import CrimeMap from './CrimeMap';
import "./App.css";
import { filteredEntityOptions, crimeIcon, eventRenderer, stolenVehicleChartData } from './Helper.js';
import { categories } from './data/categories';
import { fetchMapData, fetchData } from './AsyncHelpers.js'

export default function App() {
  const [crimeChartData, setCrimeChartData] = useState([])
  const [event, EventDropdown] = useDropdown("Entity", "All", filteredEntityOptions);
  const [crime, CrimeDropdown] = useDropdown("Crime", "All", categories);
  const [mapData, setMapData] = useState([])

  useEffect(() => {
    fetchMapData(setMapData);
    fetchData(setCrimeChartData, crime);
  }, [crime]);

  console.log(stolenVehicleChartData(crimeChartData))


  // Dark Mode "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"

  return (
    <div className="container">
      <EventDropdown />
      <CrimeMap crimeData={mapData} 
                eventRenderer={eventRenderer} 
                event={event} 
                crimeIcon={crimeIcon} 
        />

      <CrimeDropdown />
      <BarChart data={stolenVehicleChartData(crimeChartData, crime)}
                text={stolenVehicleChartData(crimeChartData, crime).datasets[0].label}
        />
      
    </div>
  );  
}