var express = require('express');
var router = express.Router();
var driver = require('../models/driver');

router.get('/:id?', function (req, res, next) {

    if (req.params.id) {
        driver.getTaskById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
    else {
        driver.getAllTasks(function (err, rows) {

            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
});

router.put('/:id', function (req, res, next) {

    driver.updateReportChangeDevice(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.put('/block/:id', function (req, res, next) {

    driver.updateDeactive(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

module.exports = router;