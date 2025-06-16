const nextJest = require('next/jest');

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        // Handle module aliases (this will be automatically configured for you soon)
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: ['**/__tests__/**/*.test.(js|jsx|ts|tsx)'],
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.stories.{js,jsx,ts,tsx}',
    ],
    // Memory and performance optimizations
    maxWorkers: 1, // Use only 1 worker to reduce memory usage
    workerIdleMemoryLimit: '512MB', // Limit worker memory
    logHeapUsage: true, // Monitor memory usage
    detectLeaks: true, // Detect memory leaks
    forceExit: true, // Force exit after tests complete
    // Increase timeout for slower tests
    testTimeout: 10000,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);