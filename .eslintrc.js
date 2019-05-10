module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': 'off',
        'space-before-function-paren': 'off',
        'no-spaced-func': 'off',
        'no-tabs': 'off',
        'comma-dangle': 'off',
        'eslint-disable-next-line': 'off',
        'no-trailing-spaces': 'off',
        'no-unused-vars': 'off',
        'eol-last': 'off',
        'padded-blocks': 'off',
        'keyword-spacing': 'off',
        'no-multiple-empty-lines': 'off',
        'semi': 'off',
        'no-useless-return': 'off',
        'no-undef': 'off',
        'quotes': 'off',
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
