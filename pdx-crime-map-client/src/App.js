import React, { useState } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import * as crimeData from "./data/pdx-crime-data.json";
import useDropdown from './useDropdown';
import useDropdown1 from './dropdown1';
import Chart1 from './Chart1.js';
import Chart2 from './Chart2.js';
import Chart3 from './Chart3.js';

import "./App.css";
import { filteredOptions, crimeIcon, eventRenderer } from './Helper.js'

export default function App() {
  const [activeCrime, setCrime] = useState(null);
  const [event, EventDropdown] = useDropdown("Crime", "All", filteredOptions);

  // Dark Mode "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"

  return (
    <div className="container">
      <EventDropdown />
      <Map center={[45.523064,-122.676483]} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

        {crimeData.tweets && crimeData.tweets.map(crime => (
          eventRenderer(event, crime) &&
          <Marker
            key={crime.tweet_id}
            position={[
              crime.lat,
              crime.lng
            ]}
            onClick={() => {
              setCrime(crime);
            }}
            icon={crimeIcon(crime)}
          />
        ))}

        {activeCrime && (
          <Popup
            position={[
              activeCrime.lat,
              activeCrime.lng
            ]}
            onClose={() => {
              setCrime(null);
            }}
          >
            <div>
              <h2>{activeCrime.tweet}</h2>
              <p>{activeCrime.category}</p>
            </div>
          </Popup>
        )}
      </Map>
      <div class="chart-container" >
        <h4>Overall Crime</h4>
      <EventDropdown /><Chart1 />
      </div>
      <div class="chart-container">
        <h4>Crime by Neighborhood</h4>
      <EventDropdown /><Chart2 />
      </div>
      <div class="chart-container">
        <h4>Neighborhood by Crime</h4>
      <EventDropdown /><Chart3 />
      </div>
    </div>
   
  );  
}