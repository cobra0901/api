var db=require('../dbconnection');

var dTransaction={

getAllTasks:function(callback){

return db.query("Select * from dtransaction",callback);
},
getTaskById:function(id,callback){
    return db.query("select * from dtransaction where BusID=?",[id],callback);
},

};
module.exports=dTransaction;