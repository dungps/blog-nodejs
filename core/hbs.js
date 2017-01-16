var _ = require('lodash');
var hbs = require('express-hbs');
var config = require('./config').config;
var helper = require('./helper');

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
		hbs.registerHelper('nav', this.nav);
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
		return new hbs.handlebars.SafeString(this.title);
	},

	url: function(options) {
		console.log(this);
		url = encodeURI(decodeURI(this));

		return new hbs.SafeString(url);
	},

	loopPartial: function() {

	},

	nav: function(options) {
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

		data = _.merge({}, {nav: output});

		return template('nav', data, options);
	}
}