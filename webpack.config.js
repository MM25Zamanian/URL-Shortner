const path = require('path');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
  ],
  entry: {
    script: './web/template/static/src/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'web', 'template', 'static', 'dist')
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [{
        test: /\.ts?$/,
        loader: "ts-loader"
      },
      {
        test: /\.(jpg|png)([\?]?.*)$/,
        use: ['file-loader']
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
};