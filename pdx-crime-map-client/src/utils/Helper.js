import { police, fireman, medical } from '../data/Icons';

export const crimeIcon = (crime) => crime.text.includes("MED") 
                                      ? medical 
                                      : crime.text.includes("FIRE") || crime.text.includes("Portland Fire")
                                      ? fireman
                                      : police 

export const eventRenderer = (event, crime) => event === "All" ? crime : crime.entity.includes(event);

export const choroplethChartData = (data, crime) => {
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

export const neighborhoodsChartData = (data, hood) => {
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
