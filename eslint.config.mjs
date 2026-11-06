import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig({
  files: ['**/*.{ts,test.ts}'],
  extends: [js.configs.recommended, tseslint.configs.recommended, eslintConfigPrettier],
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },
  rules: {
    'no-var': 'error',
    'prefer-const': 'error',
    'no-console': 'warn',
    eqeqeq: 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
  },
});
