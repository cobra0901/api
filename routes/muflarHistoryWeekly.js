var express = require('express');
var router = express.Router();
var muflarCommissionWeeklyHistory = require('../models/muflarCommissionWeeklyHistory');
var UtilityHelper = require('../utility/UtilityHelper')

router.get('/byBus/:busId', function (req, res) {
    const dateFilter = UtilityHelper.getStartEndDateByWeek(req);
    muflarCommissionWeeklyHistory.byWeeklyByBusID(dateFilter, req.params.busId, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    })
});

module.exports = router;