var db=require('../dbconnection');

var RouteFare={

        getAllRouteFares:function(callback){
            return db.query("Select * from routefare",callback);
        },

        getRouteFareByIdByBusRoute:function(id,callback){
            return db.query("select * from routefare where BusRoute=?",[id],callback);
        },
        getRouteFareByIdByFare:function(id,callback){
            return db.query("select * from routefare where Fare=?",[id],callback);
        },
        getRouteFareByIdByFromTo:function(from,to,callback){
            return db.query("select * from routefare where From_route=? and To_route=?",[from,to],callback);
        },
        getRouteFareById:function(id,callback){
            return db.query("select * from routefare where ids=?",[id],callback);
        },


    addRouteFare: function (RouteFare, callback) {

            return db.query("Insert into routefare values(NULL,?,?,?,?,?)", [
                RouteFare.BusRoute, RouteFare.From_route,
                RouteFare.To_route, RouteFare.Fare, RouteFare.FareType], callback);
        },

        updateRouteFare: function (id, RouteFare, callback) {
            return db.query("update routefare set BusRoute=?,From_route=?,To_route=?,Fare=?,FareType=? where id=?", [
                RouteFare.BusRoute, RouteFare.From_route,
                RouteFare.To_route, RouteFare.Fare, RouteFare.FareType,RouteFare.id], callback);
        },

        deleteRouteFare: function (id, RouteFare, callback) {
            return db.query("delete from routefare where id = ?", [id], callback);
        },

        getRouteFareByFareType: function (FareType, callback) {
            return db.query("select * from routefare where FareType=?", [FareType], callback);
        },
        
        getBusesByRoute: function (req, callback) {
            return db.query('SELECT BUSSTOPS.LAT AS BUS_STOP_LAT, BUSSTOPS.LONG AS BUS_STOP_LONG, BUSROUTE.CURLAT, BUSROUTE.CURLONG, TABLE_ROUTEFARE.BUSROUTE, TABLE_ROUTEFARE.FARE FROM TABLE_ROUTEFARE INNER JOIN BUSROUTE ON TABLE_ROUTEFARE.BUSROUTE=BUSROUTE.BUSROUTE INNER JOIN BUSSTOPS ON BUSROUTE.BUSROUTE=BUSSTOPS.BUSROUTE AND TABLE_ROUTEFARE.FROM=BUSSTOPS.STOPS WHERE TABLE_ROUTEFARE.From = ? AND TABLE_ROUTEFARE.To = ?',
            [req.body.Origin,req.body.Destination], callback);
        }
  
};
module.exports=RouteFare;
