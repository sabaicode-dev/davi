const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  // Entry point for your application
  entry: path.resolve(__dirname, "..", "./src/index.tsx"),

  // Resolve extensions and aliases
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "../"), // Set alias for imports
    },
  },

  // Module rules for different file types
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader", // Transpile TS/JS files
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"], // Handle CSS
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource", // Handle image assets
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline", // Handle fonts and SVGs
      },
    ],
  },

  // Output settings
  output: {
    path: path.resolve(__dirname, "..", "./build"), // Output directory
    filename: "bundle.js", // Output bundle
    // publicPath: "/", // Ensure assets and routes are resolved relative to the root
  },

  // Webpack mode
  mode: "development",

  // Webpack Dev Server configuration
  devServer: {
    static: {
      directory: path.resolve(__dirname, "..", "public"), // Serve files from public directory
    },
    port: 8080, // Specify the development server port
    historyApiFallback: true, // Redirect all 404s to index.html for client-side routing
    open: true, // Automatically open the app in the browser
    compress: true, // Enable gzip compression
    hot: true, // Enable Hot Module Replacement (HMR)
  },

  // Plugins for additional functionality
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./public/index.html"), // Base HTML template
    }),
    new Dotenv({
      path: ".env.local", // Load environment variables from .env.local
      safe: true, // Load .env.example as defaults
      systemvars: true, // Include system variables
      defaults: false, // Do not use .env.defaults
    }),
  ],
};
