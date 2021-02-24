module.exports = {
  root: true,
  overrides: [
    {
      files: ["**"],
      excludedFiles: ["client/**", "server/**"],
      env: {
        node: true,
        es2021: true, // automatically sets parserOptions.ecmaVersion to 12
      },
      extends: ["eslint:recommended", "prettier"],
    },
    {
      files: ["client/**/*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: "client",
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
    {
      files: ["server/**/*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: "server",
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
