import React from 'react';
import Choropleth from 'react-leaflet-choropleth';
import { Map } from 'react-leaflet';

const style = {
    fillColor: '#F28F3B',
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.5
}

const choroplethMap = (geojson) => {
  console.log(geojson.geojson.features)
  return (
      <Map center={[45.523064,-122.676483]} zoom={11.5}>
        <Choropleth
          data={{type: 'FeatureCollection', features: geojson.geojson.features}}
          valueProperty={''}
          visible={''}
          scale={['#b3cde0', '#011f4b']}
          steps={7}
          mode='e'
          style={style}
          onEachFeature={(feature, layer) => layer.bindPopup(feature.properties.MAPLABEL)}
        />
      </Map>
    )
  }

export default choroplethMap;