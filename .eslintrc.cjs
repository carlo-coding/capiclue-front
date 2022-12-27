module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: '@typescript-eslint/parser',
  extends: ['plugin:react/recommended', 'standard-with-typescript'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension

      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],

      parserOptions: {
        project: ['./tsconfig.json'] // Specify it only for TypeScript files
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/indent': 'off',
    'react/react-in-jsx-scope': 'off',
    'multiline-ternary': 'off'
  }
}
