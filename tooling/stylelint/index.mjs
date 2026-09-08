export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'selector-class-pattern': null,
    'scss/dollar-variable-pattern': null,
    'custom-property-pattern': '^nova-[a-z0-9]+(?:-[a-z0-9]+)*$',
  },
};
