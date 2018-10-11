const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: ["babel-polyfill", "./src/index.js"],
	// where compiled file will go
	output: {
		publicPath: "/",
		filename: "./main.js"
	},
	// watch js and jsx files
	resolve: {
		extensions: [".js", ".jsx"]
	},
	module: {
		rules: [
			// excluding node_modules, babel the js/jsx
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"]
			},

			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: {
					loader: "file-loader",
					options: {
						name: "public/img/[name].[ext]",
						outputPath: "dist/img/"
					}
				}
			},

			{
				test: /\.(s*)css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{ loader: "css-loader", options: { minimize: true } },
						"sass-loader"
					]
				})
			},
			{
				test: /\.html$/,
				use: {
					loader: "html-loader",
					options: {
						minimize: true
					}
				}
			},
			// font files
			{
				test: /\.(otf|ttf|eot|woff|woff2)$/,
				loader: "file-loader",
				options: {
					name: "public/fonts/[name].[ext]",
					outputPath: "dist/fonts"
				}
			}
		]
	},
	plugins: [
		// new instance of ExtractTextPlugin w/ output filename
		new ExtractTextPlugin({ filename: "style.css" }),
		new HtmlWebpackPlugin({
			template: "./resources/index.html",
			filename: "./index.html",
			hash: true
		})
	],

	devServer: {
		historyApiFallback: true,
		publicPath: "/",
		contentBase: "./dist"
	}
};
