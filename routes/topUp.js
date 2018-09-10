var express = require('express');
var { promisify } = require('util');
var router = express.Router();
var card = require('../models/card');
var topup = require('../models/TopupHistory');
var balanceUpdate = promisify(card.updateCardBalance);
//Add Service
router.post('/add', function (req, res, next) {
    console.log(req.body);
    
    var doesExist = promisify(card.getCardById);
    
    doesExist(req.body.CardID).then((row) => {
        console.log(row.length);
        
        if (row.length > 0) {
            addTopUpData(req, res, row);
        } else {
            res.json({"message":"No card can be found with the entered cardId"});
        }
    })
        .catch((err) => { res.json(err) })
})

//Update Service
router.put('/update', function (req, res, next) {
    var doesExist = promisify(card.getCardById);
    doesExist(req.body.CardId).then((row) => {
        if (row.length > 0) {
            updateTopUpData(req, res, row);
        } else {
            res.json({"message":"No card can be found with the entered cardId"});
        }
    })
        .catch((err) => { res.json(err) })
})

//Delete Service
router.delete('/delete', function (req, res, next) {
    var doesExist = promisify(card.getCardById);
    doesExist(req.body.CardId).then((row) => {
        if (row.length > 0) {
            deleteTopUpData(req, res, row);
        } else {
            res.json({"message":"No card can be found with the entered cardId"});
        }
    })
        .catch((err) => { res.json(err) })
})


function addTopUpData(req, res, row) {
    var addTopup = promisify(topup.addTopupHistroy);
    let balance = row[0].Balance + req.body.Amount;
    console.log(`new Balance-->`+balance);
    console.log(req.body.BusID);
    
    balanceUpdate(balance, req.body.CardID)
        .then(() => {
            addTopup(req, row[0].UserID).then(() => { res.json({"message":"Topup successfully Added"}) })
                .catch((err) => { res.json(err) })
        }
        )
        .catch((err) => { res.json(err) });
}

function updateTopUpData(req, res, row) {
    var updateTopup = promisify(topup.updateTopupHistroy);
    let balance = row[0].Balance + req.body.Amount
    console.log(`new balnce`+balance);
    
    balanceUpdate(balance, req.body.CardId)
        .then(() => {
            updateTopup(req, row[0].UserId).then(() => { res.json({"message": "Topup successfully updated"}) })
                .catch((err) => { res.json(err) })
        }
        )
        .catch((err) => { res.json(err) });
}

function deleteTopUpData(req, res, row) {
    var deleteTopup = promisify(topup.deleteTopupHistroy);
    let balance = row[0].Balance;
    balanceUpdate(balance, req.body.CardId)
        .then(() => {
            deleteTopup(req).then(() => { res.json({"message": "Topup successfully deleted"}) })
                .catch((err) => { res.json(err) })
        }
        )
        .catch((err) => { res.json(err) });
}
module.exports = router;