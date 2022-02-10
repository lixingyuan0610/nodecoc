const path = require("path");
const fs = require("fs");

let nodeModules = {};
fs
  .readdirSync("node_modules")
  .filter(x => {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach(mod => {
    nodeModules[mod] = "commonjs " + mod;
  });

module.exports = {
    // entry: ['babel-polyfill','./app/client/index.dev.js'],
    entry: ['babel-polyfill', path.resolve(__dirname, "../index.js")],
    output: {
      path: path.resolve(__dirname, "../build"),
      filename: "index.js",
      publicPath: "/"
    },
    node: {
      console: true,
      global: true,
      process: true,
      Buffer: true,
      __filename: true,
      __dirname: true,
      setImmediate: true
    },
    target: "node",
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: 'babel-loader',
                options: {
                presets: []
                }
            }
        ]
    },

    plugins: [
    ],

    resolve: {
      extensions: ['.js', '.json', '.jsx']
    },
    
    externals: nodeModules

}
