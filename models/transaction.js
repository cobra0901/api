var db=require('../dbconnection');

var transaction={

    getAllTasks:function(callback){

    return db.query("Select * from ridehistory",callback);
    },
    getTaskById:function(id,callback){
        return db.query("select SUM(FareCharged) as transaction, week, Fare_Type from ridehistory where BusID=? GROUP BY Fare_Type,week",[id],callback);
    },
    getDataByIdByType:function (id, type, callback) {
        return db.query("select SUM(FareCharged) as AFC_Cal,week,Fare_Type from ridehistory where BusID=? and Fare_Type=? GROUP BY week",[id,type],callback);
    }
};

module.exports=transaction;
