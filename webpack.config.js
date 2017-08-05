const OUT_DIR = "dist";
const TMP_PKG_FILE = "./resources/package.json.build.tmp";

const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

let CopyWebpackPlugin = require("copy-webpack-plugin");
let WebpackBeforeBuildPlugin = require("before-build-webpack");
//let WebpackShellPlugin = require('webpack-shell-plugin');

let packageJson = require("./package.json");

function cleanPackageJson(pkg) {
  delete pkg.private;
  delete pkg.devDependencies;
  delete pkg.scripts;
  delete pkg.eslintConfig;
  delete pkg.babel;
  fs.writeFileSync(TMP_PKG_FILE, JSON.stringify(pkg, null, "  "), "utf-8");
}

const copyOptions = [
  { from: "resources/assets/" },
  { from: TMP_PKG_FILE, to: "package.json" },
  { from: "yarn.lock" },
  { from: "README.md" }
];

module.exports = {
  entry: "./src/index.js",
  output: {
    // export itself to a global var
    libraryTarget: "var",
    // name of the global var: "babelKit"
    // TODO pull name from package and prepare to be used as global var
    library: "babelKit",
    path: path.resolve(__dirname, OUT_DIR),
    filename: "index.js"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new WebpackBeforeBuildPlugin(function(compiler, callback) {
      cleanPackageJson(packageJson);
      callback(); //don't call it if you do want to stop compilation
    }),
    new CopyWebpackPlugin(copyOptions)
    //new WebpackShellPlugin({
    //onBuildStart: ['echo "start build"'],
    //onBuildEnd: ['rm ' + TMP_PKG_FILE + ' && echo "Finished"']
    //})
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|resources)/,
        loader: "babel-loader",
        options: {
          //cacheDirectory: true,
          presets: ["env", "react"],
          plugins: [
            require("babel-plugin-transform-runtime"),
            require("babel-plugin-transform-async-to-generator")
          ]
        }
      },
      {
        test: /\.css/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      }
    ]
  }
};
