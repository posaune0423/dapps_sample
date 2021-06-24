module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  extends: ["@nuxtjs/eslint-config-typescript", 'prettier'],
  plugins: ["@typescript-eslint"],
  // add your custom rules here
  rules: {
    semi: ['error', 'never']
  }
}
