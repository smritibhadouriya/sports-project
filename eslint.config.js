import js from "@eslint/js";
import globals from "globals";

export default [
  // don't lint build output / deps / static assets
  { ignores: ["dist/**", "node_modules/**", "public/**"] },

  js.configs.recommended,

  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser, // window, document, fetch, localStorage, console, URLSearchParams…
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }, // ← lets ESLint read React JSX (<div/> etc.)
      },
    },
    rules: {
      // unused vars are a warning, not a build-blocking error
      "no-unused-vars": ["warn", { varsIgnorePattern: "^[A-Z_]", argsIgnorePattern: "^_" }],
      "no-useless-escape": "warn",
      // empty `catch {}` is fine (used to silently ignore failures)
      "no-empty": ["error", { allowEmptyCatch: true }],
    },
  },
];
