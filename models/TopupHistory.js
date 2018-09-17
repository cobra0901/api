var db = require('../dbconnection');

var TopupHistory = {

    getAlltopuphistories: function (callback) {
        return db.query("Select * from topuphistory", callback);
    },
    gettopuphistoryByCardID: function (id, callback) {
        return db.query("select * from topuphistory where CardID=?", [id], callback);
    }
    ,gettopuphistoryByBusID: function (id, callback) {
        return db.query("select * from topuphistory where BusID=?", [id], callback);
    },
    addTopupHistroy: function (topup, UserId ,callback) {
        return db.query("insert into topuphistory(UserID,CardId,BusRoute,BusID,Amount,Recharge_Date,Recharge_Time,CardReaderID) values(?,?,?,?,?,?,?,?)",
        [UserId,topup.body.CardID,topup.body.BusRoute,topup.body.BusID,topup.body.Amount,
        topup.body.Recharge_Date,topup.body.Recharge_Time,topup.body.CardReaderID], callback)
    },
    updateTopupHistroy: function(topup, UserId ,callback) {
        return db.query("update topuphistory set UserID=?,BusRoute=?,BusID=?,Amount=?,Recharge_Date=?,Recharge_Time=?,CardReaderID=? where CardId=?",
        [UserId,topup.body.BusRoute,topup.body.BusId,topup.body.Amount,
        topup.body.Recharge_Date,topup.body.Recharge_Time,topup.body.CardReaderId,topup.body.CardId], callback)
    },
    deleteTopupHistroy: function(topup,callback) {
        return db.query("delete from topuphistory where CardID=?",
        [topup.body.CardId], callback)
    }
};
module.exports = TopupHistory;
