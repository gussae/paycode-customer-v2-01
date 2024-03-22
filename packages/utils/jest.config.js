module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testEnvironment: 'node',
  testMatch: [
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
    "^.+\\.tsx?$": "ts-jest",
  },
};
