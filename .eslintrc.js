module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-var-requires': 'off',
    // 允许多余空格
    'no-trailing-spaces': 0,
    // 关闭制表符
    'no-tabs': 0,
    'eol-last': 0,
    // 允许三元运算符
    'no-unused-expressions': 0,
    // 函数名称和括号之间必须有空格关闭
    'space-before-function-paren': 0,
    // 不校验缩进
    'indent': 'off',
    'eqeqeq': 'off',
    'no-useless-escape': 0,
    'keyword-spacing': 0,
    'vue/no-parsing-error': 0,
    'no-irregular-whitespace': 0,
    'spaced-comment': 0
  }
}
