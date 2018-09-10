var express = require('express');
var router = express.Router();
var TopupHistory=require('../models/TopupHistory');

router.get('/',function(req,res,next){

        TopupHistory.getAlltopuphistories(function(err,rows){
            if(err)
            {
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
});

router.get('/CardID/:id?',function(req,res,next){

    if(req.params.id){
        TopupHistory.gettopuphistoryByCardID(req.params.id,function(err,rows){
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

router.get('/BusID/:id?',function(req,res,next){

    if(req.params.id){
        TopupHistory.gettopuphistoryByBusID(req.params.id,function(err,rows){
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

module.exports=router;
