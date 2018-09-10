var express = require('express');
var router = express.Router();
var { promisify } = require('util');
var user = require('../models/Users');
var card =require('../models/card');
var doesExist = promisify(card.getCardById);

// Add New Card Issue
router.post('/add',function(req,res,next){
    console.log('in add');
    
    let addUser = promisify(user.addNewCardUser);
    let addCard = promisify(card.addNewCardUser);
   
    doesExist(req.body.CardNumber).then(
        (data)=>{
            console.log(data.length);
            
            if(data.length === 0){

                
                addUser(req).then(
                    function(){
                        console.log("1234");
                        
                        addCard(req).then(
                            
                            
                            function() {
                                console.log('card addition')
                                res.json({"message":"The New card Issued Successfully"});
                            }
                        ).catch(
                            function(err){
                                res.json(err);
                            }
                        )
                    }
                )
                .catch(function(err){
                    res.json(err);
                })
            }
            else{
                res.json({"message":"The card Number is already available. Kindly use a new card Number"})
            }
        }
    )
    .catch((err)=>{
        res.json(err);
    })
})

//Update New Card Issue
router.put('/update',function(req,res,next){
    let updateUser = promisify(user.updateNewCardUser); /// Need to add method of models
    let updateCard = promisify(card.updateNewCardUser);

    doesExist(req.body.CardNumber).then(
        (data)=>{
            if(data.length > 0){
                updateUser(req).then(
                    function(){
                         updateCard(req).then(
                            function() {
                                res.json({"message":"The Card id Updated Successfully"});
                             }
                        ).catch(
                            function(err){
                                res.json(err);
                            }
                        )
                    }
                )
                .catch(function(err){
                    res.json(err);
                })
            }else{
                res.json({"message":"The CardNumber is not available, Kindly use a valid CardNumber"})
            }
        }).catch((err)=>{res.json(err)})
})

//Delete New Card Issue
router.delete('/delete',function(req,res,next){
    let deleteUser = promisify(user.deleteNewCardUser); /// Need to add method of models
    let deleteCard = promisify(card.deleteCard);

    doesExist(req.body.CardNumber).then(
        (data)=>{
            if(data.length > 0){
                deleteUser(req).then(
                    function(){
                         deleteCard(req.body.CardNumber).then(
                            function() {
                                res.json({"message":"The Card is deleted Successfully"});
                             }
                        ).catch(
                            function(err){
                                res.json(err);
                            }
                        )
                    }
                )
                .catch(function(err){
                    res.json(err);
                })
            }else{
                res.json({"message":"The CardNumber is not available, Kindly use a valid CardNumber"})
            }
        }).catch((err)=>{res.json(err)})
})


module.exports = router;