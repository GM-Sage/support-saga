// jest.config.js

module.exports = {
    // Specifies the test environment
    testEnvironment: 'jest-environment-jsdom',
  
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
  
    // Indicates whether each individual test should be reported during the run
    verbose: true,
  
    // Transform TypeScript files using ts-jest
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  
    // File extensions Jest will look for
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  
    // Setup files after the environment is set up
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
    // Mock CSS and other static assets
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '^@/(.*)$': '<rootDir>/app/$1', // Adjust based on your project structure
    },
  
    // Specify the directories where Jest should look for tests
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  };