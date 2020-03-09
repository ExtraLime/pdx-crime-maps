import axios from 'axios';

export async function fetchMapData(setMapData) {
  const result = await axios(
    'http://localhost:5431/map-tweets',
  );
  setMapData(result.data);
}

export async function fetchData(setData) {
  const result = await axios(
    'http://localhost:5431/tweets',
  );
  setData(result.data);
}