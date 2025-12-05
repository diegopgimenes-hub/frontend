/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  singleQuote: false, // você está usando aspas duplas no TS/React
  trailingComma: "all",
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",

  overrides: [
    {
      files: "*.md",
      options: {
        printWidth: 80,
      },
    },
    {
      files: "*.json",
      options: {
        trailingComma: "none",
      },
    },
  ],
};
