/** @type {import('jest').Config} */
module.exports = {
  displayName: 'graph-engine',
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!**/node_modules/**'],
  moduleNameMapper: {
    '^uuid$': '<rootDir>/src/nodes/__mocks__/uuid.ts',
  },
};
