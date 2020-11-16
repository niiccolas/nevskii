const path = require('path');

module.exports = {
  webpackFinal: async (baseConfig, _options) => {
    const { module = {} } = baseConfig;

    const newConfig = {
      ...baseConfig,
      module: {
        ...module,
        rules: [...(module.rules || [])],
      },
    };

    // SCSS
    newConfig.module.rules.push({
      test: /\.module\.(s*)css$/,
      include: path.resolve(__dirname, '../components'),
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
        'sass-loader',
      ],
    });

    return newConfig;
  },
};
