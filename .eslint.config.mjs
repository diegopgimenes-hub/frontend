// .eslint.config.mjs
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

/**
 * ESLint Flat Config — configuração completa do projeto
 * Analisa todos os arquivos TS/TSX/JS/JSX sob src/
 * Ignora build, node_modules e configs.
 */
export default [
  js.configs.recommended,
  prettier,
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    ignores: ["node_modules/", "dist/", "build/", "coverage/", "vite.config.ts", "tsconfig*.json"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // TypeScript
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",

      // Geral
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];
