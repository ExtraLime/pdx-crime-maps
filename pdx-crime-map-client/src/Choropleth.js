import React from 'react';
import Choropleth from 'react-leaflet-choropleth';
import { Map } from 'react-leaflet';

function getColor(c) {
  return c > 1000 ? '#800026' :
         c > 500  ? '#BD0026' :
         c > 200  ? '#E31A1C' :
         c > 100  ? '#FC4E2A' :
         c > 50   ? '#FD8D3C' :
         c > 20   ? '#FEB24C' :
         c > 10   ? '#FED976' :
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

const popup = (feature, layer) => {
  console.log(feature.properties.count);
  return layer.bindPopup(feature.properties.MAPLABEL)
  //maybe count?
}

const choroplethMap = (geojson) => {
  console.log(geojson.geojson.features)
  return (
      <Map center={[45.523064,-122.676483]} zoom={11.5}>
        <Choropleth
          data={{type: 'FeatureCollection', features: geojson.geojson.features}}
          valueProperty={(feature) => feature.properties.count }
          visible={''}
          scale={['#b3cde0', '#011f4b']}
          steps={7}
          mode='e'
          style={(feature) => style(feature)}
          onEachFeature={(feature, layer) => popup(feature, layer)}
        />
      </Map>
    )
  }

export default choroplethMap;