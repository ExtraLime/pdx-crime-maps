import * as crimeData from "./data/pdx-crime-data.json";
import { police, fireman, medical } from './Icons'

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