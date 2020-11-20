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
      ['@Atoms']: path.resolve(__dirname, 'src/components/atoms/index.ts'),
      ['@Molecules']: path.resolve(
        __dirname,
        'src/components/molecules/index.ts',
      ),
      ['@Organisms']: path.resolve(
        __dirname,
        'src/components/organisms/index.ts',
      ),
      ['@utils']: path.resolve(__dirname, 'src/utils/index.ts'),
      ['@styles']: path.resolve(__dirname, 'src/styles'),
    };

    return config;
  },
});
