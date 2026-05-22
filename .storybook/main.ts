import path from "path";

import tailwindcss from "@tailwindcss/vite";

import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.tsx"],
  staticDirs: ["../public"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-themes"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: (viteConfig) => {
    viteConfig.plugins ??= [];
    viteConfig.plugins.push(tailwindcss());

    viteConfig.resolve ??= {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
    };

    return viteConfig;
  },
};

export default config;
