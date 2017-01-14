var express = require('express');
var _ = require('lodash');
var path = require('path');
var hbs = require('express-hbs');

var post = require('./post');

module.exports = {
	init: function(app, options) {
		this.setupStatic(app, options);
		this.setupMiddleWare(app);

		app.engine('hbs', hbs.express4({
			partialsDir: path.resolve( options.viewPath, 'template-part' ),
			defaultLayout: path.resolve( options.viewPath, 'default.hbs' )
		}))

		app.set('view engine', 'hbs');
		app.set('views', options.viewPath);
		
		app.get('/',this.home);
		app.get('/page/:paged',this.paged);
		app.get('*',this.check);
	},

	setupStatic: function(app, options) {
		var static = ['css','js','fonts','img'];

		_.forEach(static, function(value, key){
			app.use( '/' + value, express.static( path.resolve( options.assetsPath, value ) ) );
		})
	},

	setupMiddleWare: function(app) {

	},

	check: function(req,res,next) {
		res.send('test');
	},

	home: function(req,res,next) {
		res.render(
			'index',
			{
				posts: post.getPostsData()
			}
		);
	},

	paged: function(req,res,next) {
		res.render(
			'index',
			{
				posts: post.getPostsData({paged: req.params.paged})
			}
		);
	},

	post: function(req,res,next) {
		var params = [
			req.params.year,
			req.params.month,
			req.params.date,
			req.params.post,
		];

		var filePath = 
	}
}