var express = require('express');
var router = express.Router();
var card = require('../models/card');

router.get('/:id?', function (req, res, next) {

    if (req.params.id) {
        card.getCardById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
    else {
        card.getAllCards(function (err, rows) {

            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }

        });
    }
});

router.post('/', function (req, res, next) {
    card.addCard(req.body, function (err, count) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(req.body);
        }
    });
});

router.put('/:id', function (req, res, next) {

    card.updateCard(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.put('/block/:id', function (req, res, next) {

    card.updateDeactive(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.delete('/:id', function (req, res, next) {
    card.deleteCard(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.get('/IsBlock/:IsBlock', function (req, res, next) {
    card.getCardByIsBlock(req.params.IsBlock, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });

});

router.get('/FareType/:FareType', function (req, res, next) {
    card.getCardByFareType(req.params.FareType, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });

});
module.exports = router;