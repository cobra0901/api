var express = require('express');
var router = express.Router();
var BusStop=require('../models/BusStop');

router.get('/:id?',function(req,res,next){

if(req.params.id){
    BusStop.getBusStopById(req.params.id,function(err,rows){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
}
else{
    BusStop.getAllBusStops(function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }

    });
}
});
router.get('/stops/:id?',function(req,res,next){

    if(req.params.id){
        BusStop.getBusStopByStops(req.params.id,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});
router.get('/busroute/:id',function(req,res,next){
    if(req.params.id){
        BusStop.getBusStopByBusRoute(req.params.id,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
    }
});

router.post('/', function (req, res, next) {

    BusStop.addBusStop(req.body, function (err, count) {

        //console.log(req.body);
        if (err) {
            res.json(err);
        }
        else {
            res.json(req.body);//or return count for 1 & 0
        }
    });
});


router.put('/:id', function (req, res, next) {

    BusStop.updateBusStop(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.delete('/:id', function (req, res, next) {
    BusStop.deleteBusStop(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

module.exports=router;
