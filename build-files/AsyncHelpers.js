import axios from 'axios';

const domain = 'localhost'


export async function fetchMapData(setMapData) {
  const result = await axios(
    `http://${domain}/api/map-tweets`,
  );
  setMapData(result.data);
}

export async function fetchCrimeChartData(setData, crime) {
  if (crime === "All") {
    crime = "initcrime"
  }
  const result = await axios(
    `http://${domain}/api/${crime}`,
  );
  setData(result.data);
}

export async function fetchNeighborhoodsData(setNData, hood) {
  if (hood === "All") {
    hood = "inithood"
  }
  const result = await axios(
    `http://${domain}/api/neighborhood/${hood}`,
  );
  setNData(result.data);
}

export async function fetchChoroplethMapData(setCMapData, crime) {
  if (crime === "All") {
    crime = "chorodata"
  }
  const result = await axios(
    `http://${domain}/api/choro/${crime}`,
  );
  setCMapData(result.data);
}