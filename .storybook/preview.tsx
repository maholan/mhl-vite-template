import { withThemeByClassName } from "@storybook/addon-themes";

import type { Preview } from "@storybook/react";

import "./storybook.css";

const preview: Preview = {
  decorators: [
    // Applies `class="dark"` on the iframe's <html> element when the toolbar
    // theme is set to "dark". addon-themes handles both Canvas and Docs mode
    // correctly via Storybook's internal makeDecorator machinery.
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
    }),
  ],
  parameters: {
    // Disable the built-in backgrounds panel — the theme decorator drives
    // canvas colour via CSS custom properties on <html>.
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
