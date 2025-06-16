// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Using flat config format with proper Next.js setup
const eslintConfig = [
  // Use compat to import traditional config
  ...compat.extends("next/core-web-vitals"),

  // Add Storybook rules manually for compatibility
  {
    files: ["**/*.stories.@(js|jsx|ts|tsx)"],
    plugins: {
      storybook
    },
    rules: {
      "storybook/await-interactions": "error",
      "storybook/context-in-play-function": "error",
      "storybook/default-exports": "error",
      "storybook/hierarchy-separator": "warn",
      "storybook/no-redundant-story-name": "warn",
      "storybook/prefer-pascal-case": "warn",
      "storybook/story-exports": "error",
      "storybook/use-storybook-expect": "error",
      "storybook/use-storybook-testing-library": "error"
    }
  }
];

export default eslintConfig;
