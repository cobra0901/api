var express = require('express');
var router = express.Router();
var reportChangeDevice = require('../models/reportChangeDevice');

router.get('/:id?', function (req, res, next) {

    if (req.params.id) {
        reportChangeDevice.getReportChangeDeviceById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
    else {
        reportChangeDevice.getAllReportChangeDevices(function (err, rows) {

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
    reportChangeDevice.addReportChangeDevice(req.body, function (err, count) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(req.body);
        }
    });
});

router.put('/:id', function (req, res, next) {

    reportChangeDevice.updateReportChangeDevice(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.delete('/:id', function (req, res, next) {
    reportChangeDevice.deleteReportChangeDevice(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.get('/BusID/:BusID', function (req, res, next) {
    reportChangeDevice.getReportChangeDeviceByBusID(req.params.BusID, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});
module.exports = router;