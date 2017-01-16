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
	config = config || {};
	
	_.merge(this.config,config);

	this.config.appPath = config.appPath || path.resolve( __dirname, '../' );
	this.config.viewPath = config.viewPath || path.resolve( this.config.appPath, 'views/' );
	this.config.assetsPath = config.assetsPath || path.resolve( this.config.appPath, 'assets/' );
	this.config.contentPath = config.contentPath || path.resolve( this.config.appPath, 'content/' );
	this.config.postsPath = config.postsPath || path.resolve( this.config.contentPath, 'posts/');
	this.config.posts_per_page = config.posts_per_page || 10;

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

	if (!_.isEmpty(config)) {
		config = Config[env];
	}

	return self.setup(config);
}

if ( _.isObject(Config) && !_.isEmpty(Config) ) {
	defaultConfig = Config[env];
}

module.exports = new setupConfig(defaultConfig);