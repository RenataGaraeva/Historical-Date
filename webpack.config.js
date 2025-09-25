const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app/main.tsx',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-react", {
                runtime: "automatic"
              }]
            ],
            plugins: [
              ["babel-plugin-styled-components", {
                "ssr": false,
                "displayName": true,
                "fileName": true
              }]
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [

          "style-loader",

          "css-loader",

          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],

  devServer: {
    watchFiles: [
      path.join(__dirname, 'src/**/*'),
      path.join(__dirname, 'index.html')
    ],

    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8080,
    hot: true,
    open: true,
    liveReload: true,
  },


  mode: 'development',
};