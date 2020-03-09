import axios from 'axios';

export async function fetchMapData(setMapData) {
  const result = await axios(
    'http://localhost:5431/map-tweets',
  );
  setMapData(result.data);
}

export async function fetchData(setData, crime) {
  console.log(crime)
  if (crime === "All") {
    crime = "tweets"
  }
  const result = await axios(
    `http://localhost:5431/${crime}`,
  );
  console.log(result.data)
  setData(result.data);
}