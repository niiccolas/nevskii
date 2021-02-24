module.exports = {
  displayName: '@nevskii/api',
  name: '@nevskii/api',
  moduleDirectories: ['node_modules', './../../'],
  modulePaths: ['node_modules', './../../'],
  rootDir: './../../',
  testMatch: ['<rootDir>/packages/api/**/*.spec.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
