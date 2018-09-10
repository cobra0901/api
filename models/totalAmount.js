var db = require('../dbconnection');

var muflarCommissionWeekly = {
    totalAmountbyWeeklyByBusID: function (dateFilter, id, callback) {
        return db.query('call sp_CalculateTotalAmountByBusId(?,?,?)', [id, dateFilter.startDate, dateFilter.endDate], (error, result) => {
            if (result && result[0]) {
                if (result[0][0]) {
                    const week = result[0][0].week;
                    const year = result[0][0].year;
                    return db.query('select TotalAmount, Week, Year ,Id, BusID, DateStart, DateEnd from muflardb.dtransaction where (Week=? and Year=? and BusID=?) limit 1', [week, year, id], callback)
                }
                else {
                    return callback('No record found.');
                }
            }
            else {
                return callback(error);
            }
        });
    },
};

module.exports = muflarCommissionWeekly;
