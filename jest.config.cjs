module.exports = {
  testEnvironment: './jest.environment.cjs',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.[tj]sx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@react-hook|@livekit|email-regex)/'
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
};
