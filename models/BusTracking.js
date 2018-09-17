var db = require('../dbconnection');

module.exports = {
    getAllBusStops: function (callback) {
        return db.query("Select * from busstops", callback);
    }
};
