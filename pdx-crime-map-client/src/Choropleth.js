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

const nPopup = (feature, layer) => {
  //console.log(feature.properties.MAPLABEL);
  //console.log(feature.properties.count)
  
  return layer.bindPopup(feature.properties.MAPLABEL.toString())
  //maybe count?
}

const choroplethMap = (geojson) => {
  console.log(geojson.geojson.features)
  function getCounts(geoj) {
    let cntList = []
    for (let i=0; i<geoj.geojson.features.length;i++){
      cntList.push(geoj.geojson.features[i].properties.count.toString())      
    }return cntList
  }
  const counts = getCounts(geojson)
  console.log(counts)
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
          identity={(feature) => feature.properties.count}
        />
      </Map>
    )
  }

export default choroplethMap;