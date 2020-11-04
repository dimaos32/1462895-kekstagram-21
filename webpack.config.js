const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: [
    `./js/utils.js`,
    `./js/edit-form.js`,
    `./js/main.js`,
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true,
  },
  devtool: false,
  devServer: {
    open: true,
    port: 8003,
  },
};
