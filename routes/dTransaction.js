var express = require('express');
var router = express.Router();
var dTransaction=require('../models/dTransaction');

router.get('/:id?',function(req,res,next){

if(req.params.id){
    dTransaction.getTaskById(req.params.id,function(err,rows){
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
    dTransaction.getAllTasks(function(err,rows){

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
module.exports=router;