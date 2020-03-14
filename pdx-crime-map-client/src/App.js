import React, { useEffect, useState } from "react";
import useDropdown from './useDropdown';
import BarChart from './BarChart';
import CrimeMap from './CrimeMap';
import ChoroplethMap from './Choropleth';
// import pdxData from './data/pdx_data.js';
import "./App.css";
import { filteredEntityOptions, crimeIcon, eventRenderer, cChartData, nChartData,  } from './Helper.js';
import { categories } from './data/categories';
import { hoods } from './data/hoods';
import geo from './data/geo_json';
import { newGeo } from './data/update_geojson';

import { fetchMapData, fetchData, fetchNData, fetchChloroMapData } from './AsyncHelpers.js'

export default function App() {
  const [crimeChartData, setCrimeChartData] = useState([]);
  const [hoodChartData, setNChartData] = useState([]);
  const [event, EventDropdown] = useDropdown("Entity", "All", filteredEntityOptions);
  const [crime, CrimeDropdown] = useDropdown("Crime", "All", categories);
  const [hood, NeighborhoodDropdown] = useDropdown("Neighborhood", "All", hoods);
  const [mapData, setMapData] = useState([]);
  const [cMapData, setCMapData] = useState([]);

  useEffect(() => {
    fetchMapData(setMapData);
    fetchData(setCrimeChartData, crime);
    fetchNData(setNChartData, hood);
    fetchChloroMapData(setCMapData, crime);
  },[crime, hood]);

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
      <NeighborhoodDropdown />
      <BarChart data={nChartData(hoodChartData, hood)}
                text={nChartData(hoodChartData, hood).datasets[0].label}
        />
      <ChoroplethMap geojson={newGeo(geo, cMapData)}/>
    </div>
  );  
}