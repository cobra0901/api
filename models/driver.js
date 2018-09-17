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
    },
    signinDriver:function(bus_id, password,callback){
        return db.query("select * from driver where Bus_ID=? and Password=?", [bus_id, md5(password)], callback);
    },

    signupDriver: function (Mobile, Driver, callback) {
        db.query("update driver set Password=?,Created_Date=?,Bus_ID=? where Mobile=?", [
            md5(Driver.Password), Driver.Created_Date, Driver.Bus_ID, Mobile],callback);

        db.query("insert into busroute (Bus_ID, BusRoute) values (?,?)", [Driver.Bus_ID, Driver.BusRoute], callback);
    },

    createCodebyMobile:function(Driver,callback){
        var today = Date.now();
        var random =Math.floor(Math.random() * (10000 - 1000)) + 1000;
        var code_int = today * random;
        var isOTP = parseInt(code_int.toString().substr(0,6), 10);
        
        //---------------------Send sms OTP code to driver ------------------------

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
        return db.query("insert into driver (Mobile, isOTP) values (?,?)",[Driver.Mobile, isOTP],callback );
    },
    verifyCodebyMobile: function(Driver, callback){
        return db.query("select * from driver where Mobile=? and isOTP=? ",[Driver.Mobile, Driver.isOTP],callback);
    }

};
module.exports = driver;