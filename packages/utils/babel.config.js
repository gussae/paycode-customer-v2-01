module.exports = {
    presets: [
      ['@babel/preset-env', {
        targets: {
          node: 'current',
        },
        modules: 'commonjs',
      }],
    ],
    // ignore:["**/*.guard.js"]
  };
