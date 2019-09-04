const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.stylelint,
  rules: {
    'order/properties-order': null,
    'declaration-empty-line-before': 'never',
    'no-descending-specificity': null,
    'color-hex-length': null,
  },
};
