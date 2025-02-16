module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  ...require('../../../jest.config.base'),
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@xcore/(.*)$': '<rootDir>/app/$1',
  },
  roots: ['<rootDir>/app/', '<rootDir>/tests/'],
};
