var db = require('../dbconnection');

var Buses = {
    getAllBuses: function (callback) {
        return db.query("Select * from bus", callback);
    },
    getBusById: function (id, callback) {
        return db.query("select * from bus where Bus_ID=?", [id], callback);
    },
    addBus: function (Buses, callback) {
        return db.query("Insert into bus values(NULL,?,?,?,?,?,?,?)", [
            Buses.Bus_ID, Buses.Owner, Buses.Driver, Buses.Card_Reader_ID1,
            Buses.Card_Reader_ID2, Buses.Controller_ID,Buses.AdPanelID], callback);
    },
    updateBus: function (id, Buses, callback) {
        return db.query("update bus set Bus_ID=?,FirstName=?,LastName=?,Card_Reader_ID1=?,Card_Reader_ID2=?,Controller_ID=?,AdPanelID=? where id=?", [
            Buses.Bus_ID, Buses.FirstName,Buses.LastName, Buses.Card_Reader_ID1, Buses.Card_Reader_ID2,
            Buses.Controller_ID,Buses.AdPanelID, Buses.id], callback);
    },
    deleteBus: function (id, Buses, callback) {
        return db.query("delete from bus where Bus_ID = ?",[id], callback);
    }
};
module.exports = Buses;
