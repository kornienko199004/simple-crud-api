const path = require('path');

module.exports = (args) => {
  const mode = args.prod ? 'production' : 'development';

  return {
    target: 'node',
    mode,
    entry: `${path.resolve(__dirname, 'src/index.js')}`,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
    },
  };
};
