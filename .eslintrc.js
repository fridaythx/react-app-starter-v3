module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/forbid-prop-types': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off'
  },
  overrides: [
    {
      files: ['*Container.js', '*Container.**.js', 'client/App.js'],
      rules: {
        'react/prop-types': false
      }
    }
  ],
  extends: ['airbnb', 'plugin:prettier/recommended']
};
