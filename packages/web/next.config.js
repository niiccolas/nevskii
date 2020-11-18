const path = require('path');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  webpack: config => {
    /* 
    Aliases should also be reflected in:
    - ./storybook/main.js
    - ./tsconfig.json
    */
    config.resolve.alias = {
      ...config.resolve.alias,
      ['@Components']: path.resolve(__dirname, 'src/components'),
      ['@Styles']: path.resolve(__dirname, 'src/styles'),
    };

    return config;
  },
});
