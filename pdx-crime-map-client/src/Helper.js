import * as crimeData from "./data/pdx-crime-data.json";
import { police, fireman, medical } from './Icons';

export const categories = ['ACCIDENT',
'ANIMAL PROBLEM',
'AREA CHECK',
'ASSAULT',
'BURGLARY',
'DISTURBANCE',
'FIRE RELATED',
'HAZARD',
'ILLEGAL DUMPING',
'NOISE DISTURBANCE',
'PARKING PROBLEM',
'PARTY DISTURBANCE',
'PREMISE CHECK',
'PROWLER',
'ROBBERY',
'SHOOTING',
'SHOTS FIRED',
'STABBING',
'SUSPICIOUS',
'SUSPICIOUS SUBJ, VEH, OR CIRCUMSTANCE',
'THEFT',
'THREAT',
'TRIMET INCIDENT',
'UNWANTED PERSON',
'VANDALISM',
'VEHICLE STOLEN'];


const entityOptions = crimeData.tweets.map((entityList, i) => entityList.entity);

export const filteredEntityOptions = entityOptions.filter((option, i) => entityOptions.indexOf(option) >= i);

export const crimeIcon = (crime) => crime.text.includes("MED") 
                                      ? medical 
                                      : crime.text.includes("FIRE") || crime.text.includes("Portland Fire")
                                      ? fireman
                                      : police 

export const eventRenderer = (event, crime) => event === "All" ? crime : crime.entity.includes(event);


export const stolenVehicleChartData = (data, crime) => {
  return {labels: data.map(item => item.location),
          datasets: [
            {
              label: crime,
              backgroundColor: ['#7a4d5c','#d9b53f','#5a784b','#4c6a7a','#ad826d'],
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: data.map(item => item.count)
            }
          ]}
}
