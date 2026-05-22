import { Breadcrumbs, BreadcrumbsRoot } from "./breadcrumbs";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Composite/Breadcrumbs",
  component: BreadcrumbsRoot,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Breadcrumbs display a navigation hierarchy. Three visual styles (text, text-with-line, button) " +
          "× two dividers (chevron, slash). Supports home icon, overflow ellipsis, and automatic current-page marking.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "text-with-line", "button"],
      table: { defaultValue: { summary: "text" } },
    },
    divider: {
      control: "select",
      options: ["chevron", "slash"],
      table: { defaultValue: { summary: "chevron" } },
    },
  },
} satisfies Meta<typeof BreadcrumbsRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Text type ──────────────────────────────────────────────────────────────────

export const TextChevron: Story = {
  name: "Text — chevron",
  args: { children: null },
  render: () => (
    <Breadcrumbs.Root type="text" divider="chevron">
      <Breadcrumbs.List>
        <Breadcrumbs.Item href="/" isHome />
        <Breadcrumbs.Item href="/settings">Settings</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/settings/team">Team</Breadcrumbs.Item>
        <Breadcrumbs.Item>Profile</Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs.Root>
  ),
};

export const TextSlash: Story = {
  name: "Text — slash",
  args: { children: null },
  render: () => (
    <Breadcrumbs.Root type="text" divider="slash">
      <Breadcrumbs.List>
        <Breadcrumbs.Item href="/" isHome />
        <Breadcrumbs.Item href="/settings">Settings</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/settings/team">Team</Breadcrumbs.Item>
        <Breadcrumbs.Item>Profile</Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs.Root>
  ),
};

// ── Text with line type ────────────────────────────────────────────────────────

export const TextWithLineChevron: Story = {
  name: "Text with line — chevron",
  args: { children: null },
  render: () => (
    <Breadcrumbs.Root type="text-with-line" divider="chevron">
      <Breadcrumbs.List>
        <Breadcrumbs.Item href="/" isHome />
        <Breadcrumbs.Item href="/settings">Settings</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/settings/team">Team</Breadcrumbs.Item>
        <Breadcrumbs.Item>Profile</Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs.Root>
  ),
};

export const TextWithLineSlash: Story = {
  name: "Text with line — slash",
  args: { children: null },
  render: () => (
    <Breadcrumbs.Root type="text-with-line" divider="slash">
      <Breadcrumbs.List>
        <Breadcrumbs.Item href="/" isHome />
        <Breadcrumbs.Item href="/settings">Settings</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/settings/team">Team</Breadcrumbs.Item>
        <Breadcrumbs.Item>Profile</Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs.Root>
  ),
};

// ── Button type ────────────────────────────────────────────────────────────────

export const ButtonChevron: Story = {
  name: "Button — chevron",
  args: { children: null },
  render: () => (
    <Breadcrumbs.Root type="button" divider="chevron">
      <Breadcrumbs.List>
        <Breadcrumbs.Item href="/" isHome />
        <Breadcrumbs.Item href="/settings">Settings</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/settings/team">Team</Breadcrumbs.Item>
        <Breadcrumbs.Item>Profile</Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs.Root>
  ),
};

export const ButtonSlash: Story = {
  name: "Button — slash",
  args: { children: null },
  render: () => (
    <Breadcrumbs.Root type="button" divider="slash">
      <Breadcrumbs.List>
        <Breadcrumbs.Item href="/" isHome />
        <Breadcrumbs.Item href="/settings">Settings</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/settings/team">Team</Breadcrumbs.Item>
        <Breadcrumbs.Item>Profile</Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs.Root>
  ),
};

// ── Overflow ellipsis ──────────────────────────────────────────────────────────

export const WithOverflow: Story = {
  name: "With overflow ellipsis",
  args: { children: null },
  render: () => (
    <div className="flex flex-col gap-6">
      <Breadcrumbs.Root type="text" divider="chevron">
        <Breadcrumbs.List maxItems={3}>
          <Breadcrumbs.Item href="/" isHome />
          <Breadcrumbs.Item href="/projects">Projects</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/projects/alpha">Alpha</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/projects/alpha/sprint-4">Sprint 4</Breadcrumbs.Item>
          <Breadcrumbs.Item>Ticket-123</Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs.Root>
      <Breadcrumbs.Root type="button" divider="slash">
        <Breadcrumbs.List maxItems={3}>
          <Breadcrumbs.Item href="/" isHome />
          <Breadcrumbs.Item href="/projects">Projects</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/projects/alpha">Alpha</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/projects/alpha/sprint-4">Sprint 4</Breadcrumbs.Item>
          <Breadcrumbs.Item>Ticket-123</Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs.Root>
    </div>
  ),
};

// ── All states ─────────────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  args: { children: null },
  render: () => (
    <div className="flex flex-col gap-8">
      {(["chevron", "slash"] as const).map((divider) => (
        <div key={divider} className="flex flex-col gap-4">
          <p className="text-sm font-semibold text-secondary capitalize">{divider} divider</p>
          {(["text", "text-with-line", "button"] as const).map((type) => (
            <div key={type} className="flex flex-col gap-1">
              <p className="text-xs text-tertiary">{type}</p>
              <Breadcrumbs.Root type={type} divider={divider}>
                <Breadcrumbs.List>
                  <Breadcrumbs.Item href="/" isHome />
                  <Breadcrumbs.Item href="/settings">Settings</Breadcrumbs.Item>
                  <Breadcrumbs.Item href="/settings/team">Team</Breadcrumbs.Item>
                  <Breadcrumbs.Item>Profile</Breadcrumbs.Item>
                </Breadcrumbs.List>
              </Breadcrumbs.Root>
            </div>
          ))}
        </div>
      ))}

      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-secondary">With overflow (maxItems=3)</p>
        <Breadcrumbs.Root type="text" divider="chevron">
          <Breadcrumbs.List maxItems={3}>
            <Breadcrumbs.Item href="/" isHome />
            <Breadcrumbs.Item href="/a">Projects</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/a/b">Alpha</Breadcrumbs.Item>
            <Breadcrumbs.Item href="/a/b/c">Sprint 4</Breadcrumbs.Item>
            <Breadcrumbs.Item>Ticket-123</Breadcrumbs.Item>
          </Breadcrumbs.List>
        </Breadcrumbs.Root>
      </div>
    </div>
  ),
};
