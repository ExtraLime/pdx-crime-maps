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

export const hoods = ['Alameda',
'Arbor Lodge',
'Ardenwald-Johnson Creek',
'Arlington Heights',
'Ashcreek',
'Beaumont-Wilshire',
'Boise',
'Bridgeton',
'Bridlemile',
'Brooklyn',
'Buckman',
'Cathedral Park',
'Centennial',
'Collins View',
'Concordia',
'Creston-Kenilworth',
'Crestwood',
'Cully',
'East Columbia',
'Eastmoreland',
'Eliot',
'Far Southwest',
'Forest Park',
'Foster-Powell',
'Glenfair',
'Goose Hollow',
'Grant Park',
'Hayden Island',
'Hayhurst',
'Hazelwood',
'Hillsdale',
'Hillside',
'Hollywood',
'Homestead',
'Hosford-Abernethy',
'Humboldt',
'Irvington',
'Kenton',
'Kerns',
'King',
'Laurelhurst',
'Lents',
'Linnton',
'Lloyd District',
'Madison South',
'Maplewood',
'Markham',
'Marshall Park',
'Mill Park',
'Montavilla',
'Multnomah',
'North Tabor',
'Northwest District',
'Northwest Heights',
'Overlook',
'Parkrose',
'Parkrose Heights',
'Piedmont',
'Pleasant Valley',
'Portland Downtown',
'Portsmouth',
'Powellhurst-Gilbert',
'Reed',
'Richmond',
'Rose City Park',
'Roseway',
'Russell',
'Sabin',
'Sellwood-Moreland',
'South Burlingame',
'South Portland',
'South Tabor',
'Southwest Hills',
'St. Johns',
"Sullivan's Gulch",
'Sumner',
'Sunderland',
'Sunnyside',
'Sylvan-Highlands',
'University Park',
'Vernon',
'West Portland Park',
'Wilkes',
'Woodland Park',
'Woodlawn',
'Woodstock'];


const entityOptions = crimeData.tweets.map((entityList, i) => entityList.entity);

export const filteredEntityOptions = entityOptions.filter((option, i) => entityOptions.indexOf(option) >= i);

export const crimeIcon = (crime) => crime.text.includes("MED") 
                                      ? medical 
                                      : crime.text.includes("FIRE") || crime.text.includes("Portland Fire")
                                      ? fireman
                                      : police 

export const eventRenderer = (event, crime) => event === "All" ? crime : crime.entity.includes(event);


export const cChartData = (data, crime) => {
  return {labels: data.map(item => item.location),
          datasets: [
            {
              label: crime,
              backgroundColor: ['#030caa','#0410e1','#222efb','#5962fc','#9196fd'],
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: data.map(item => item.count)
            }
          ]}
}

export const nChartData = (data, hood) => {
  return {labels: data.map(item => item.category),
          datasets: [
            {
              label: hood,
              backgroundColor: ['#030caa','#0410e1','#222efb','#5962fc','#9196fd'],
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: data.map(item => item.count)
            }
          ]}
}

export const tChartData = (data, crime) => {
  return {labels: data.map(item => item.location),
          datasets: [
            {
              label: crime,
              backgroundColor: ['#030caa','#0410e1','#222efb','#5962fc','#9196fd'],
              borderColor: 'rgba(0,0,0,1)',
              borderWidth: 2,
              data: data.map(item => item.count)
            }
          ]}
}