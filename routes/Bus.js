var express = require('express');
var router = express.Router();
var Buses=require('../models/busbus');

router.get('/:id?',function(req,res,next){

if(req.params.id){
    Buses.getBusById(req.params.id,function(err,rows){
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
    Buses.getAllBuses(function(err,rows){

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

    router.put('/:id', function (req, res, next) {
        Buses.updateBus(req.params.id, req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    });

    router.post('/', function (req, res, next) {
        Buses.addBus(req.body, function (err, count) {
            if (err) { res.json(err);}
            else { res.json(req.body); }
        });
    });

    router.delete('/:id', function (req, res, next) {
        Buses.deleteBus(req.params.id, req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    });
});

module.exports=router;