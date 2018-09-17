var express = require('express');
var router = express.Router();
var reportBlock=require('../models/reportBlock');

router.get('/:id?',function(req,res,next){

if(req.params.id){
    reportBlock.getReportBlockById(req.params.id,function(err,rows){
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
    reportBlock.getAllReportBlocks(function(err,rows){

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

    reportBlock.addReportBlock(req.body, function (err, count) {

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

    reportBlock.updateReportBlock(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.delete('/:id', function (req, res, next) {
    reportBlock.deleteReportBlock(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

module.exports=router;
