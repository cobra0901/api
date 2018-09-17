var express = require('express');
var router = express.Router();
var Users=require('../models/Users');

router.get('/:id?',function(req,res,next){
    if(req.params.id){
            Users.getUserById(req.params.id,function(err,rows){
                if(err){ res.json(err); }
                else{ res.json(rows);  }
            });}
    else{
           Users.getAllUsers(function(err,rows){
                if(err) { res.json(err); }
                else    { res.json(rows); } });}
});

router.put('/:id', function (req, res, next) {
    Users.updateUser(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/', function (req, res, next) {
    Users.addUser(req.body, function (err, count) {
        if (err) { res.json(err);}
        else { res.json(req.body); }
    });
});

router.delete('/:id', function (req, res, next) {
    Users.deleteUser(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

module.exports=router;
