const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  rules: {
    '@typescript-eslint/no-inferrable-types': 'off',
    'react/no-array-index-key': 'off',
    'prefer-const': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'import/no-unresolved': 'off',
    'object-curly-newline': 'off',
    'generator-star-spacing': 'off',
    'no-duplicate-imports': 'error',
    'import/order': 'off',
    'react/prefer-stateless-function': [0],
    'max-len': 'off',
    'react/destructuring-assignment': 'off',
    'operator-linebreak': 'off',
    'react/no-did-update-set-state': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/no-string-refs': 'off',
    'arrow-body-style': 'off',
    'react/no-access-state-in-setstate': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-prototype-builtins': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'guard-for-in': 'off',
    'no-restricted-syntax': 'off',
    'no-object-literal-type-assertion': 'off',
    'lines-between-class-members': 'off',
    'linebreak-style': 'off',
    quotes: 'off',
    'class-methods-use-this': 'off',
    'react/sort-comp': 'off',
    'prefer-destructuring': 'off',
    'implicit-arrow-linebreak': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'no-redeclare': 'off',
    'no-inner-declarations': 'off',
    'jsx-a11y/alt-text': 'off',
    'global-require': 'off',
  },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
};
