const { defaults } = require('jest-config')

require('dotenv').config({
  path: '.env.test',
})

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.{js,ts}',
    '!src/**/index.ts',
    '!src/**/*.{d.ts,d.js}',
    '!src/interfaces/**',
    '!**/node_modules/**',
    '!build/**/*',
  ],
  coverageReporters: ['text', 'cobertura', 'json-summary'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@tests/(.*)': '<rootDir>/tests/$1',
  },
}
