var express = require('express');
var router = express.Router();
var transaction=require('../models/transaction');

router.get('/:id?',function(req,res,next){

if(req.params.id){
    transaction.getTaskById(req.params.id,function(err,rows){
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
    transaction.getAllTasks(function(err,rows){

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
    transaction.getDataByIdByType(req.params.id,req.params.type,function (err, result) {
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