const WEBPACK                = require('webpack');
const PATH                   = require('path');
const EXTRACT_TEXT_PLUGIN    = require('extract-text-webpack-plugin');
const HTML_WEBPACK_PLUGIN    = require('html-webpack-plugin');
const STYLE_LINT_BARE_PLUGIN = require('stylelint-bare-webpack-plugin');
const POLYFILL               = '@babel/polyfill';

module.exports = {
	devtool: 'source-map',
	mode: 'development',
	target: 'web',
	entry: [POLYFILL, './src/index.jsx'],
	output: {
		path: PATH.resolve(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loaders: ['babel-loader', 'eslint-loader'],
				include: PATH.join(__dirname, 'src'),
				exclude: [/(node_modules\/public)/]
			},
			{
				test: /\.scss$/,
				use: EXTRACT_TEXT_PLUGIN.extract({
					use: [
						{
							loader: 'css-loader',
						},
						{
							loader: 'sass-loader',
						},
					]
				})
			},
			{
				test: /\.(gif|png|jpg|jpeg|JPG|svg)$/i,
				use: [
					'file-loader',
						{
							loader: 'image-webpack-loader'
						}
				],
			}
		]
	},
	plugins: [
		new HTML_WEBPACK_PLUGIN({
			title: 'Todo',
			minify: {
				collapseWhitespace: true
			},
			hash: true,
			template: PATH.resolve(__dirname, './index.html'),
		}),
		new EXTRACT_TEXT_PLUGIN({
			filename: 'main.css'
		}),
		new STYLE_LINT_BARE_PLUGIN({
			options: {
				files: '**/*.s?(c\|a)ss',
				configFile: PATH.resolve(__dirname, './.stylelintrc')
			}
		}),
	]
};
