import React, { useState, useEffect } from 'react';
import Choropleth from 'react-leaflet-choropleth';
import hash from 'object-hash';
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

const nPopup = (feature, layer) => layer.bindPopup(`${feature.properties.MAPLABEL} ${feature.properties.count}`)

// const onEachFeatureData = (feature, layer) => {
//   layer.on({
//     click: function(event) {
//       var popup = L.popup()
//           .setLatLng(event.latlng)
//           .setContent(nPopup(feature))
//           .openOn(layer._map);

//         }
//   });
// }

const getIdentity = (feature) => {
  return hash(feature);   // generates unique hash from the feature object using object-hash library
}

const ChoroplethMap = (props) => {
  const [mapData, setMapData] = useState(props);

  useEffect(() => {
    if (mapData.geojson !== props) {
      setMapData(props);
    }
  }, [mapData, props]);

  return (
      <Map center={[45.523064,-122.676483]} zoom={11}>
        <TileLayer
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        <Choropleth
          identity={(feature) => getIdentity(feature)}
          data={mapData.geojson}
          valueProperty={feature => feature.properties.count }
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

export default ChoroplethMap;