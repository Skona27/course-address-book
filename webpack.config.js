const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = env => ({
  entry: './src/index.ts',
  mode: env && env.NODE_ENV === "production" ? "production" : "development",
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/index.html', to: './index.html' },
        { from: './src/style.css', to: './style.css' },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
});