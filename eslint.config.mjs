// 📄 eslint.config.mjs
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier"; // ✅ plugin, não config
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint"; // ✅ pacote correto

/**
 * ESLint moderno e otimizado para React + TypeScript + Vite + Prettier
 * Compatível com ESLint 9+ (Flat Config)
 */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended, // ✅ garante parser e regras TS corretas

  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    ignores: ["node_modules/", "dist/", "build/", "coverage/", "vite.config.ts", "tsconfig.*.json"],

    languageOptions: {
      parser: tsParser, // ✅ parser TS garantido
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      prettier,
      react,
      "react-hooks": reactHooks,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      // ✅ React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // ✅ React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ✅ TypeScript — ignora variáveis com prefixo "_"
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",

      // ✅ Geral
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // ✅ Prettier integrado
      "prettier/prettier": [
        "warn",
        {
          endOfLine: "auto",
          singleQuote: false,
          printWidth: 100,
          tabWidth: 2,
          semi: true,
          trailingComma: "all",
        },
      ],
    },
  },
];
