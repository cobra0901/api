var db = require('../dbconnection');

var reportBlock = {

    getAllReportBlocks: function (callback) {

        return db.query("Select * from reportblock", callback);
    },
    getReportBlockById: function (id, callback) {
        return db.query("select * from reportblock where CardID=?", [id], callback);
    },
    addReportBlock: function (reportBlock, callback) {
        return db.query("Insert into reportblock values(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [reportBlock.UserID,
            reportBlock.ReportID, reportBlock.Report_Type, reportBlock.CardID, reportBlock.Credit_Amount, reportBlock.Credit_Type,
            reportBlock.Report_Date, reportBlock.FirstNameAC,reportBlock.LastNameAC, reportBlock.Account_Number, reportBlock.IFSC, reportBlock.AddressLine1, reportBlock.AddressLine2, reportBlock.AddressLine3,
            reportBlock.Pincode], callback);
    },
    updateReportBlock: function (id, reportBlock, callback) {
        return db.query("update reportblock set UserID=?,ReportID=?,Report_Type=?,CardID=?,Credit_Amount=?,Credit_Type=?,Report_Date=?,FirstNameAC=?,Account_Number=?,IFSC=?,AddressLine1=?,Pincode=? where id=?", [
            reportBlock.UserID,reportBlock.ReportID,reportBlock.Report_Type,
            reportBlock.CardID,reportBlock.Credit_Amount,reportBlock.Credit_Type,
            reportBlock.Report_Date, reportBlock.FirstNameAC,reportBlock.Account_Number,
            reportBlock.IFSC,reportBlock.AddressLine1,reportBlock.Pincode,reportBlock.id], callback);
    },
    deleteReportBlock: function (id, reportBlock, callback) {
        return db.query("delete from reportblock where id = ?", [id], callback);
    }

};
module.exports = reportBlock;
