var express = require('express');
var router = express.Router();
var reportChangeRoute=require('../models/reportChangeRoute');

router.get('/:id?',function(req,res,next){

if(req.params.id){
    reportChangeRoute.getReportChangeRouteById(req.params.id,function(err,rows){
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
    reportChangeRoute.getAllReportChangeRoutes(function(err,rows){

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

router.post('/', function (req, res, next) {
    reportChangeRoute.addReportChangeRoute(req.body, function (err, count) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(req.body);
        }
    });
});

router.put('/:id', function (req, res, next) {

    reportChangeRoute.updateReportChangeRoute(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.delete('/:id', function (req, res, next) {
    reportChangeRoute.deleteReportChagneRoute(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.get('/BusID/:BusID', function (req, res, next) {
    reportChangeRoute.getReportChangeRouteByBusID(req.params.BusID, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });

});
module.exports=router;