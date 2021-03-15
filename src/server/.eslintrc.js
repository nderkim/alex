module.exports = {
  overrides: [
    {
      files: ["**"],
      excludedFiles: [
        ".*rc.js",
        "*.config.js",
        "hmr.js", // TODO
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: __dirname,
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
};
