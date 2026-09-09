export default {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-declaration-strict-value'],
  rules: {
    'selector-class-pattern': null,
    'scss/dollar-variable-pattern': null,
    'custom-property-pattern': '^nova-[a-z0-9]+(?:-[a-z0-9]+)*$',
    'scale-unlimited/declaration-strict-value': [
      ['/color$/', 'background', 'background-color', 'box-shadow'],
      {
        ignoreValues: ['inherit', 'transparent', 'currentColor', 'none'],
        expandShorthand: true,
      },
    ],
  },
};
