var express = require('express');
var router = express.Router();
var rideHistoryModel = require('../models/rideAmountHistoryWeekly');
var UtilityHelper = require('../utility/UtilityHelper')

// get topup history by bus id
router.get('/byBus/:busId', function name(req, res) {
    const dateFilter = UtilityHelper.getStartEndDateByWeek(req);
    rideHistoryModel.byWeeklyByBusID(dateFilter, req.params.busId, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

router.get('/byBus/:busId/:fareType', function name(req, res) {
    const dateFilter = UtilityHelper.getStartEndDateByWeek(req);
    rideHistoryModel.byWeeklyByFareType(dateFilter, req.params.busId, req.params.fareType, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

module.exports = router;
