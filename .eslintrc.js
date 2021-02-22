module.exports = {
  root: true,
  overrides: [
    {
      files: ["**"],
      excludedFiles: ["src/**"],
      env: {
        node: true,
        es6: true, // automatically sets parserOptions.ecmaVersion to 6
      },
      extends: ["eslint:recommended", "prettier"],
    },
    {
      files: ["src/**/*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: "src",
        project: ["tsconfig.json"],
      },
      plugins: ["@typescript-eslint"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
        "prettier/@typescript-eslint",
      ],
    },
  ],
  ignorePatterns: [
    // "/**/node_modules/*", // default
    "node_modules/",
  ],
};
