const geo = require('./geo_json.json') //this is a static file the function should reference
const updates = require('./new_test.json') //this should be data from the query at 5431

// create a new object with each hood:count
const hoodCount = {}
const hoodNames = []
//extract info from query
for (let i=0;i<updates.length;i++){
    hoodCount[updates[i]['location'].toString()] = updates[i]['count'];
    hoodNames.push(updates[i]['location'].toString())
}
//update the original geojson

for (var i=0; i<geo['features'].length; i++){
    
    var mapLabel = geo['features'][i]['properties']['MAPLABEL'];
    //I don't know how to check for array membership or get object keys
    for (var j=0;j<hoodNames.length;j++){
        if (mapLabel == hoodNames[j]) {
            geo['features'][i]['properties']['count'] = hoodCount[mapLabel];
        }
    }        
}


//information is updated and needs to be exported.
console.log(geo['features'])
