import * as crimeData from "./data/pdx-crime-data.json";
import { police, fireman, medical } from './Icons';

const entityOptions = crimeData.tweets.map((entityList, i) => {
  return entityList.entity
});
export const filteredOptions = entityOptions.filter((option, i) => entityOptions.indexOf(option) >= i);

export const crimeIcon = (crime) => crime.category.includes("MEDICAL") 
                                      ? medical 
                                      : crime.category.includes("FIRE") 
                                      ? fireman
                                      : police 

export const eventRenderer = (event, crime) => event === "All" ? crime : crime.entity.includes(event);


export const stolenVehicleChartData = (data) => {
  return {labels: data.map(item => item.location),
          datasets: [
            {
              label: 'Stolen Vehicles',
              backgroundColor: ['#7a4d5c','#d9b53f','#5a784b','#4c6a7a','#ad826d'],
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: data.map(item => item.count)
            }
          ]}
}
