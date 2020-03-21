import axios from 'axios';

const domain = '10.0.0.212'

export async function fetchMapData(setMapData) {
  const result = await axios(
    `http://${domain}:5431/map-tweets`,
  );
  setMapData(result.data);
}

export async function fetchCrimeChartData(setData, crime) {
  if (crime === "All") {
    crime = "initcrime"
  }
  const result = await axios(
    `http://${domain}:5431/${crime}`,
  );
  setData(result.data);
}

export async function fetchNeighborhoodsData(setNData, hood) {
  if (hood === "All") {
    hood = "inithood"
  }
  const result = await axios(
    `http://${domain}:5431/neighborhood/${hood}`,
  );
  setNData(result.data);
}

export async function fetchChoroplethMapData(setCMapData, crime) {
  if (crime === "All") {
    crime = "chorodata"
  }
  const result = await axios(
    `http://${domain}:5431/choro/${crime}`,
  );
  setCMapData(result.data);
}