import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

/**
 * ESLint moderno e otimizado para React + TypeScript + Vite + Prettier
 * Baseado no ESLint Flat Config (ESLint 8.56+)
 */
export default [
  js.configs.recommended,
  prettier, // ✅ desativa regras conflitantes com Prettier

  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    ignores: ["node_modules/", "dist/", "build/", "coverage/", "vite.config.ts", "tsconfig.*.json"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      "@typescript-eslint": tseslint,
      react,
      "react-hooks": reactHooks,
    },

    settings: {
      react: {
        version: "detect",
      },
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
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",

      // Geral
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
];
