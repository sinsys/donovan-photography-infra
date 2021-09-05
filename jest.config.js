const { defaults } = require('jest-config')

require('dotenv').config({
  path: '.env.test'
})

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/interfaces/**',
    '!**/node_modules/**'
  ],
  coverageReporters: [
    'text',
    'cobertura',
    'json-summary'
  ],
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    'ts',
    'tsx'
  ],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@tests/(.*)': '<rootDir>/tests/$1'
  }
}
