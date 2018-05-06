var path = require("path");
var webpack = require("webpack");

module.exports = {
  entry: {
    entry: "./src/main.js",
    styles: "./src/styles/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: [
              "vue-style-loader",
              "css-loader",
              "svg-fill-loader/encodeSharp",
              "sass-loader",
              {
                loader: "sass-resources-loader",
                options: {
                  resources: [
                    "./src/styles/variables.scss",
                    "./src/styles/mixins.scss"
                  ]
                }
              }
            ]
          }
        }
      },
      {
        enforce: "pre",
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader"
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.svg$/,
        use: [
          "file-loader",
          {
            loader: "svg-fill-loader?fill=white"
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "src/assets"),
      styles: path.resolve(__dirname, "src/styles/components")
    },
    extensions: [".js", ".vue"]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false
  },
  performance: {
    hints: false
  },
  devtool: "#eval-source-map"
};

if (process.env.NODE_ENV === "production") {
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
