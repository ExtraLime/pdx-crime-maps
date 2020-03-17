import React from 'react';
import Choropleth from 'react-leaflet-choropleth';
import { Map, TileLayer } from 'react-leaflet';

function getColor(c) {
  return c > 500 ? '#800026' :
         c > 250  ? '#BD0026' :
         c > 100  ? '#E31A1C' :
         c > 50  ? '#FC4E2A' :
         c > 20   ? '#FD8D3C' :
         c > 10   ? '#FEB24C' :
         c > 5   ? '#FED976' :
                    '#FFEDA0';
}

function style(feature) {
  return {
      fillColor: getColor(feature.properties.count),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

// const count = (geojson) => {

//   const counted = geojson.geojson.features.map(item => item.properties.count);
//   return counted;
// }

async function nPopup(feature, layer) {
  if(feature.properties.count === 0) {
    return await console.log(feature.properties.count);
  } else {
    return layer.bindPopup(`${feature.properties.MAPLABEL} ${feature.properties.count}`)
  }
  //console.log(feature.properties.MAPLABEL);
}

const choroplethMap = (geojson) => {
  return (
      <Map center={[45.523064,-122.676483]} zoom={11}>
        <TileLayer
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        <Choropleth
          data={{type: 'FeatureCollection', features: geojson.geojson.features}}
          valueProperty={(feature) => feature.properties.count }
          visible={''}
          scale={['#b3cde0', '#011f4b']}
          steps={7}
          mode='e'
          style={(feature) => style(feature)}
          onEachFeature={(feature, layer) => nPopup(feature, layer)}
        />
      </Map>
    )
  }

export default choroplethMap;