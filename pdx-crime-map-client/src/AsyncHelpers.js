import axios from 'axios';

export async function fetchMapData(setMapData) {
  const result = await axios(
    'http://localhost:5431/map-tweets',
  );
  setMapData(result.data);
}

export async function fetchData(setData, crime) {
  if (crime === "All") {
    crime = "initcrime"
  }
  const result = await axios(
    `http://localhost:5431/${crime}`,
  );
  setData(result.data);
}

export async function fetchNData(setNData, hood) {
  console.log(hood)
  if (hood === "All") {
    hood = "inithood"
  }
  const result = await axios(
    `http://localhost:5431/neighborhood/${hood}`,
  );
  console.log(result.data)
  setNData(result.data);
}

export async function fetchChloroMapData(setCMapData, crime) {
  console.log(crime)
  if (crime === "All") {
    crime = "chlorodata"
  }
  const result = await axios(
    `http://localhost:5431/chloro/${crime}`,
  );
  setCMapData(result.data);
}