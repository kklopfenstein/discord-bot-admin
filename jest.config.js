const config = {
  testPathIgnorePatterns: ['config/webpack/'],
  testEnvironment: 'jsdom',
  globals: {
    'window': {}
  }
}

module.exports = config;