module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],
  rules: {
    "import/prefer-default-export": 0,
    "react/prop-types": 0,
    "react/jsx-filename-extension": 0,
    "no-shadow": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "react/no-array-index-key": 0,
    "no-param-reassign": 0,
    "consistent-return": 0,
    "react/jsx-indent": [1, 2],
    "function-paren-newline": ["error", { "minItems": 4 }],
    "object-curly-newline": [
        "error",
        {
            "ObjectExpression": { "multiline": true, "minProperties": 2 },
            "ObjectPattern": { "multiline": true, "minProperties": 2 },
            "ImportDeclaration": "never",
            "ExportDeclaration": { "multiline": true, "minProperties": 3 }
        }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
};