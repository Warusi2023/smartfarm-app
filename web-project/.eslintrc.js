module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Prevent invalid SVG viewBox attributes
    'no-restricted-syntax': [
      'error',
      {
        selector: 'Literal[value*="viewBox"][value*="%"]',
        message: 'SVG viewBox attributes must not contain percentage values. Use numeric values only.'
      },
      {
        selector: 'Literal[value*="viewBox"][value*="px"]',
        message: 'SVG viewBox attributes must not contain pixel values. Use numeric values only.'
      }
    ],
    // Prevent Chart.js maintainAspectRatio: false (which causes viewBox errors)
    'no-restricted-properties': [
      'error',
      {
        object: 'options',
        property: 'maintainAspectRatio',
        message: 'Chart.js maintainAspectRatio should be true to prevent invalid SVG viewBox attributes. Use aspectRatio property instead.'
      }
    ]
  },
  overrides: [
    {
      files: ['*.html'],
      rules: {
        // HTML-specific rules for SVG viewBox validation
        'no-restricted-syntax': [
          'error',
          {
            selector: 'Literal[value*="viewBox"][value*="%"]',
            message: 'SVG viewBox attributes must not contain percentage values. Use numeric values only.'
          },
          {
            selector: 'Literal[value*="viewBox"][value*="px"]',
            message: 'SVG viewBox attributes must not contain pixel values. Use numeric values only.'
          },
          {
            selector: 'Literal[value*="maintainAspectRatio.*false"]',
            message: 'Chart.js maintainAspectRatio should be true to prevent invalid SVG viewBox attributes.'
          }
        ]
      }
    }
  ]
};