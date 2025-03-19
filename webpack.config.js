const path = require('path');

module.exports = {
  entry: './Shopping-List/script.js', // Update this path to your entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development'
};