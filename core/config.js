var Config = require('../config');
var _ = require('lodash');
var path = require('path');
var defaultConfig = {};
var env = process.env.NODE_ENV || 'development';

function setupConfig(config) {
	this.config = {}

	if (_.isObject(config)) {
		this.setup(config);
	}
}

setupConfig.prototype.setup = function(config) {
	_.merge(this.config,config);

	this.config.appPath = config.appPath || path.resolve( __dirname, '../' );
	this.config.viewPath = config.viewPath || path.resolve( this.config.appPath, 'views/' );
	this.config.assetsPath = config.assetsPath || path.resolve( this.config.appPath, 'assets/' );

	if ( this.config.production ) {
		delete this.config.production;
	}

	if ( this.config.development ) {
		delete this.config.development;
	}

	if (config.url) {
		this.config.url = config.url;
	}

	return this.config;
}

setupConfig.prototype.load = function(config) {
	var self = this;
	return self.setup(config);
}

if ( _.isObject(Config) && !_.isEmpty(Config) ) {
	defaultConfig = Config[env];
}

module.exports = new setupConfig(defaultConfig);