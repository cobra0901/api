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
    },
    signinUser:function(cardnumber, password,callback){
        return db.query("select * from user where CardNumber=? and Password=?", [cardnumber, md5(password)],callback);
        // return db.query("select * from user where CardNumber=?", [cardnumber],callback);
    },
    signupUser: function (Mobile, Users, callback) {
        return db.query("update user set UserID=?,FirstName=?,LastName=?,Email=?,City=?,State=?,Pincode=?,SignUp_Type=?,isEVP=?,Password=?,Created_Date=?,CardNumber=?,Age=?,MaritalStatus=?,Gender=?,Profession=?,Account_Number=?,IFSC=?,AddressLine1=? where Mobile=?", [
            Users.CardNumber, Users.FirstName, Users.LastName, Users.Email, Users.City,
            Users.State, Users.Pincode, Users.SignUp_Type, Users.isEVP, md5(Users.Password), Users.Created_Date, 
            Users.CardNumber,Users.Age, Users.MaritalStatus, Users.Gender, Users.Profession,
            Users.Account_Number, Users.IFSC, Users.AddressLine1,Mobile],callback);
    },
    createCodebyMobile:function(Users,callback){
        var today = Date.now();
        var random =Math.floor(Math.random() * (10000 - 1000)) + 1000;
        var code_int = today * random;
        var isOTP = parseInt(code_int.toString().substr(0,6), 10);
        
        //---------------------Send sms OTP code to User ------------------------

        // const accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
        // const authToken = 'your_auth_token';
        // const client = require('twilio')(accountSid, authToken);

        // client.messages
        // .create({
        //     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        //     from: '+15017122661',
        //     to: '+15558675310'
        // })
        // .then(message => console.log(message.sid))
        // .done();
        return db.query("insert into user (Mobile, isOTP) values (?,?)",[Users.Mobile, isOTP],callback );
    },
    verifyCodebyMobile: function(Users, callback){
        return db.query("select * from user where Mobile=? and isOTP=? ",[Users.Mobile,Users.isOTP],callback);
    },
    getUserBySocial: function (Users, callback) {
        return db.query("select * from user where Email=? and SignUp_Type=?", [Users.Email, Users.SignUp_Type], callback);
    },
    signupBySocial: function (Users, callback) {
        return db.query("Insert into user values(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [Users.CardNumber,
            Users.FirstName, Users.LastName, Users.Email, Users.Mobile, Users.City,
            Users.State, Users.Pincode, Users.SignUp_Type,Users.isEVP, Users.isOTP, 
            md5(Users.Password), Users.Created_Date, Users.Updated_Date, Users.CardNumber, Users.FareType,
            Users.Age,Users.Gender, Users.MaritalStatus, Users.Profession, Users.FirstNameAC, Users.LastNameAC, Users.Account_Number,
            Users.IFSC, Users.AddressLine1,Users.AddressLine2,Users.AddressLine3], callback);
    },
};

module.exports = Users;
