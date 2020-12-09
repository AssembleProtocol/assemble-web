module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'max-len': 0,
    'object-curly-newline': 0,
    'newline-per-chained-call': 0,
  },
};
