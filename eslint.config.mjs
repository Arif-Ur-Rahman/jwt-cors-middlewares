import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    // Custom rules
    rules: {
      // Next.js specific rules
      "@next/next/no-img-element": "warn", // Allow img tags but warn
      "@next/next/no-html-link-for-pages": "off", // Disable if using custom links
      
      // React rules
      "react-hooks/exhaustive-deps": "warn", // Make it a warning instead of error
      "react/display-name": "off", // Disable display name requirement
      
      // TypeScript rules
      "@typescript-eslint/no-explicit-any": "warn", // Warn instead of error on 'any'
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }], // Allow unused variables with _ prefix
      
      // General JavaScript rules
      "no-console": "warn", // Warn on console statements instead of error
      "prefer-const": "warn", // Warn instead of error for let when const could be used
    },
  },
];

export default eslintConfig;