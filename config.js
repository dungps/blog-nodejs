module.exports = {

	// This config for herokuapp
	production: {
		host: '0.0.0.0',
		port: process.env.PORT,
		url: 'http://dungps.com',
	},

	// this config for development
	development: {
		host: 'localhost',
		port: '81',
		url: 'http://localhost:81'
	},

	posts_per_page: 1,
	navigations: [
		{
			slug: '/',
			label: 'Home'
		},
		{
			slug: 'profile',
			label: 'Profile'
		}
	],

	site: {
		title: 'Kevin Pham',
		description: 'PHP Developer',
		format: '%TITLE% - %SUBTITLE%'
	}
}