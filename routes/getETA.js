var express = require('express');
var router = express.Router();
var { promisify } = require('util');
var routeFare = require('../models/RouteFare');

router.post('/getETA', function (req, res, next) {
    var flag='';
    if (req.body.Destination != '') {
        var  getBusses = promisify(routeFare.getBusesByRoute);
        flag = 'definedRoute';
    }else{
        getBusses = promisify(routeFare.getBusesByOrigin);
        flag = 'undefinedRoute';
        var getDestination = promisify(routeFare.getBusDestination);
    }
        getBusses(req).then(
            async (busdata) => {
                if (busdata.length > 0) {
                    const myArray = busdata;
                    let finalArray = myArray.map(async (value) => {
                        var getETA = promisify(connectingGAPI)
                        const result = await getETA(value);
                        return result;
                    });
                    const resolvedFinalArray = await Promise.all(finalArray).catch(
                        (err)=>{
                            console.log(err);
                        }
                    );
                    var output =  await mapjoint(busdata,resolvedFinalArray);  
                    output.sort(function(a,b){
                        return a.GeoAlgo.durationValue - b.GeoAlgo.durationValue;
                    })
                    if(flag === 'definedRoute'){    
                        res.json({ "BUSROUTE": output[0].BusData.BUSROUTE, "FARE": output[0].BusData.FARE, "ETA": output[0].GeoAlgo.duration, "BUS_ID": output[0].BusData.BUS_ID })
                    }else if(flag === 'undefinedRoute'){
                        getDestination(output[0].BusData.BUSROUTE).then(
                            (destination)=>{                                
                                res.json({ "BUSROUTE": output[0].BusData.BUSROUTE,"ETA": output[0].GeoAlgo.duration, "BUS_ID": output[0].BusData.BUS_ID,"DESTINATION":destination[0].Stops})
                            }
                        ).catch((err)=>{
                            res.json({ "BUSROUTE": output[0].BusData.BUSROUTE,"ETA": output[0].GeoAlgo.duration, "BUS_ID": output[0].BusData.BUS_ID,"DESTINATION":err})
                        })
                    }
                    
                } else { res.json({ "message": "Could not find a bus for this route" }) }
            }
        )
            .catch((err) => { res.json(err) })
    }
)

async function connectingGAPI(busdata, callback) {
    var distance = require('google-distance');
     distance.apiKey = 'AIzaSyC35GkhSA-XIS0xogvvGXgkvaY2bRkNlB8'
    return distance.get(
        {
            origin: busdata.CUTLAT + ',' + busdata.CURLONG,
            destination: busdata.BUS_STOP_LAT + ',' + busdata.BUS_STOP_LONG,
            // mode:'transit',
            // transit_mode:'bus'
        }, callback
    );
}

async function mapjoint(Array1,Array2){
return(
    Array3 = Array2.map( function(x, i){
        return {"BusData": Array1[i], "GeoAlgo": x}        
    }.bind(this))
  )
}

module.exports = router;
