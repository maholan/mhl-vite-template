import { addons } from "@storybook/manager-api";
import { themes } from "@storybook/theming";

// Set initial Storybook chrome theme (sidebar, toolbar, panel).
addons.setConfig({ theme: themes.light });

// Mirror the canvas theme toggle into the manager chrome (sidebar/toolbar).
addons.getChannel().on("globalsUpdated", ({ globals }: { globals: Record<string, unknown> }) => {
  addons.setConfig({
    theme: globals["theme"] === "dark" ? themes.dark : themes.light,
  });
});
