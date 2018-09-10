var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var routes = require('./routes/index');

//new api's
var rideAmountHistoryWeekly = require('./routes/rideAmountHistoryWeekly');
var TopupHistoryWeekly = require('./routes/TopupHistoryWeekly');
var muflarHistoryWeekly = require('./routes/muflarHistoryWeekly');
var totalAmount = require('./routes/totalAmount');
var transactionWeekly = require('./routes/transactionWeekly');
//var busTracking = require('./routes/busTracking');

var TopupHistory = require('./routes/TopupHistory');
var card = require('./routes/card');
var rideHistory = require('./routes/rideHistory');
var rideHistoryD = require('./routes/rideHistoryD');
var transaction = require('./routes/transaction');
var newIssueCard = require('./routes/newIssueCard');

var Users = require('./routes/Users');
var driver = require('./routes/driver');
var routefare = require('./routes/RouteFare');
var BusStops = require('./routes/BusStop');
var reportService = require('./routes/reportService');
var Bus = require('./routes/Bus');
var dTransaction = require('./routes/dTransaction');
var reportChangeRoute = require('./routes/reportChangeRoute');
var reportBlock = require('./routes/reportBlock');
var BusRoute = require('./routes/BusRoute');
var reportChangeDevice = require('./routes/reportChangeDevice');
var topUp = require('./routes/topUp')
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('/uploads/'));

/*app.use('/resources',express.static(__dirname + '/images'));
So now, you can use http://localhost:5000/resources/myImage.jpg to serve all the images instead of http://localhost:5000/images/myImage.jpg. */
app.use('/', routes);
app.use('/TopupHistory', TopupHistory);
app.use('/dTransaction', dTransaction);
app.use('/Bus', Bus);
app.use('/routefare', routefare);
app.use('/reportChangeRoute', reportChangeRoute);
app.use('/reportChangeDevice', reportChangeDevice);
app.use('/reportService', reportService);
app.use('/BusStops', BusStops);
app.use('/card', card);
app.use('/driver', driver);
app.use('/busroute', BusRoute);
app.use('/Users', Users);
app.use('/reportBlock', reportBlock);
app.use('/rideHistory', rideHistory);
app.use('/rideHistoryD', rideHistoryD);
app.use('/transaction', transaction);
app.use('/transactionWeekly', transactionWeekly);

//new apis
app.use('/rideHistoryWeekly', rideAmountHistoryWeekly);
app.use('/topupHistoryWeekly', TopupHistoryWeekly);
app.use('/muflarHistoryWeekly', muflarHistoryWeekly);
app.use('/totalAmountWeekly', totalAmount);
app.use('/topUp',topUp);
app.use('/newIssueCard',newIssueCard);
//app.use('/busTracking', busTracking);


app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
