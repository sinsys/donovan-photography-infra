module.exports = {
  root: true,
  extends: [
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
      ecmaVersion: 2019,
      project: './tsconfig.json',
      sourceType: 'module',
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": ["error", { "prefixWithI": "always" }],
    "@typescript-eslint/no-floating-promises": ["error"],
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
  },
  overrides: [
    Object.assign(
      {
        files: [
          'tests/**/*.test.js',
          'tests/**/*.test.ts'
        ],
        env: { jest: true },
        plugins: ['jest']
      },
      require('eslint-plugin-jest').configs.all
    )
  ]
}
