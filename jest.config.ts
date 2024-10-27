import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  clearMocks: true,
  modulePathIgnorePatterns: ['<rootDir>/build'],
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      useESM: true,
      tsconfig: 'tsconfig.json'
    }]
  },
  preset: 'ts-jest/presets/default-esm',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  extensionsToTreatAsEsm: ['.ts'],
  testMatch: ['**/src/**/*.test.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/build/',
    '/__tests__/'
  ],
  passWithNoTests: true,
  detectOpenHandles: true
}

export default config
