var db = require('../dbconnection');

var rideHistory = {

    getAllRideHistories: function (callback) {
        return db.query("Select * from ridehistory", callback);
    },
    getRideHistoryById: function (id, callback) {
        return db.query("select * from ridehistory where CardID=?", [id], callback);
    },
    addRideHistory: function (rideHistory, callback) {
        return db.query("Insert into ridehistory values(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            rideHistory.CardID , rideHistory.BusRoute , rideHistory.BusID,
            rideHistory.Entry , rideHistory.Exit , rideHistory.FareCharged,
            rideHistory.Travel_Date, rideHistory.week, rideHistory.Entry_Time,
            rideHistory.Exit_Time, rideHistory.Entry_CardReaderID, rideHistory.Exit_CardReaderID,
            rideHistory.Fare_Type], callback);
    },

    deleteRideHistory: function (id, rideHistory, callback) {
        return db.query("delete from ridehistory where id = ?", [id], callback);
    }

};
module.exports = rideHistory;
