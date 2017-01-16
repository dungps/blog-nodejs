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
		url: 'http://localhost.com'
	},

	posts_per_page: 10,
	navigations: [
		{
			slug: 'home',
			title: 'Home'
		},
		{
			slug: 'profile',
			title: 'Profile'
		}
	]
}