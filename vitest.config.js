module.exports = {
  testMatch: [
    '**/*.test.js',
    '**/*.test.jsx'
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ],
  setupFilesAfterEnv: [
    'vitest/dist/setup.js'
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
};