import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {
    languageOptions: {
      globals: {
        ...globals.browser, ...globals.es2021,
        ...globals.node,
        ...globals.jest,
      }
    }
  },
  {
    ignores: ["dist"]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];