module.exports = {
  root: true,
  env: {
    jest: true,
  },
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json',
  },
  rules: {
    'prettier/prettier': [
      'error',
      { semi: false, singleQuote: true, bracketSpacing: true },
    ],
    'no-undef': 'error',
  },
  ignorePatterns: ['/dist/*', 'node_modules/'],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
}
