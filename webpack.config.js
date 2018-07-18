const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		login: "./js/login.js",
		signup: "./js/signup.js",
		createrequest: "./js/createrequest.js",
		adminrequests: "./js/admin-requests.js",
		adminViewRequest: "./js/admin-view-request.js",
		users: './js/users.js',
		userDetails: './js/user-details.js',
		userRequests: './js/userrequests.js',
		userViewRequest: './js/user-view-request',
		updateRequest: './js/update-request.js'
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module : {
		rules: [
		{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ["babel-preset-env"]
				}
			}
		}
		]
	},
	devtool: "inline-source-map"
}