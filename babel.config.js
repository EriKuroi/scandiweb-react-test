module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      ['@babel/preset-react'],
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@babel/plugin-transform-modules-commonjs',
      '@babel/plugin-transform-async-to-generator',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      '@babel/plugin-proposal-json-strings',
      '@babel/plugin-proposal-object-rest-spread',
    ],
  };
  