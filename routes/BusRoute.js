var express = require('express');
var router = express.Router();
var BusRoute = require('../models/BusRoute');

router.get('/:id?', function (req, res, next) {

    if (req.params.id) {
        BusRoute.getBusRouteById(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
    else {
        BusRoute.getAllBusRoutes(function (err, rows) {

            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }

        });
    }
    router.put('/:id', function (req, res, next) {
        BusRoute.updateBusRoute(req.params.id, req.body, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    });

    router.post('/', function (req, res, next) {
        BusRoute.addBusRoute(req.body, function (err, count) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(req.body);
            }
        });
    });

    router.delete('/:id', function (req, res, next) {
        BusRoute.deleteBusRoute(req.params.id, req.body, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    });
});
router.get('/BusRoute/:id?', function (req, res, next) {

    if (req.params.id) {
        BusRoute.getBusRouteByRoute(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }

    router.put('/:id', function (req, res, next) {
        BusRoute.updateBusRoute(req.params.id, req.body, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    });

    router.post('/', function (req, res, next) {
        BusRoute.addBusRoute(req.body, function (err, count) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(req.body);
            }
        });
    });

    router.delete('/:id', function (req, res, next) {
        BusRoute.deleteBusRoute(req.params.id, req.body, function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    });
});

module.exports = router;