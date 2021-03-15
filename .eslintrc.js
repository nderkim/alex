module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true, // automatically sets parserOptions.ecmaVersion to 12
  },
  extends: ["eslint:recommended", "prettier"],
  ignorePatterns: [
    "node_modules/", // default is "/**/node_modules/*"
  ],
};
