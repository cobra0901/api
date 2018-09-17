var db = require('../dbconnection');

var TopupHistoryWeekly = {
    byWeeklyByBusID: function (dateFilter, busId, callback) {
        return db.query(`call sp_CalculateTopupAmountByBusId(?,?,?)`, [busId, dateFilter.startDate, dateFilter.endDate], (error, result) => {
            if (result && result[0]) {
                if (result[0][0]) {
                    const week = result[0][0].week;
                    const year = result[0][0].year;
                    return db.query(`select topupAmount, Week, Year,Id, BusID, DateStart, DateEnd  from demo.dtransaction where (Week=? and Year=? and BusID=?) limit 1`, [week, year, busId], callback);
                }
                else {
                    return callback(`No record found.`);
                }
            }
            else {
                return callback(error);
            }
        });
    }
}

module.exports = TopupHistoryWeekly;
