const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  rules: {
    'react/no-array-index-key': 'off',
    'prefer-const': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'import/no-unresolved': 0,
    'object-curly-newline': 0,
  },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
};
