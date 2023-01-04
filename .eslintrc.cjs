module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'esNext',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'eslint-disable prefer-const': 'off',
    'eslint-disable no-unsafe-finally': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
};
