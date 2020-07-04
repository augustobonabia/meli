const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.scss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devtool: 'source-map',
};

module.exports = (env, argv) => {
  let envConfig;

  // Configure development environment
  if (argv.mode === 'development') {
    envConfig = {
      devServer: {
        contentBase: path.join(__dirname, 'public'),
        port: 3001,
        publicPath: 'http://localhost:3001/dist/',
        hotOnly: true,
        historyApiFallback: true,
        proxy: {
          '/api': 'http://localhost:3000',
        },
      },
      plugins: [new webpack.HotModuleReplacementPlugin()],
    };
  }

  // Configure production environment
  if (argv.mode === 'production') {
    envConfig = {
      optimization: {
        minimizer: [new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false, // remove comments
            },
          },
        })],
      },
    };
  }

  return Object.assign(config, envConfig);
};
