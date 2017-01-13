var express = require('express');
var app = express();
var http = require('http');

var setupConfig = require('./config');
var routes = require('./routes');
var hbsHelper = require('./hbs');

module.exports = function(config) {

	var options = setupConfig.load(config);
	routes.init(app, options);
	hbsHelper.init(options);

	http.createServer(app).listen(options.port, options.host);
}