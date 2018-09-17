var db = require('../dbconnection');
var moment = require('moment');
var date = moment().format('DD-MMM-YY');

var Users = {
    getAllUsers: function (callback) {
        return db.query("select * from user", callback);
    },
    getUserById: function (id, callback) {
        return db.query("select * from user where CardNumber=?", [id], callback);
    },
    // addUser: function (Users, callback) {
    //     return db.query("Insert into user values(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [Users.UserID,
    //         Users.FirstName, Users.LastName, Users.Email, Users.Mobile, Users.City,
    //         Users.State, Users.Pincode, Users.SignUp_Type, Users.isEVP, Users.isOTP,
    //         Users.Password, Users.Created_Date, Users.Updated_Date, Users.CardNumber,
    //         Users.Age,Users.Gender, Users.MaritalStatus, Users.Profession, Users.FirstNameAC, Users.Account_Number,
    //         Users.IFSC, Users.AddressLine1], callback);
    // },
    updateUser: function (id, Users, callback) {
        return db.query("update user set FirstName=?,LastName=?,Email=?,Mobile=?,City=?,State=?,Pincode=?,Age=?,Gender=?,MaritalStatus=?,Profession=?,FirstNameAC=?,LastNameAC=?,Account_Number=?,IFSC=?,AddressLine1=?,AddressLine2=?,AddressLine3=? where UserID=?", [
            Users.FirstName, Users.LastName, Users.Email, Users.Mobile, Users.City,
            Users.State, Users.Pincode,
            Users.Age,Users.Gender, Users.MaritalStatus, Users.Profession, Users.FirstNameAC,Users.LastNameAC, Users.Account_Number,
            Users.IFSC, Users.AddressLine1,Users.AddressLine2,Users.AddressLine3,Users.UserID], callback);
    },
    deleteUser: function (id, Users, callback) {
        return db.query("delete from user where UserID = ?",[id], callback);
    },
    addNewCardUser : function (request,callback) {
        console.log('query call');
        
        return db.query("Insert into user(FirstName,LastName,Age,FareType,CardNumber,Created_Date,Gender) values(?,?,?,?,?,?,?)",
        [request.body.FirstName, request.body.LastName, request.body.Age, request.body.FareType, request.body.CardNumber,date,request.body.Gender],callback);
    },
    updateNewCardUser : function (request,callback) {
        return db.query("update user set FirstName=?,UserID=?,LastName=?,Age=?,FareType=? where CardNumber=?",
        [request.body.FirstName,request.body.UserID,request.body.LastName,request.body.Age,request.body.FareType,request.body.CardNumber],callback);
    },
    deleteNewCardUser : function (request,callback) {
        return db.query("delete from user where CardNumber=?",
        [request.body.CardNumber],callback);
    }
};

module.exports = Users;
