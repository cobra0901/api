var express = require('express');
var router = express.Router();
var reportService = require('../models/reportService');

router.get('/:id?', function (req, res, next) {

    if (req.params.id) {
        reportService.getReportServiceById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
    else {
        reportService.getAllReportServices(function (err, rows) {

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
    reportService.addReportService(req.body, function (err, count) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(req.body);
        }
    });
});

router.put('/:id', function (req, res, next) {

    reportService.updateReportService(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.delete('/:id', function (req, res, next) {
    reportService.deleteReportService(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.get('/BusID/:BusID', function (req, res, next) {
    reportService.getReportServiceByBusID(req.params.BusID, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});
module.exports = router;