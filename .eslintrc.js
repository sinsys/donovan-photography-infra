module.exports = {
  root: true,
  extends: 'standard-with-typescript',
  parserOptions: {
    ecmaVersion: 2019,
    project: './tsconfig.json',
    sourceType: 'module'
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
