var db = require('../dbconnection');

var BusStop = {

    getAllBusStops: function (callback) {
        return db.query("Select * from busstops", callback);
    },

    getBusStopById: function (id, callback) {
        return db.query("select * from busstops where BusRoute=?", [id], callback);
    },

    getBusStopByStops: function (id, callback) {
        return db.query("select * from busstops where Stops=?", [id], callback);
    },
    getBusStopByBusRoute: function (id, callback) {
        return db.query("select * from busstops where BusRoute=?", [id], callback);
    },
    addBusStop: function (BusStop, callback) {

        return db.query("Insert into busstops values(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            BusStop.BusRoute,BusStop.Stops,
            BusStop.Lat, BusStop.Longtitude,
            BusStop.GPS_Location_1, BusStop.GPS_Location_2,
            BusStop.Poly_Cord_lat1, BusStop.Poly_Cord_long1,
            BusStop.Poly_Cord_lat2, BusStop.Poly_Cord_long2,
            BusStop.Poly_Cord_lat3, BusStop.Poly_Cord_long3,
            BusStop.Poly_Cord_lat4, BusStop.Poly_Cord_long4,
            BusStop.Poly_Cord_lat5, BusStop.Poly_Cord_long5,
            BusStop.Poly_Cord_lat6, BusStop.Poly_Cord_long6,
            BusStop.Poly_Cord_lat7, BusStop.Poly_Cord_long7,
            BusStop.Poly_Cord_lat8, BusStop.Poly_Cord_long8,
            BusStop.Poly_Cord_lat9, BusStop.Poly_Cord_long9,
            BusStop.Poly_Cord_lat10, BusStop.Poly_Cord_long10], callback);

    },
    updateBusStop: function (id, BusStop, callback) {
        return db.query("update busstops set Stops=?, BusRoute=?, GPS_Location_1=?,GPS_Location_2=?,Lat=?,Longtitude=?,Poly_Cord_lat1=?,Poly_Cord_long1=?,Poly_Cord_lat2=?,Poly_Cord_long2=?,Poly_Cord_lat3=?,Poly_Cord_long3=?,Poly_Cord_lat4=?,Poly_Cord_long4=?,Poly_Cord_lat5=?,Poly_Cord_long5=?,Poly_Cord_lat6=?,Poly_Cord_long6=?,Poly_Cord_lat7=?,Poly_Cord_long7=?,Poly_Cord_lat8=?,Poly_Cord_long8=?,Poly_Cord_lat9=?,Poly_Cord_long9=?,Poly_Cord_lat10=?,Poly_Cord_long10=? where id=?", [
            BusStop.Stops, BusStop.BusRoute, BusStop.GPS_Location_1, BusStop.GPS_Location_2,BusStop.Lat,BusStop.Longtitude,
            BusStop.Poly_Cord_lat1, BusStop.Poly_Cord_long1,
            BusStop.Poly_Cord_lat2, BusStop.Poly_Cord_long2,
            BusStop.Poly_Cord_lat3, BusStop.Poly_Cord_long3,
            BusStop.Poly_Cord_lat4, BusStop.Poly_Cord_long4,
            BusStop.Poly_Cord_lat5, BusStop.Poly_Cord_long5,
            BusStop.Poly_Cord_lat6, BusStop.Poly_Cord_long6,
            BusStop.Poly_Cord_lat7, BusStop.Poly_Cord_long7,
            BusStop.Poly_Cord_lat8, BusStop.Poly_Cord_long8,
            BusStop.Poly_Cord_lat9, BusStop.Poly_Cord_long9,
            BusStop.Poly_Cord_lat10, BusStop.Poly_Cord_long10, BusStop.id], callback);
    },
    deleteBusStop: function (id, BusStop, callback) {
        return db.query("delete from busstops where Stops = ?", [id], callback);
    }

};
module.exports = BusStop;
