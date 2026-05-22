import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

// Rules enforced on all TypeScript files.
const baseRules = {
  "@typescript-eslint/no-explicit-any": "error",
  "@typescript-eslint/consistent-type-imports": [
    "error",
    { prefer: "type-imports", fixStyle: "inline-type-imports" },
  ],
  "no-console": ["warn", { allow: ["warn", "error"] }],
  "prefer-const": "error",
};

// Extra rules enforced only on consumer/app code (not on copied UI components).
const strictAppRules = {
  "@typescript-eslint/no-unsafe-assignment": "error",
  "@typescript-eslint/no-unsafe-member-access": "error",
  "@typescript-eslint/no-unsafe-call": "error",
  "@typescript-eslint/no-unsafe-return": "error",
  "@typescript-eslint/no-unsafe-argument": "error",
  "@typescript-eslint/no-unnecessary-condition": "error",
  "@typescript-eslint/no-confusing-void-expression": ["error", { ignoreArrowShorthand: true }],
  "@typescript-eslint/restrict-template-expressions": "error",
};

export default tseslint.config(
  { ignores: ["dist/**", "node_modules/**", "storybook-static/**"] },

  // ── Node config files (vite.config.ts, postcss.config.mjs, etc.) ───────────
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    files: ["*.config.ts", "*.config.*.ts", ".storybook/main.ts", ".storybook/manager.ts"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: ["./tsconfig.node.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: baseRules,
  },

  // ── Copied MHL UI components — linted but not strict-typed ─────────────────
  // These files are maintained upstream in @maholan/ui and authored under a
  // different (non-strict) rule set. Warnings are visible but do not block dev.
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    files: ["src/components/ui/**/*.{ts,tsx}", "src/libs/**/*.{ts,tsx}", ".storybook/preview.tsx"],
    linterOptions: {
      // Upstream files contain eslint-disable comments for plugins not installed
      // here (jsx-a11y, regexp, etc.). Suppress "unused disable directive" errors.
      reportUnusedDisableDirectives: false,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "off",
      ...baseRules,
      // Storybook render() functions use useState — hooks rule fires a false positive
      // because the function is named "render", not "use*" or a PascalCase component.
      "react-hooks/rules-of-hooks": "off",
      // Downgrade to warn — these fire on patterns in the upstream source
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-confusing-void-expression": "warn",
      "@typescript-eslint/restrict-template-expressions": "warn",
      "@typescript-eslint/unified-signatures": "warn",
      "@typescript-eslint/no-deprecated": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-useless-default-assignment": "warn",
      "@typescript-eslint/no-unnecessary-type-assertion": "warn",
      "@typescript-eslint/unbound-method": "warn",
      // Rules from upstream plugins not installed in this template — silence unknown-rule errors
      "jsx-a11y/anchor-is-valid": "off",
      "jsx-a11y/anchor-has-content": "off",
      "regexp/strict": "off",
      "regexp/no-dupe-characters-character-class": "off",
      "@typescript-eslint/naming-convention": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },

  // ── Consumer app code — full strict rules ───────────────────────────────────
  {
    extends: [js.configs.recommended, ...tseslint.configs.strictTypeChecked],
    files: ["src/*.{ts,tsx}", "src/pages/**/*.{ts,tsx}", "src/components/*.{ts,tsx}", "src/components/[^u]*/**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      ...baseRules,
      ...strictAppRules,
    },
  }
);
