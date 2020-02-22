const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const cssLoader = {
  loader: "css-loader",
  options: {
    url: false
  }
};

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    plugins: () => [
      require("autoprefixer")()
    ]
  }
};

module.exports = function(env) {
  const production = env === "production" || process.env.NODE_ENV === "production";
  return {
    mode: production ? "production" : "development",
    devtool: production ? "source-maps" : "inline-source-map",
    entry: "./src/main.ts",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "entry-bundle.js"
    },
    resolve: {
      extensions: [".ts", ".js"],
      modules: [path.resolve(__dirname, "src"), "node_modules"]
    },
    devServer: {
      historyApiFallback: true,
      open: !process.env.CI,
      port: 9000,
      lazy: false
    },
    module: {
      rules: [
        { test: /\.less$/i, use: [ "style-loader", cssLoader, postcssLoader, "less-loader" ] },
        { test: /\.css$/i, use: [ "style-loader", cssLoader, postcssLoader ] },
        { test: /\.ts$/i, use: ["ts-loader", "@aurelia/webpack-loader"], exclude: /node_modules/ },
        { test: /\.html$/i, use: "@aurelia/webpack-loader", exclude: /node_modules/ }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "index.ejs" }),
      new CopyWebpackPlugin([{ from: "./src/resources", to: "./resources" }])
    ]
  }
}
