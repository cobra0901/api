var db=require('../dbconnection');

var rideHistoryD={

    getAllTasks:function(callback){

    return db.query("Select * from ridehistory",callback);
    },
    getTaskById:function(id,callback){
        return db.query("select * from ridehistory where BusID=?",[id],callback);
    },
    getDataByIdByType:function (id, type, callback) {
        return db.query("select * from ridehistory where BusID=? and Fare_Type=?",[id,type],callback);
    }
};

module.exports=rideHistoryD;
