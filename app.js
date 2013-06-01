// DEPENDENCIES
// ============
var express = require("express");
var http = require("http");
var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
var mongo = require("./config/mongo");

var app = module.exports = express();

app.configure(function () {
    app.use(express.errorHandler({
        dumpExceptions:true,
        showStack:true
    }));

    app.use(express.cookieParser());

    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(passport.initialize());

    //must go last
    app.use(app.router);
});

require('./routes')(app);

// Start Node.js Server
http.createServer(app).listen(port, host);

console.log('server started on ' + host + ':' + port);