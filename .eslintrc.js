const fs = require("fs");

module.exports = {
  root: true,
  overrides: [
    {
      files: ["**"],
      excludedFiles: ["src/**"],
      env: {
        node: true,
        es2021: true, // automatically sets parserOptions.ecmaVersion to 12
      },
      extends: ["eslint:recommended", "prettier"],
    },
    ...fs
      .readdirSync("src", { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => ({
        files: [`src/${dirent.name}/**/*.ts`],
        parser: "@typescript-eslint/parser",
        parserOptions: {
          tsconfigRootDir: `src/${dirent.name}`,
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
      })),
  ],
  ignorePatterns: [
    // "/**/node_modules/*", // default
    "node_modules/",
  ],
};
