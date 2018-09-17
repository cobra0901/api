var express = require('express');
var router = express.Router();
var { promisify } = require('util');
var routeFare = require('../models/RouteFare');

router.post('/getETA', function (req, res, next) {
    let getBusses = promisify(routeFare.getBusesByRoute);

    getBusses(req).then(
        async (busdata) => {
            console.log(busdata);
            
            if (busdata.length > 0) {
                const myArray = busdata;
                let finalArray = myArray.map(async (value) => {
                    var getETA = promisify(connectingGAPI)
                    const result = await getETA(value);
                    return result;
                });
                const resolvedFinalArray = await Promise.all(finalArray);
                resolvedFinalArray.sort(function (a, b) {
                    return a.durationValue - b.durationValue;
                })
                res.json({"BUSROUTE": busdata[0].BUSROUTE,"FARE": busdata[0].FARE,"ETA": resolvedFinalArray[0].duration,"BUS_ID": busdata[0].BUS_ID })
            } else { res.json({ "message": "Could not find a bus for this route" }) }
        }
    )
        .catch((err) => {res.json(err)})
})

async function connectingGAPI(busdata, callback) {
    var distance = require('google-distance');
    console.log(busdata.CURLAT);
    // distance.apiKey = 'AIzaSyC35GkhSA-XIS0xogvvGXgkvaY2bRkNlB8'
    return distance.get(
        {
            origin: busdata.CURLAT + ',' + busdata.CURLONG,
            destination: busdata.BUS_STOP_LAT + ',' + busdata.BUS_STOP_LONG,
            // mode:'transit',
            // transit_mode:'bus'
        }, callback
    );
}

module.exports = router;
