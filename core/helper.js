var path = require('path');
var config = require('./config').config;
var url = require('url');

module.exports = {
	locate: function(filePath) {
		return path.resolve(config.appPath, filePath);
	},
	
	home: function(urlPath) {
		return url.resolve(config.url, urlPath);
	}
}