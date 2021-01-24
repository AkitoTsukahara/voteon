module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
    plugins: ['stylelint-prettier'],
    // add your custom config here
    // https://stylelint.io/user-guide/configuration
    rules: {
      'prettier/prettier': true,
      'at-rule-no-unknown': [
        true,
        {
          ignoreAtRules: [
            'function',
            'if',
            'else',
            'else if',
            'each',
            'include',
            'mixin',
          ],
        },
      ],
    },
  }
  