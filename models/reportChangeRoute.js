var db = require('../dbconnection');

var reportChangeRoute = {

    getAllReportChangeRoutes: function (callback) {

        return db.query("Select * from reportchangeroute", callback);
    },
    getReportChangeRouteById: function (id, callback) {
        return db.query("select * from reportchangeroute where ReportID=?", [id], callback);
    },
    addReportChangeRoute: function (reportChangeRoute, callback) {
        return db.query("Insert into reportchangeroute values(NULL,?,?,?,?,?,?,?,?,?)", [
            reportChangeRoute.UserID, reportChangeRoute.ReportID, reportChangeRoute.Report_Type,
            reportChangeRoute.Bus_ID, reportChangeRoute.New_Route, reportChangeRoute.TransferBusID,
            reportChangeRoute.Report_Date,reportChangeRoute.Status,reportChangeRoute.New_UserID], callback);
    },
    updateReportChangeRoute: function (id, reportChangeRoute, callback) {
        return db.query("update reportchangeroute set UserID=?,Report_Type=?,Bus_ID=?,New_Route=?,TransferBusID=?,Report_Date=?,Status=?,New_UserID=? where ReportID=?", [
            reportChangeRoute.UserID, reportChangeRoute.Report_Type,
            reportChangeRoute.Bus_ID, reportChangeRoute.New_Route, reportChangeRoute.TransferBusID,
            reportChangeRoute.Report_Date,reportChangeRoute.Status,reportChangeRoute.New_UserID, reportChangeRoute.ReportID], callback);
    },
    deleteReportChagneRoute: function (id, reportChangeRoute, callback) {
        return db.query("delete from reportchangeroute where ReportID = ?", [id], callback);
    },

    getReportChangeRouteByBusID: function (BusID, callback) {
        return db.query('select * from reportchangeroute where BusID=?', [BusID], callback);
    },

};
module.exports = reportChangeRoute;