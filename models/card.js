var db = require('../dbconnection');

var card = {

    getAllCards: function (callback) {
        return db.query("Select * from card", callback);
    },
    getCardById: function (id, callback) {
        return db.query("select * from card where CardNumber=?", [id], callback);
    },
    addCard: function (card, callback) {
        return db.query("Insert into card values(NULL,?,?,?,?,?,?,?,?,?)", [
            card.UserID, card.FirstName, card.Isblock, card.ValidFrom, card.ValidTo, card.Balance, card.CardNumber,
        card.LastName, card.FareType], callback);
    },
    updateCard: function (id, card, callback) {
        return db.query("update card set UserID=?,FirstName=?,LastName=?,Isblock=?,ValidFrom=?,ValidTo=?,Balance=?,FareType=? where CardNumber=?", [
            card.UserID, card.FirstName, card.LastName, card.Isblock, card.ValidFrom, card.ValidTo, card.Balance,card.FareType, card.CardNumber
        ], callback);
    },
    updateDeactive: function (id, card, callback) {
        return db.query("update card set Isblock=?,ValidTo=? where CardNumber=?", [
            card.Isblock, card.ValidTo, card.CardNumber
        ], callback);
    },
    deleteCard: function (id, callback) {
        return db.query("delete from card where CardNumber = ?", [id], callback);
    },

    getCardByIsBlock: function (IsBlock, callback) {
        return db.query("select * from card where Isblock=?", [IsBlock], callback);
    },

    getCardByFareType: function (FareType, callback) {
        return db.query("select * from card where FareType=?", [FareType], callback);
    },
    updateCardBalance: function (balance,id, callback) {
        return db.query("update card set Balance=? where CardNumber=?", [balance,id], callback);
    },
    addNewCardUser: function(request, callback) {
        return db.query("Insert into card(FirstName,LastName,FareType,CardNumber,IsBlock,ValidFrom,ValidTo,Balance) values(?,?,?,?,?,?,?,?)",
        [request.body.FirstName,request.body.LastName,request.body.FareType,request.body.CardNumber,
            request.body.IsBlock,request.body.ValidFrom,request.body.ValidTo,0],
        callback);
    },
    updateNewCardUser: function(request, callback) {
        return db.query("update card set FirstName=?,LastName=?,FareType=?,IsBlock=?,ValidFrom=?,ValidTo=? where CardNumber=?",
        [request.body.FirstName,request.body.LastName,request.body.FareType,request.body.IsBlock,request.body.ValidFrom,request.body.ValidTo,request.body.CardNumber],
        callback);
    },
};

module.exports = card;
