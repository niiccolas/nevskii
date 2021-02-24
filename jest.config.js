module.exports = {
  moduleDirectories: ['node_modules', './'],
  modulePaths: ['node_modules', './'],
  preset: 'ts-jest',
  projects: ['packages/api', 'packages/web'],
  testEnvironment: 'node',
  // transform: {
  //     '\\.ts$': ['ts-jest'],
  //     '\\.html$': ['ts-jest'],
  // },
  verbose: true,
  // testTimeout: 30000,
  // moduleNameMapper: {
  //   '@api/(.+)': '<rootDir>../$1/src',
  // },
};
