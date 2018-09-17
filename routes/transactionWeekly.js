var express = require('express');
var router = express.Router();
var transactionHistoryWeekly = require('../models/transactionWeekly');
var UtilityHelper = require('../utility/UtilityHelper');

router.get('/byBus/:id', function (req, res, next) {
    transactionHistoryWeekly.getTransactionHistoryWeeklyById(req.params.id, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});

module.exports = router;