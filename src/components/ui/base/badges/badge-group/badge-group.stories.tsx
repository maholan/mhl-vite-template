import { ArrowRight } from "@/components/ui/assets";

import { BadgeGroup } from "./badge-group";
import { BADGE_GROUP_LIGHT_ICON } from "./badge-group.variants";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base/Badges/BadgeGroup",
  component: BadgeGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Announcement / callout badge combining a prominent addon pill with a text label. " +
          "Follows the Untitled UI BadgeGroup pattern with `light` (coloured) and `modern` (neutral + dot) themes. " +
          "Purely presentational — no React Aria wrapper needed.",
      },
    },
  },
  argTypes: {
    color: {
      control: "select",
      options: ["gray", "brand", "error", "warning", "success"],
      table: { defaultValue: { summary: "brand" } },
    },
    theme: {
      control: "select",
      options: ["light", "modern"],
      table: { defaultValue: { summary: "light" } },
    },
    size: {
      control: "select",
      options: ["md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    align: {
      control: "select",
      options: ["leading", "trailing"],
      table: { defaultValue: { summary: "leading" } },
    },
    addonText: { control: "text" },
    children: { control: "text" },
    className: { control: "text" },
  },
} satisfies Meta<typeof BadgeGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Individual stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    addonText: "New",
    children: "We just launched something amazing!",
  },
};

export const LightLeading: Story = {
  name: "Light / Leading (default)",
  args: {
    addonText: "New",
    children: "We just launched something amazing!",
    theme: "light",
    align: "leading",
    color: "brand",
  },
};

export const LightTrailing: Story = {
  name: "Light / Trailing",
  args: {
    addonText: "Read more",
    children: "New feature announcement",
    theme: "light",
    align: "trailing",
    color: "brand",
  },
};

export const ModernLeading: Story = {
  name: "Modern / Leading",
  args: {
    addonText: "New",
    children: "New feature launched",
    theme: "modern",
    align: "leading",
    color: "brand",
  },
};

export const ModernTrailing: Story = {
  name: "Modern / Trailing",
  args: {
    addonText: "Read more",
    children: "New feature announcement",
    theme: "modern",
    align: "trailing",
    color: "brand",
  },
};

export const SizeLg: Story = {
  name: "Size: lg",
  args: {
    addonText: "New",
    children: "Larger text variant",
    size: "lg",
    color: "brand",
  },
};

export const ColorGray: Story = {
  name: "Color: gray",
  args: { addonText: "Update", children: "Platform maintenance scheduled", color: "gray" },
};

export const ColorBrand: Story = {
  name: "Color: brand",
  args: { addonText: "New", children: "We just launched something amazing!", color: "brand" },
};

export const ColorError: Story = {
  name: "Color: error",
  args: { addonText: "Alert", children: "Service disruption detected", color: "error" },
};

export const ColorWarning: Story = {
  name: "Color: warning",
  args: { addonText: "Warning", children: "Approaching rate limit", color: "warning" },
};

export const ColorSuccess: Story = {
  name: "Color: success",
  args: { addonText: "Done", children: "Deployment completed successfully", color: "success" },
};

export const CustomIcon: Story = {
  name: "Custom icon",
  args: {
    addonText: "New",
    children: "We just launched something amazing!",
    color: "brand",
    iconTrailing: (
      <ArrowRight className={`ml-0.5 size-3 stroke-[3px] ${BADGE_GROUP_LIGHT_ICON.brand}`} />
    ),
  },
};

export const NoIcon: Story = {
  name: "No trailing icon",
  args: {
    addonText: "New",
    children: "We just launched something amazing!",
    iconTrailing: null,
  },
};

export const AddonOnly: Story = {
  name: "Addon only (no children)",
  args: { addonText: "New", iconTrailing: null },
};

// ── AllVariants showcase ──────────────────────────────────────────────────────

const COLORS = ["gray", "brand", "error", "warning", "success"] as const;

export const AllVariants: Story = {
  name: "All Variants",
  args: { addonText: "" },
  render: () => (
    <div className="flex flex-col gap-8 p-6">
      {/* Light — leading */}
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Light / Leading
        </p>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => (
            <BadgeGroup key={color} addonText="New" color={color} theme="light" align="leading">
              Announcement text
            </BadgeGroup>
          ))}
        </div>
      </section>

      {/* Light — trailing */}
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Light / Trailing
        </p>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => (
            <BadgeGroup
              key={color}
              addonText="Read more"
              color={color}
              theme="light"
              align="trailing"
            >
              Announcement text
            </BadgeGroup>
          ))}
        </div>
      </section>

      {/* Modern — leading */}
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Modern / Leading
        </p>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => (
            <BadgeGroup key={color} addonText="New" color={color} theme="modern" align="leading">
              Announcement text
            </BadgeGroup>
          ))}
        </div>
      </section>

      {/* Modern — trailing */}
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Modern / Trailing
        </p>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => (
            <BadgeGroup
              key={color}
              addonText="Read more"
              color={color}
              theme="modern"
              align="trailing"
            >
              Announcement text
            </BadgeGroup>
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">Sizes</p>
        <div className="flex flex-wrap items-center gap-3">
          <BadgeGroup addonText="New" color="brand" size="md">
            Size md
          </BadgeGroup>
          <BadgeGroup addonText="New" color="brand" size="lg">
            Size lg
          </BadgeGroup>
        </div>
      </section>
    </div>
  ),
};
