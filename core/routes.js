var express = require('express');
var _ = require('lodash');
var path = require('path');
var hbs = require('express-hbs');
var post = require('./post');

module.exports = {
	init: function(app, options) {
		this.setupInit(app, options);
		this.setupMiddleWare(app);
		this.setupGetRoutes(app);	
	},

	setupInit: function(app, options) {
		var static = ['css','js','fonts','img'];

		_.forEach(static, function(value, key){
			app.use( '/' + value, express.static( path.resolve( options.assetsPath, value ) ) );
		});

		app.engine('hbs', hbs.express4({
			partialsDir: path.resolve( options.viewPath, 'template-part' ),
			defaultLayout: path.resolve( options.viewPath, 'default.hbs' )
		}))

		app.set('view engine', 'hbs');
		app.set('views', options.viewPath);
	},

	setupMiddleWare: function(app) {

	},

	setupGetRoutes: function(app) {
		app.get('/',this.home);

		app.get('/page/:paged',this.paged);
		app.get('/:year/:month/:date/:post', this.post);

		app.get('*',this.check);
	},

	check: function(req,res,next) {
		res.status('404').render('404');
	},

	home: function(req,res,next) {
		res.render(
			'index',
			{
				posts: post.getPostsData(),
				paged: 1,
				is_single: false,
				is_home: true,
				is_profile: false,
				slug: req.route.path
			}
		);
	},

	paged: function(req,res,next) {
		res.render(
			'index',
			{
				posts: post.getPostsData({paged: req.params.paged}),
				paged: req.params.paged,
				is_single: false,
				is_home: true,
				is_profile: false,
				slug: req.route.path
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

		var filePath = helper.locate('content/post/' + params.join('-') + '.md');

		if ( fs.existsSync(filePath) ) {
			res.render(
				'post',
				{
					post: post.getPostData(filePath),
					paged: 1,
					is_single: true,
					is_home: false,
					is_profile: false,
					slug: req.route.path
				}
			);
		} else {
			res.status('404').render('404');
		}
	}
}