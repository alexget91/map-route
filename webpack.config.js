const path = require(`path`);

module.exports = {
  entry: `./src/js/index.tsx`,
  resolve: {
    extensions: [`.ts`, `.tsx`, `.js`, `.jsx`]
  },
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `docs`)
  },
  devServer: {
    contentBase: path.join(__dirname, `docs`),
    compress: false,
    open: true,
    port: 1337,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.(tsx|ts)?$/,
        loader: `ts-loader`
      },
    ],
  },
  devtool: `source-map`
};
