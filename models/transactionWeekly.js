var db = require('../dbconnection');

var transactionHistoryWeekly = {
    getTransactionHistoryWeeklyById: function (busId, callback) {
      //  return db.query('select * from demo.dtransaction where busID=?', [busId], callback);
        return db.query('select * from dtransaction where busID=?', [busId], callback);
    }
};

module.exports = transactionHistoryWeekly;
