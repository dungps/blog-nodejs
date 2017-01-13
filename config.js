module.exports = {

	// This config for herokuapp
	production: {
		host: '0.0.0.0',
		port: process.env.PORT,
		url: 'http://dungps.com'
	},

	// this config for development
	development: {
		host: 'localhost',
		port: '80',
		url: 'http://localhost.com'
	}
}