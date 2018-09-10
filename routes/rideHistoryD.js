var express = require('express');
var router = express.Router();
var rideHistoryD=require('../models/rideHistoryD');

router.get('/:id?',function(req,res,next){

if(req.params.id){
    rideHistoryD.getTaskById(req.params.id,function(err,rows){
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
    rideHistoryD.getAllTasks(function(err,rows){

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

router.get('/:id/:type/',function (req, res) {
    rideHistoryD.getDataByIdByType(req.params.id,req.params.type,function (err, result) {
        if(err)
        {
            res.json(err);
        }

        else
        {
            res.json(result);
        }
    })
});

module.exports=router;