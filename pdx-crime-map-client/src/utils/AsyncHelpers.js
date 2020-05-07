import axios from 'axios';

const domain = 'localhost'

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

export async function fetchDateRangeData(setDateRangeData) {
  const tdate = new Date()
  const startDate = new Date(tdate.setDate(tdate.getDate()-60));
  const endDate = new Date(tdate.setDate(tdate.getDate()+59));

  const sD = await startDate.toISOString().slice(0,10);
  const eD = await endDate.toISOString().slice(0,10);
    
  const result = await axios(
    `http://${domain}:5431/range/${sD}/${eD}`,
  );
  setDateRangeData(result.data);
}

export async function fetchNewDateRangeData(setDateRangeData,dateRange) {
  const { startDate, endDate } = dateRange
  let sD, eD;
  if (startDate !== undefined){
    sD = await startDate.toISOString().slice(0,10);
    eD = await endDate.toISOString().slice(0,10);
  }
    
  const result = await axios(
    `http://${domain}:5431/range/${sD}/${eD}`,
  );
  setDateRangeData(result.data);
}

export async function fetchHoodCrimeData(setHoodCrimeData) {
  const result = await axios(
    `http://${domain}:5431/hoodCrime`,
  );
  setHoodCrimeData(result.data);
}

export async function fetchNewHoodCrimeData(setHoodCrimeData,specs) {
  const { timeHood, timeCrime, startDate, endDate } = specs
  let sD, eD;
  if (startDate !== undefined){
    sD = await startDate.toISOString().slice(0,10);
    eD = await endDate.toISOString().slice(0,10);
  }
    
  const result = await axios(
    `http://${domain}:5431/detailed/${sD}/${eD}/${timeHood}/${timeCrime}`,
  );
  setHoodCrimeData(result.data);
}