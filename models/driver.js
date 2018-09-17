var db = require('../dbconnection');

var driver = {

    getAllTasks: function (callback) {

        return db.query("Select * from driver", callback);
    },
    getTaskById: function (id, callback) {
        return db.query("select * from driver where Bus_ID=?", [id], callback);
    },
    // updateNewDriver : function (request,callback) {
    //     return db.query("update driver set FirstName=?,LastName=?,Email=?,Mobile=?,FirstNameAC=?,IFSC=?,City=?,State=?,Pincode=?,Age=?,Account_Number=?,AddressLine1=?,Mobile=?,Bus_ID=? where id=?",
    //         [request.body.FirstName,request.body.LastName,request.body.Email,request.body.Mobile,request.body.FirstNameAC,request.body.IFSC,request.body.City,request.body.State,request.body.Pincode,request.body.Age,request.body.Account_Number,request.body.AddressLine1,request.body.Mobile,request.body.Bus_ID,request.body.id],callback);
    // },

    updateReportChangeDevice: function (id, Driver, callback) {
        return db.query("update driver set FirstName=?,LastName=?,Email=?,Mobile=?,City=?,State=?,Pincode=?,Age=?,Updated_Date=?,FirstNameAC=?,LastNameAC=?,Account_Number=?,IFSC=?,AddressLine1=?,AddressLine2=?,AddressLine3=? where id=?", [
            Driver.FirstName, Driver.LastName,
            Driver.Email, Driver.Mobile, Driver.City,
            Driver.State,Driver.Pincode,Driver.Age,Driver.Updated_Date,
            Driver.FirstNameAC,Driver.LastNameAC,Driver.Account_Number,
            Driver.IFSC,Driver.AddressLine1,Driver.AddressLine2,Driver.AddressLine3, Driver.id], callback);
    },

    updateDeactive: function (id, Driver, callback) {
        return db.query("update driver set Updated_Date=? where id=?", [
            Driver.Updated_Date, Driver.id
        ], callback);
    }

};
module.exports = driver;