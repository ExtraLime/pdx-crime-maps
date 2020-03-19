import React, { useEffect, useState } from "react";
import useDropdown from './components/useDropdown';
import BarChart from './components/BarChart';
import CrimeMap from './components/CrimeMap';
import ChoroplethMap from './components/Choropleth';
import "./App.scss";
import { crimeIcon, eventRenderer, choroplethChartData, neighborhoodsChartData } from './utils/Helper.js';
import { categories, neighborhoods, entities } from './data/index';

import { fetchMapData, fetchCrimeChartData, fetchNeighborhoodsData, fetchChoroplethMapData } from './utils/AsyncHelpers.js'

export default function App() {
  const [crimeChartData, setCrimeChartData] = useState([]);
  const [neighborhoodChartData, setNChartData] = useState([]);
  const [event, EventDropdown] = useDropdown("Entity", "All", entities);
  const [crime, CrimeDropdown] = useDropdown("Crime", "All", categories);
  const [hood, NeighborhoodDropdown] = useDropdown("Neighborhood", "All", neighborhoods);
  const [mapData, setMapData] = useState([]);
  const [choroplethMapData, setCMapData] = useState(null);

  useEffect(() => {
    fetchMapData(setMapData);
    fetchCrimeChartData(setCrimeChartData, crime);
  },[crime]);
  
  useEffect(() => {
    fetchNeighborhoodsData(setNChartData, hood);
  }, [hood]);
  
  useEffect(() => {
    fetchChoroplethMapData(setCMapData, crime);
  }, [crime]);

  return (
    <div className="container">
      <EventDropdown />
      <CrimeMap crimeData={mapData} 
                eventRenderer={eventRenderer} 
                event={event} 
                crimeIcon={crimeIcon} 
        />

      <CrimeDropdown />
      <BarChart data={choroplethChartData(crimeChartData, crime)}
                text={choroplethChartData(crimeChartData, crime).datasets[0].label}
                type="horizontalBar"
        />
      {choroplethMapData && <ChoroplethMap geojson={choroplethMapData}/>}
      <NeighborhoodDropdown />
      <BarChart data={neighborhoodsChartData(neighborhoodChartData, hood)}
                text={neighborhoodsChartData(neighborhoodChartData, hood).datasets[0].label}
                type="bar"
        />
      
    </div>
  );  
}