
var loadedDataSTOPS = new Array();
var loadedDataSTOP_Times = new Array();
var stop_value_temp = new Array();
var stop_value = new Array();
var value;


getDataSTOPS().then(response => {

    console.log('Fetched Data STOPS');


});

getDataSTOP_TIMES().then(response => {

    console.log('Fetched Data STOP_TIMES');
    
    makeList();

});


function makeList(){

    console.log('loading...');

    for(let i = 0; i<loadedDataSTOPS.length; i++){
           
        if(((loadedDataSTOPS[i+1] > 52.348586) && (loadedDataSTOPS[i+1] < 52.434406))  && ((loadedDataSTOPS[i+2] > 12.986986) && (loadedDataSTOPS[i+2] < 13.144383))){ 

            var value_temp = 0;
            
            for(let k = 0; k<loadedDataSTOP_Times.length; k++){
                //if immer true
                var nr_temp1 = loadedDataSTOPS[i];
                var nr_temp2 = loadedDataSTOP_Times[k];
                
                if(nr_temp1 === nr_temp2){              
                    value_temp = value_temp + 1;
                }

            }
            
            stop_value_temp.push(loadedDataSTOPS[i+1], loadedDataSTOPS[i+2], value_temp);

        }
        
        i=i+2;
    }
    
    formateList();   
    //console.log(stop_value);
    for(let i = 0; i<stop_value.length; i++){
        console.log(stop_value[i], stop_value[i+1], stop_value[i+2]);
        i=i+2;
    }

}

function formateList(){

    for(let i = 0; i<stop_value_temp.length; i++){
        value = stop_value_temp[i+2];
            for(let k = 0; k<stop_value_temp.length; k++){

                if(k != i){

                    if( (stop_value_temp[i] === stop_value_temp[k]) && (stop_value_temp[i+1] === stop_value_temp[k+1]) ){

                        value = value + stop_value_temp[k+2];                     

                    }

                }


                k=k+2
            }
        
        stop_value.push(stop_value_temp[i], stop_value_temp[i+1], value);
        i=i+2


    }

}

async function getDataSTOPS(){

    //gets Data
    const response = await fetch('/old/GTFS/stops.txt');
    const DataStops = await response.text();

    var stop_id;
    var stop_lat;
    var stop_lon;

    const rows = DataStops.split('\n').slice(1);
    rows.forEach(elt=> {


    const row = elt.split(',"');
    
    stop_id = row[0];
    stop_lat = row[3];
    const stop_lonAM = row[4]; //AM: and more

        const row2 = stop_lonAM.split(',');

    stop_lon = row2[0];

    stop_lat = stop_lat.slice(0, -1);
    stop_lon = stop_lon.slice(0, -1);

    loadedDataSTOPS.push(stop_id, stop_lat, stop_lon);
  }); 
}

async function getDataSTOP_TIMES(){

    const response = await fetch('/old/GTFS/stop_times.txt');
    const DataStop_times = await response.text();

    const rows = DataStop_times.split('\n').slice(1);

    rows.forEach(elt =>{      

        const row = elt.split(',');

        var stop_nr = row[3];

        loadedDataSTOP_Times.push(stop_nr);

    });

}