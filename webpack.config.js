var path = require("path");
var webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: {
    entry: "./resources/frontend/main.ts",
    styles: "./resources/frontend/styles/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    chunkFilename: '[name].bundle.js',
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.ts$/,
        // exclude: /node_modules|vue\/src/,
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "vendor")
        ],
        use: [
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          },
          "tslint-loader"
        ]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)
      },
      {
        test: /\.pcss$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        loader: "pug-plain-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|svg|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]?[hash]"
        }
      }
    ]
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "./resources/frontend/assets"),
      styles: path.resolve(__dirname, "./resources/frontend/styles/components"),
      helpers: path.resolve(__dirname, "./resources/frontend/helpers")
    },
    extensions: [".js", ".vue", ".ts"]
  },
  devServer: {
    proxy: {
      "*": {
        target: "http://localhost:8000/",
        secure: false
      }
    },
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    noInfo: false,
    open: false
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
