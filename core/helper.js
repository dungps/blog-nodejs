var path = require('path');
var config = require('./config').config;
var url = require('url');

module.exports = {
	locate: function(path) {
		return path.resolve(config.appPath, path);
	},
	home: function(path) {
		return url.resolve(config.url, path);
	}
}