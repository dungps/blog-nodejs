var _ = require('lodash');
var hbs = require('express-hbs');
var config = require('./config');
var helper = require('./helper');

module.exports = {
	init: function() {
		hbs.registerHelper('content', this.content);
		hbs.registerHelper('pagination', this.pagination);
		hbs.registerHelper('title', this.title);
		hbs.registerHelper('nav', this.navPartial);
	},

	template: function(name, context, options) {
		var partial = hbs.handlebars.partials[name];

		if (partial === undefined) {
			return 'Missing ' + name + ' template';
		}

		if (partial === 'string' ) {
			return hbs.registerPartial(partial);
		}

		return new hbs.handlebars.SafeString(partial(context, options));
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

	loopPartial: function() {

	},

	navPartial: function(options) {
		var nav = config.navigations;
		console.log(nav);
		var currentUrl = options.data.root.slug;

		if (!_.isObject(nav) || _.isFunction(nav)) {
			return;
		}

		var _isCurrentUrl = function(href, currentUrl) {
			if (!currentUrl) {
				return false;
			}

			var strippedHref = href.replace(/\/+$/, '');
			var strippedCurrentUrl = currentUrl.replace(/\/+$/, '');

			return strippedHref === strippedCurrentUrl;
		}

		if (nav.length === 0) {
			return new hbs.SafeString('');
		}

		output = nav.map(function(e){
			var out = {};

			out.current = _isCurrentUrl(e.slug, currentSlug);
			out.label = e.label;
			out.slug = e.slug;
			out.url = helper.home(e.slug);
			return out;
		});

		data = _.merge({}, {nav: output});

		return this.template('nav', data, options);
	}
}