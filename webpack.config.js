require('babel-polyfill');
var path = require('path');
var webpack = require('webpack');

var DEBUG = !process.argv.includes('--release');

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"' + (process.env.NODE_ENV || (DEBUG ? 'development' : 'production')) + '"' })
];

if(!DEBUG){
  plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { screw_ie8: true, warnings: true } }),
    new webpack.optimize.AggressiveMergingPlugin()
  );
}

module.exports = {
  cache: DEBUG,

  debug: DEBUG,

  stats: {
    colors: true,
    timings: true,
    hash: true,
    version: true,
    chunks: true,
    chunkModules: true,
    cached: true,
    cachedAssets: true,
    reasons: DEBUG
  },

  entry: [
    './src/js/app.tsx'
  ],

  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'app.js',
    publicPath: '/assets/'
  },

  target: 'web',

  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

  plugins: plugins,

  module: {
    loaders: [{
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, 'src/js')],
        loaders: ['react-hot', 'ts-loader'] }
    ],
    preLoaders: [{
      test: /\.js$/,
      loader: "source-map-loader"
    }]
  },

};
