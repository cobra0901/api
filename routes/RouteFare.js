var express = require('express');
var router = express.Router();
var RouteFare=require('../models/RouteFare');

router.get('/:id?',function(req,res,next){

if(req.params.id){
    RouteFare.getRouteFareById(req.params.id,function(err,rows){
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
    RouteFare.getAllRouteFares(function(err,rows){

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

router.get('/:id?/BusRoute',function(req,res,next){

    if(req.params.id){
        RouteFare.getRouteFareByIdByBusRoute(req.params.id,function(err,rows){
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

router.get('/:id?/Fare',function(req,res,next){

    if(req.params.id){
        RouteFare.getRouteFareByIdByFare(req.params.id,function(err,rows){
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

router.get('/:from?/:to?/FromTo',function(req,res,next){

        RouteFare.getRouteFareByIdByFromTo(req.params.from,req.params.to,function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });

});

router.post('/', function (req, res, next) {
    RouteFare.addRouteFare(req.body, function (err, count) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(req.body);
        }
    });
});

router.put('/:id', function (req, res, next) {

    RouteFare.updateRouteFare(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.delete('/:id', function (req, res, next) {
    RouteFare.deleteRouteFare(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.get('/FareType/:FareType', function (req, res, next) {
    RouteFare.getRouteFareByFareType(req.params.FareType, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});
module.exports=router;
