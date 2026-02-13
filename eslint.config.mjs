import typescriptEslint from '@typescript-eslint/eslint-plugin';
import playwright from 'eslint-plugin-playwright';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      playwright,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'off',
      'playwright/no-wait-for-timeout': 'warn',
      'playwright/no-element-handle': 'warn',
      'playwright/no-eval': 'error',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'playwright-report/**',
      'test-results/**',
      '.kiro/**',
    ],
  },
];
