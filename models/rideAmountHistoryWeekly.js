var db = require('../dbconnection');

var RideHistoryWeekly = {
    byWeeklyByBusID: function (dateFilter, busId, callback) {
        return db.query(`call sp_CalculateRideAmountByBusId(?,?,?)`, [busId, dateFilter.startDate, dateFilter.endDate], (error, result) => {
            if (result && result[0]) {
                if (result[0][0]) {
                    const week = result[0][0].week;
                    const year = result[0][0].year;
                    return db.query(`select Id, BusID, DateStart, DateEnd,rideAmount, Week, Year  from demo.dtransaction where (Week=? and Year=? and BusID=?) limit 1`, [week, year, busId], callback);
                }
                else {
                    return callback(`No record found.`);
                }
            }
            else {
                console.log(error)
                return callback(error);
            }
        });
    },

    byWeeklyByFareType: function (dateFilter, busId, fareType, callback) {
        return db.query(`call sp_CalculateRideAmountByBusIdFareType('${busId}','${fareType}','${dateFilter.startDate}','${dateFilter.endDate}')`, (error, result) => {
            if (result && result[0]) {
                if (result[0][0]) {
                    const week = result[0][0].week;
                    const year = result[0][0].year;
                    return db.query(`select Id, BusID, DateStart, DateEnd,rideAmount, Week, Year  from demo.dtransaction where (Week=? and Year=? and BusID=? and Fare_Type=?) limit 1`, [week, year, busId, fareType], callback)
                }
                else {
                    return callback(`No record found.`);
                }
            }
            else {
                console.log(error)
                return callback(error);
            }
        });
    }
};
module.exports = RideHistoryWeekly;
