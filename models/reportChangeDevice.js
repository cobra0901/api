var db = require('../dbconnection');

var reportChangeDevice = {

    getAllReportChangeDevices: function (callback) {

        return db.query("Select * from reportchangedevice", callback);
    },
    getReportChangeDeviceById: function (id, callback) {
        return db.query("select * from reportchangedevice where ReportID=?", [id], callback);
    },
    addReportChangeDevice: function (ReportChangeDevice, callback) {
        return db.query("Insert into reportchangedevice values(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            ReportChangeDevice.UserID, ReportChangeDevice.ReportID, ReportChangeDevice.Report_Type,
            ReportChangeDevice.Bus_ID, ReportChangeDevice.BusRoute, ReportChangeDevice.Old_CardReaderID1,
            ReportChangeDevice.Old_CardReaderID2,ReportChangeDevice.Old_ControllerID,ReportChangeDevice.Old_AdPanelID,
            ReportChangeDevice.New_CardReaderID1,ReportChangeDevice.New_CardReaderID2,ReportChangeDevice.New_ControllerID,
            ReportChangeDevice.New_AdPanelID,ReportChangeDevice.Report_Date,ReportChangeDevice.Status], callback);
    },
    updateReportChangeDevice: function (id, ReportChangeDevice, callback) {
        return db.query("update reportchangedevice set UserID=?,Report_Type=?,Bus_ID=?,BusRoute=?,Old_CardReaderID1=?, Old_CardReaderID2=?,Old_ControllerID=?,Old_AdPanelID=?,New_CardReaderID1=?,New_CardReaderID2=? ,New_ControllerID=?,New_AdPanelID=?,Report_Date=?,Status=? where ReportID=?", [
            ReportChangeDevice.UserID, ReportChangeDevice.Report_Type,
            ReportChangeDevice.Bus_ID, ReportChangeDevice.BusRoute, ReportChangeDevice.Old_CardReaderID1,
            ReportChangeDevice.Old_CardReaderID2,ReportChangeDevice.Old_ControllerID,ReportChangeDevice.Old_AdPanelID,
            ReportChangeDevice.New_CardReaderID1,ReportChangeDevice.New_CardReaderID2,ReportChangeDevice.New_ControllerID,
            ReportChangeDevice.New_AdPanelID,ReportChangeDevice.Report_Date,ReportChangeDevice.Status, ReportChangeDevice.ReportID], callback);
    },
    deleteReportChangeDevice: function (id, ReportChangeDevice, callback) {
        return db.query("delete from reportchangedevice where ReportID = ?", [id], callback);
    },
    
    getReportChangeDeviceByBusID: function (BusID, callback) {
        return db.query("select * from reportchangedevice where BusID=?", [BusID], callback);
    },

};
module.exports = reportChangeDevice;