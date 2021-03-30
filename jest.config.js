module.exports = {
  roots: ['<rootDir>/app/test/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/*.d.*',
  ],
  globals: {
    "__DEV__": false
  }
}
