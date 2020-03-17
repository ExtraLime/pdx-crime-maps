import React, { useEffect, useState } from "react";
import useDropdown from './useDropdown';
import BarChart from './BarChart';
import CrimeMap from './CrimeMap';
import ChoroplethMap from './Choropleth';
import "./App.css";
import { filteredEntityOptions, crimeIcon, eventRenderer, cChartData, nChartData,  } from './Helper.js';
import { categories } from './data/categories';
import { hoods } from './data/hoods';

import { fetchMapData, fetchData, fetchNData, fetchChoroMapData } from './AsyncHelpers.js'

export default function App() {
  const [crimeChartData, setCrimeChartData] = useState([]);
  const [hoodChartData, setNChartData] = useState([]);
  const [event, EventDropdown] = useDropdown("Entity", "All", filteredEntityOptions);
  const [crime, CrimeDropdown] = useDropdown("Crime", "All", categories);
  const [hood, NeighborhoodDropdown] = useDropdown("Neighborhood", "All", hoods);
  const [mapData, setMapData] = useState([]);
  const [cMapData, setCMapData] = useState(null);

  useEffect(() => {
    fetchMapData(setMapData);
    fetchData(setCrimeChartData, crime);
  },[crime]);
  
  useEffect(() => {
    fetchNData(setNChartData, hood);
  }, [hood]);
  
  useEffect(() => {
    fetchChoroMapData(setCMapData, crime);
  }, [crime]);


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
      <BarChart data={cChartData(crimeChartData, crime)}
                text={cChartData(crimeChartData, crime).datasets[0].label}
        />
      {cMapData && <ChoroplethMap geojson={cMapData}/>}
      <NeighborhoodDropdown />
      <BarChart data={nChartData(hoodChartData, hood)}
                text={nChartData(hoodChartData, hood).datasets[0].label}
        />
      
    </div>
  );  
}