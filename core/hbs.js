var _ = require('lodash');
var hbs = require('express-hbs');
var config = require('./config').config;
var helper = require('./helper');
var post = require('./post');

function template(name, context, options) {
	var partial = hbs.handlebars.partials[name];

	if (partial === undefined) {
		return 'Missing ' + name + ' template';
	}

	if (partial === 'string') {
		return hbs.registerPartial(partial);
	}

	return new hbs.handlebars.SafeString(partial(context, options));
}

module.exports = {
	init: function() {
		hbs.registerHelper('content', this.content);
		hbs.registerHelper('pagination', this.pagination);
		hbs.registerHelper('title', this.title);
		hbs.registerHelper('navigation', this.navigation);
		hbs.registerHelper('meta_title', this.meta_title);
		hbs.registerHelper('meta_description', this.meta_description);
		hbs.registerHelper('header', this.header);
		hbs.registerHelper('logo', this.logo);
		hbs.registerHelper('pagination', this.pagination);
	},

	content: function(options) {
		content = this.content;
		var characters = options.hash.characters || 100;
		var sperator = options.hash.sperator || '...';

		if (options.data.root.is_home) {
			if (this.shortDescription) {
				content = this.shortDescription;
			} else {
				content = this.content.slice(0, characters) + sperator;
			}
		}

		return new hbs.SafeString(content);
	},

	title: function(options) {
		return new hbs.SafeString(this.title);
	},

	meta_title: function(options) {
		var data = options.data.root;
		var title = config.site.title;
		config.site.subtitle = config.site.subtitle || '';

		if ( ( data.is_home || data.is_profile ) && config.site.subtitle ) {
			title = config.site.format.replace('%TITLE%', title);
			title = title.replace('%SUBTITLE%', config.site.subtitle)
		}

		if ( data.is_single ) {
			title = config.site.format.replace('%TITLE%', title);
			title = title.replace('%SUBTITLE%', data.post.title);
		}

		return new hbs.SafeString(title);
	},

	meta_description: function(options) {
		var meta_description = config.site.description;

		if ( _.isEmpty( meta_description ) ) {
			return new hbs.SafeString('');
		}

		return new hbs.SafeString( meta_description );
	},

	header: function(options) {
		return new hbs.SafeString('');
	},

	logo: function(options) {
		if (!_.isEmpty(config.site.logo)) {
			return new hbs.SafeString('<a href="'+config.url+'" class="'+options.hash.class+'"><img src="'+ config.site.logo +'" title="'+config.site.title+'"></a>');
		}

		return new hbs.SafeString('<a href="'+config.url+'" class="'+options.hash.class+'">' +config.site.title+'</a>');
	},

	navigation: function(options) {
		var nav = config.navigations;
		var currentSlug = options.data.root.slug;

		if (!_.isObject(nav) || _.isFunction(nav)) {
			return;
		}

		var _isCurrentUrl = function(slug, currentSlug) {
			if (!currentSlug) {
				return false;
			}

			var strippedHref = slug.replace(/\/+$/, '');
			var strippedCurrentUrl = currentSlug.replace(/\/+$/, '');

			return strippedHref === strippedCurrentUrl;
		}

		if (nav.length === 0) {
			return new hbs.SafeString('');
		}

		output = nav.map(function(e){
			var out = {};

			e.slug = e.slug || '/';

			out.current = _isCurrentUrl(e.slug, currentSlug);
			out.label = e.label;
			out.slug = e.slug;
			out.url = helper.home(e.slug);
			return out;
		});

		var data = _.merge({}, {navigation: output});

		return template('navigation', data, options);
	},

	pagination: function(options) {
		var limit = config.posts_per_page;
		var totalPost = post.totalPost();
		var currentPage = options.data.root.paged || 1;

		var metadata = {
			page: parseInt( currentPage ),
			limit: limit,
			pages: Math.ceil( totalPost / limit ),
			total: totalPost,
			next: null,
			prev: null,
			nextURL: null,
			prevURL: null,
		}

		if ( metadata.pages > 1 ) {
			if ( metadata.page === 1 ) {
				metadata.next = metadata.page + 1;
				metadata.nextURL = helper.home('/page/' + metadata.next);
			} else if ( metadata.page === metadata.pages ) {
				metadata.prev = metadata.page - 1;
				metadata.prevURL = helper.home('/page/' + metadata.prev);
			} else {
				metadata.next = metadata.page + 1;
				metadata.prev = metadata.page - 1;
				metadata.nextURL = helper.home('page/' + metadata.next);
				metadata.prevURL = helper.home('page/' + metadata.prev);
			}
		}

		var data = _.merge({}, metadata);

		return template('pagination', data, options);
	}
}