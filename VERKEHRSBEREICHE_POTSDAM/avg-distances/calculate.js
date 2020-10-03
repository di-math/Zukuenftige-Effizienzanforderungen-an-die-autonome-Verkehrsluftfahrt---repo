var loadedData = new Array();

var avg_count = 0;
var avg_denom = 0;


console.log("Loading...");

getData().then(response => {

console.log("Fetched data");

calculate();

})

function calculate(){

for(let i = 0; i<loadedData.length; i++){

    const weight_temp = loadedData[i];
    const lat_temp = loadedData[i+1];
    const lon_temp = loadedData[i+2];

    for(let k = 0; k<loadedData.length; k++){

    const weight_temp2 = loadedData[k];
    const lat_temp2 = loadedData[k+1];
    const lon_temp2 = loadedData[k+2];

    var difference_X = (lat_temp - lat_temp2)*111.3;
    difference_X = Math.abs(difference_X);

    var difference_Y = lon_temp - lon_temp2;
    difference_Y = Math.abs(difference_Y)*71.5;


    const distance = Math.sqrt((difference_X^2)+(difference_Y^2));

    console.log(distance);
    avg_count=avg_count+distance;
    avg_denom=avg_denom+1;
    k = k + 2;

    }

        i = i+2;
}

console.log(avg_denom);
alert(avg_count/avg_denom + "km");
}

async function getData(){

    const response = await fetch('stops_valued.csv');
    const Data = await response.text();


    var stop_weight;
    var stop_lat;
    var stop_lon;

    const rows = Data.split('\n');
    rows.forEach(elt=> {


    const value = elt.split(',"');

    
    
    stop_weight = value[2];
    stop_lat = value[0];
    stop_lon = value[1]; 


    

    stop_lat = stop_lat.slice(1, -1);
    stop_lon = stop_lon.slice(0, -1);
    stop_weight = stop_weight.slice(0, -2);
    
    loadedData.push(stop_weight, stop_lat, stop_lon);
    });  

}