const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          // Use classic SCSS imports, over CSS Modules
          modules: false,
        },
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  webpackFinal: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      ['@Components']: path.resolve(__dirname, '../src/components'),
      ['@Styles']: path.resolve(__dirname, '../src/styles'),
    };
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
