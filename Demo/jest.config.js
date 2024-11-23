module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@testing-library/react-native)/)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: ['src/components/**/*.{js,jsx,ts,tsx}'],
  coverageReporters: ['text'], // Specify coverage report formats
};
