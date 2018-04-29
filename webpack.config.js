const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//const DashboardPlugin = require('webpack-dashboard/plugin'); // comment it, because it cause some issue eith ugilfy
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
require("babel-polyfill");
const webpack = require('webpack');



require('dotenv').config();
const ENV = process.env.APP_ENV;
const PORT = process.env.App_PORT;

const isTest = ENV === 'dev'
const isProd = ENV === 'prod';


function setDevTool() {  // function to set dev-tool depending on environment
    if (isTest) {
      return 'inline-source-map';
    } else if (isProd) {
      return 'source-map';
    } else {
      return 'eval-source-map';
    }
}



const config = {
  entry:["babel-polyfill",  __dirname + "/src/app/index.js"], // webpack entry point. Module to start building dependency graph
  output: {
    path: __dirname + '/dist', // Folder to store generated bundle
    filename: 'bundle.js',  // Name of generated bundle after build
    publicPath: '/' // public URL of the output directory when referenced in a browser
  },
  devtool: setDevTool(),  //Set the devtool
  module: {  // where we defined file patterns and their loaders
    rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: [
            /node_modules/
          ]
        },
        {
            test: /\.html/,
            loader: 'raw-loader'
        },
        {
            test: /\.(sass|scss)$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
          },
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({  
              fallback: 'style-loader',
              use: [
                { loader: 'css-loader'},
                { loader: 'sass-loader'}
              ],
            })
          }
    ]
  },
  plugins: [  // Array of plugins to apply to build chunk
      new HtmlWebpackPlugin({
          template: __dirname + "/src/public/index.html",
          inject: 'body'
      }),
      new ExtractTextPlugin("styles.css"), // extract css to a separate file called styles.css
      new webpack.DefinePlugin({  // plugin to define global constants
        APP_NAME: JSON.stringify(process.env.APP_NAME)
    }),
    //new DashboardPlugin(),

  ],
  devServer: {  // configuration for webpack-dev-server
      contentBase: './src/public',  //source of static assets
      port: PORT, // port to run dev-server
  } 
};



// Minify and copy assets in production
if(isProd) {  // plugins to use in a production environment
    config.plugins.push(
        new UglifyJSPlugin(),  // minify the chunk
        new CopyWebpackPlugin([{  // copy assets to public folder
          from: __dirname + '/src/public'
        }])
    );
};

module.exports = config;