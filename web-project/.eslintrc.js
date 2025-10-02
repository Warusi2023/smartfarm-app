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
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        // Console logging rules
        'no-console': ['error', { 
            allow: ['warn', 'error', 'info'] 
        }],
        
        // Code quality rules
        'no-unused-vars': ['error', { 
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
        }],
        'no-undef': 'error',
        'no-unreachable': 'error',
        'no-duplicate-case': 'error',
        'no-empty': 'error',
        'no-extra-semi': 'error',
        'no-func-assign': 'error',
        'no-invalid-regexp': 'error',
        'no-irregular-whitespace': 'error',
        'no-obj-calls': 'error',
        'no-sparse-arrays': 'error',
        'no-unexpected-multiline': 'error',
        'use-isnan': 'error',
        'valid-typeof': 'error',
        
        // Best practices
        'eqeqeq': ['error', 'always'],
        'no-alert': 'warn',
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error',
        'no-script-url': 'error',
        'no-sequences': 'error',
        'no-throw-literal': 'error',
        'no-useless-concat': 'error',
        'radix': 'error',
        'wrap-iife': ['error', 'any'],
        'yoda': 'error',
        
        // Variables
        'no-catch-shadow': 'error',
        'no-delete-var': 'error',
        'no-label-var': 'error',
        'no-shadow': 'error',
        'no-shadow-restricted-names': 'error',
        'no-use-before-define': ['error', { 
            functions: false,
            classes: true,
            variables: true
        }],
        
        // Stylistic issues
        'array-bracket-spacing': ['error', 'never'],
        'block-spacing': ['error', 'always'],
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'comma-dangle': ['error', 'never'],
        'comma-spacing': ['error', { before: false, after: true }],
        'comma-style': ['error', 'last'],
        'computed-property-spacing': ['error', 'never'],
        'func-call-spacing': ['error', 'never'],
        'indent': ['error', 4, { SwitchCase: 1 }],
        'key-spacing': ['error', { beforeColon: false, afterColon: true }],
        'keyword-spacing': ['error', { before: true, after: true }],
        'linebreak-style': ['error', 'unix'],
        'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
        'no-trailing-spaces': 'error',
        'object-curly-spacing': ['error', 'always'],
        'quotes': ['error', 'single', { avoidEscape: true }],
        'semi': ['error', 'always'],
        'semi-spacing': ['error', { before: false, after: true }],
        'space-before-blocks': ['error', 'always'],
        'space-before-function-paren': ['error', 'never'],
        'space-in-parens': ['error', 'never'],
        'space-infix-ops': 'error',
        'space-unary-ops': ['error', { words: true, nonwords: false }],
        'spaced-comment': ['error', 'always'],
        
        // SmartFarm specific rules
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-arrow-callback': 'error',
        'arrow-spacing': ['error', { before: true, after: true }],
        'template-curly-spacing': ['error', 'never'],
        'object-shorthand': 'error',
        'prefer-template': 'error'
    },
    globals: {
        // SmartFarm globals
        'SmartFarmLogger': 'readonly',
        'SmartFarmAPI': 'readonly',
        'SmartFarmConfig': 'readonly',
        'SmartFarmEnvironment': 'readonly',
        'SmartFarmErrorBoundary': 'readonly',
        
        // Browser globals
        'window': 'readonly',
        'document': 'readonly',
        'navigator': 'readonly',
        'localStorage': 'readonly',
        'sessionStorage': 'readonly',
        'fetch': 'readonly',
        'Promise': 'readonly',
        'console': 'readonly',
        'alert': 'readonly',
        'confirm': 'readonly',
        'setTimeout': 'readonly',
        'setInterval': 'readonly',
        'clearTimeout': 'readonly',
        'clearInterval': 'readonly',
        'URL': 'readonly',
        'Blob': 'readonly',
        'FormData': 'readonly',
        'FileReader': 'readonly',
        'btoa': 'readonly',
        'atob': 'readonly',
        'JSON': 'readonly',
        'Math': 'readonly',
        'Date': 'readonly',
        'Array': 'readonly',
        'Object': 'readonly',
        'String': 'readonly',
        'Number': 'readonly',
        'Boolean': 'readonly',
        'RegExp': 'readonly',
        'Error': 'readonly',
        'TypeError': 'readonly',
        'ReferenceError': 'readonly',
        'SyntaxError': 'readonly',
        'RangeError': 'readonly',
        'EvalError': 'readonly',
        'URIError': 'readonly',
        'isNaN': 'readonly',
        'isFinite': 'readonly',
        'parseInt': 'readonly',
        'parseFloat': 'readonly',
        'encodeURI': 'readonly',
        'encodeURIComponent': 'readonly',
        'decodeURI': 'readonly',
        'decodeURIComponent': 'readonly',
        'escape': 'readonly',
        'unescape': 'readonly',
        'Infinity': 'readonly',
        'NaN': 'readonly',
        'undefined': 'readonly',
        'null': 'readonly',
        'true': 'readonly',
        'false': 'readonly',
        
        // Third-party globals
        'bootstrap': 'readonly',
        'Chart': 'readonly',
        'L': 'readonly',
        'jsPDF': 'readonly',
        'jspdf': 'readonly',
        'QRCode': 'readonly',
        'qrcode': 'readonly'
    },
    overrides: [
        {
            files: ['js/log.js'],
            rules: {
                'no-console': 'off'
            }
        },
        {
            files: ['tests/**/*.js'],
            env: {
                jest: true
            }
        }
    ]
};
