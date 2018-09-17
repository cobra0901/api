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

router.get('/signin/:cardnumber/:password?', function (req, res, next) {
    Users.signinUser(req.params.cardnumber, req.params.password, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows[0]); }
    });
});

router.post('/createcode', function (req, res, next) {
    Users.createCodebyMobile(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});
router.post('/verifycode', function (req, res, next) {
    Users.verifyCodebyMobile(req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows[0]); }
    });
});
router.put('/signup/:Mobile', function (req, res, next) {
    Users.signupUser(req.params.Mobile, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else {
            Users.getUserByCardNumber(req.body.CardNumber, function (err, rows) {
                if (err) { res.json(err); }
                else { res.json(rows[0]); }
            });
        }
    });
});
router.post('/signupBySocial', function (req, res, next) {
    Users.getUserBySocial(req.body, function (err, rows) {
        if (err) { res.json(err); }
        else {
            if(rows.length >0)
            {
                res.json(rows[0])
            }else{
                Users.signupBySocial(req.body, function(err, rows){
                    if(err) {res.json(err);}
                    else {
                        Users.getUserBySocial(req.body, function (err, rows) {
                            if (err) { res.json(err); }
                            else {res.json(rows[0])}
                        });
                    }
                });
            } 
        }
    });
});

module.exports=router;
