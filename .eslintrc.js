module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:i18next/recommended',
    'plugin:storybook/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
    'react-hooks',
    'zavalition-fsd',
    'unused-imports',
    'import',
  ],
  rules: {
    'unused-imports/no-unused-imports': 'error',
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'i18next/no-literal-string': [
      'error',
      {
        markupOnly: true,
        ignoreAttribute: [
          'data-testid',
          'to',
          'target',
          'justify',
          'align',
          'direction',
          'gap',
          'role',
          'as',
          'border',
          'color',
          'variant',
          'size',
          'wrap',
          'label',
          'placeholder',
          'alt',
          'autoComplete',
        ],
      },
    ],
    'max-len': ['error', { ignoreComments: true, code: 130 }],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-param-reassign': 'off',
    'no-undef': 'off',
    'react/no-array-index-key': 'off',
    'zavalition-fsd/path-checker': ['error', { alias: '@' }],
    'zavalition-fsd/layer-imports': [
      'error',
      {
        alias: '@',
        ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
      },
    ],
    'zavalition-fsd/public-api-imports': [
      'error',
      {
        alias: '@',
        testFilesPatterns: [
          '**/*.test.*',
          '**/*.stories.*',
          '**/StoreDecorator.tsx',
        ],
      },
    ],
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: './**.module.*',
            group: 'internal',
            position: 'after',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: false,
        },
      },
    ],
    'react/jsx-max-props-per-line': ['error', { maximum: 4 }],
    'react/no-unstable-nested-components': 1,
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
  overrides: [
    {
      files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
      rules: {
        'max-len': 'off',
      },
    },
  ],
};
