// Global test setup for Jest
// This file runs once before all test suites

// Extend Jest matchers
import '@testing-library/jest-dom';

// Set test timeout
jest.setTimeout(10000);

// Mock environment variables (using Object.defineProperty to avoid readonly error)
if (!process.env.NODE_ENV) {
  Object.defineProperty(process.env, 'NODE_ENV', {
    value: 'test',
    writable: true,
  });
}
if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = 'test-secret-key-min-32-chars-long';
}
if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = 'http://localhost:3000';
}
