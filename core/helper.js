var path = require('path');
var config = require('./config');

var options = config.load();

module.exports = {
	locate: function(path) {
		return path.resolve(config.appPath, path);
	}
}