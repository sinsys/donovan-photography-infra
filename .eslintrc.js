module.exports = {
  root: true,
  extends: 'standard-with-typescript',
  parserOptions: {
    project: './tsconfig.json'
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
