// const webpack = require("webpack");
// const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

// module.exports = {
//   mode: "development",
//   devtool: "cheap-module-source-map",
//   devServer: {
//     hot: true,
//     open: true,
//   },
//   plugins: [
//     new ReactRefreshWebpackPlugin(),
//     new webpack.DefinePlugin({
//       "process.env.name": JSON.stringify("Sothea Mab"),
//     }),
//   ],
// };

// webpack.dev.js
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,  // Make sure this line is correctly set
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("Sothea Mab"),
    }),
  ],
};

