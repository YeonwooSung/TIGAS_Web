var express = require('express');
var app = express();
var createError = require("http-errors");

let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

//basic setups
app.use(logger('dev'));
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({
    parameterLimit: 1000000,
    limit: '500mb',
    extended: true
}));
app.use(cookieParser());

app.use(bodyParser.urlencoded({
    parameterLimit: 1000000,
    limit: '500mb',
    extended: true
}));


// file path setups
app.use("/assets", express.static(path.join(__dirname, "../assets")));
app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/public", express.static(path.join(__dirname, "../public")));


//---------------------------------------------------------------------
// set favicon automaically when express is initialised
// reference url: <https://askforyou.tistory.com/37>
var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, '../assets', 'favicon.ico')));

//---------------------------------------------------------------------
// set view engine
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs"); // use the ejs as a template engine
app.engine("html", require("ejs").renderFile);

//-----------------------------------------------------------------------
// set the routes

// set the default route
app.get("/", function (req, res) {
    res.render("index.html");
});

app.use('/tti', require('./api/tti'));

//-----------------------------------------------------------------------
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


exports = module.exports = app;