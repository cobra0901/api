var db = require('../dbconnection');

var muflarCommissionWeekly = {
    byWeeklyByBusID: function (dateFilter, id, callback) {
        return db.query(`call sp_CalculateMuflarCommissionByBusId(?,?,?)`, [id, dateFilter.startDate, dateFilter.endDate], (error, result) => {
            if (result && result[0]) {
                if (result[0][0]) {
                    const week = result[0][0].week;
                    const year = result[0][0].year;
                    return db.query(`select Id, BusID, DateStart, DateEnd,MuflarCommission, Week, Year  from demo.dtransaction where (Week=? and Year=? and BusID=?) limit 1`, [week, year, id], callback)
                }
                else {
                    return callback(`No record found.`);
                }
            }
            else {
                return callback(error);
            }
        });
    },

    totalAmountbyWeeklyByBusID: function (dateFilter, id, callback) {
        return db.query(`call sp_CalculateTotalAmountByBusId(?,?,?)`, [id, dateFilter.startDate, dateFilter.endDate], (error, result) => {
            if (result && result[0]) {
                if (result[0][0]) {
                    const week = result[0][0].week;
                    const year = result[0][0].year;
                    return db.query(`select Id, BusID, DateStart, DateEnd,TotalAmount, Week, Year from demo.dtransaction where (Week=? and Year=? and BusID=?) limit 1`, [week, year, id], callback)
                }
                else {
                    return callback(`No record found.`);
                }
            }
            else {
                return callback(error);
            }
        });
    },
};

module.exports = muflarCommissionWeekly;
