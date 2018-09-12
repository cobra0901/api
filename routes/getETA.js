var express = require('express');
var router = express.Router();
var { promisify } = require('util');
var routeFare = require('../models/RouteFare');

router.post('/getETA', function (req, res, next) {
    let getBusses = promisify(routeFare.getBusesByRoute);

    getBusses(req).then(
        (busdata) => {
            if (busdata.length > 0) {
                // console.log(busdata);
                var busETAs = promisify(connectingGAPI);
                for (let b = 0; b < busdata.length;b++) {
                    busETAs(busdata).then((data) => {
                        console.log(data.length);
                        if (data.length > 1) {
                            data.sort(function (a, b) {
                                return a.durationValue = b.durationValue;
                            })
                            res.json({"BUS_ROUTE":busdata[0].BUSROUTE,"BUS_FARE":busdata[0].FARE, "ETA": data[0].duration });
                        }
                        res.json({ "BUS_ROUTE":busdata[0].BUSROUTE,"BUS_FARE":busdata[0].FARE,"ETA": data.duration });

                    })
                        .catch((err) => { res.json(err) })
                }



                // for(let i=0;i>=busList.length;i++){

                // }
            } else { res.json({ "message": "Could not find a bus for this route" }) }
        }
    )
        .catch((err) => { res.json(err) })
})

function connectingGAPI(busdata, callback) {
    var distance = require('google-distance');
    console.log('inside the fucntion');

    for (let i = 0; i < busdata.length; i++) {
        return distance.get(
            {
                origin: busdata[i].CURLAT + ',' + busdata[i].CURLONG,// Bus Location
                destination: busdata[i].BUS_STOP_LAT + ',' + busdata[i].BUS_STOP_LONG// User Origin Location the bust stop location
                // mode:'transit',
                // transit_mode:'bus'
            }, callback
        );
    }
}


module.exports = router;
