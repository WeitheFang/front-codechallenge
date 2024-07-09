import type {Config} from 'jest'
import {defaults} from 'jest-config'

const config: Config = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{test.ts,test.tsx}', '!src/**/*.d.ts', '!**/vendor/**'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    transform: {
        '.(ts|tsx)': 'ts-jest'
    },

    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/coverage',
        'package.json',
        'package-lock.json',
        'reportWebVitals.ts',
        'setupTests.ts',
        'index.tsx'
    ],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    }
}

export default config
