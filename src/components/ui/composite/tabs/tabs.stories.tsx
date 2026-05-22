import { Tabs, TabsRoot } from "./tabs";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Composite/Tabs",
  component: TabsRoot,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Accessible Tabs built on React Aria. Five horizontal visual styles (button-brand, button-gray, button-border, button-minimal, underline) and two vertical styles (button-brand, line). " +
          "Full keyboard navigation, ARIA roles, and animated selection indicator included.",
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      table: { defaultValue: { summary: "horizontal" } },
    },
  },
} satisfies Meta<typeof TabsRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Horizontal types ───────────────────────────────────────────────────────────

export const ButtonBrand: Story = {
  name: "Button brand",
  args: {},
  render: () => (
    <Tabs.Root defaultSelectedKey="details">
      <Tabs.List type="button-brand">
        <Tabs.Item id="details">My details</Tabs.Item>
        <Tabs.Item id="profile">Profile</Tabs.Item>
        <Tabs.Item id="password">Password</Tabs.Item>
        <Tabs.Item id="team">Team</Tabs.Item>
        <Tabs.Item id="billing" badge={2}>
          Billing
        </Tabs.Item>
      </Tabs.List>
      <Tabs.Panel id="details" className="pt-4">
        My details panel
      </Tabs.Panel>
      <Tabs.Panel id="profile" className="pt-4">
        Profile panel
      </Tabs.Panel>
      <Tabs.Panel id="password" className="pt-4">
        Password panel
      </Tabs.Panel>
      <Tabs.Panel id="team" className="pt-4">
        Team panel
      </Tabs.Panel>
      <Tabs.Panel id="billing" className="pt-4">
        Billing panel
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

export const ButtonGray: Story = {
  name: "Button gray",
  args: {},
  render: () => (
    <Tabs.Root defaultSelectedKey="details">
      <Tabs.List type="button-gray">
        <Tabs.Item id="details">My details</Tabs.Item>
        <Tabs.Item id="profile">Profile</Tabs.Item>
        <Tabs.Item id="password">Password</Tabs.Item>
        <Tabs.Item id="team">Team</Tabs.Item>
        <Tabs.Item id="billing" badge={2}>
          Billing
        </Tabs.Item>
      </Tabs.List>
      <Tabs.Panel id="details" className="pt-4">
        My details panel
      </Tabs.Panel>
      <Tabs.Panel id="profile" className="pt-4">
        Profile panel
      </Tabs.Panel>
      <Tabs.Panel id="password" className="pt-4">
        Password panel
      </Tabs.Panel>
      <Tabs.Panel id="team" className="pt-4">
        Team panel
      </Tabs.Panel>
      <Tabs.Panel id="billing" className="pt-4">
        Billing panel
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

export const ButtonBorder: Story = {
  name: "Button border",
  args: {},
  render: () => (
    <Tabs.Root defaultSelectedKey="details">
      <Tabs.List type="button-border">
        <Tabs.Item id="details">My details</Tabs.Item>
        <Tabs.Item id="profile">Profile</Tabs.Item>
        <Tabs.Item id="password">Password</Tabs.Item>
        <Tabs.Item id="team">Team</Tabs.Item>
        <Tabs.Item id="billing" badge={2}>
          Billing
        </Tabs.Item>
      </Tabs.List>
      <Tabs.Panel id="details" className="pt-4">
        My details panel
      </Tabs.Panel>
      <Tabs.Panel id="profile" className="pt-4">
        Profile panel
      </Tabs.Panel>
      <Tabs.Panel id="password" className="pt-4">
        Password panel
      </Tabs.Panel>
      <Tabs.Panel id="team" className="pt-4">
        Team panel
      </Tabs.Panel>
      <Tabs.Panel id="billing" className="pt-4">
        Billing panel
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

export const ButtonMinimal: Story = {
  name: "Button minimal",
  args: {},
  render: () => (
    <Tabs.Root defaultSelectedKey="details">
      <Tabs.List type="button-minimal">
        <Tabs.Item id="details">My details</Tabs.Item>
        <Tabs.Item id="profile">Profile</Tabs.Item>
        <Tabs.Item id="password">Password</Tabs.Item>
        <Tabs.Item id="team">Team</Tabs.Item>
        <Tabs.Item id="billing" badge={2}>
          Billing
        </Tabs.Item>
      </Tabs.List>
      <Tabs.Panel id="details" className="pt-4">
        My details panel
      </Tabs.Panel>
      <Tabs.Panel id="profile" className="pt-4">
        Profile panel
      </Tabs.Panel>
      <Tabs.Panel id="password" className="pt-4">
        Password panel
      </Tabs.Panel>
      <Tabs.Panel id="team" className="pt-4">
        Team panel
      </Tabs.Panel>
      <Tabs.Panel id="billing" className="pt-4">
        Billing panel
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

export const Underline: Story = {
  name: "Underline",
  args: {},
  render: () => (
    <Tabs.Root defaultSelectedKey="details">
      <Tabs.List type="underline">
        <Tabs.Item id="details">My details</Tabs.Item>
        <Tabs.Item id="profile">Profile</Tabs.Item>
        <Tabs.Item id="password">Password</Tabs.Item>
        <Tabs.Item id="team">Team</Tabs.Item>
        <Tabs.Item id="billing" badge={2}>
          Billing
        </Tabs.Item>
      </Tabs.List>
      <Tabs.Panel id="details" className="pt-4">
        My details panel
      </Tabs.Panel>
      <Tabs.Panel id="profile" className="pt-4">
        Profile panel
      </Tabs.Panel>
      <Tabs.Panel id="password" className="pt-4">
        Password panel
      </Tabs.Panel>
      <Tabs.Panel id="team" className="pt-4">
        Team panel
      </Tabs.Panel>
      <Tabs.Panel id="billing" className="pt-4">
        Billing panel
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

export const UnderlineFullWidth: Story = {
  name: "Underline — full width",
  args: {},
  render: () => (
    <Tabs.Root defaultSelectedKey="details">
      <Tabs.List type="underline" fullWidth>
        <Tabs.Item id="details" className="flex-1 justify-center">
          My details
        </Tabs.Item>
        <Tabs.Item id="profile" className="flex-1 justify-center">
          Profile
        </Tabs.Item>
        <Tabs.Item id="password" className="flex-1 justify-center">
          Password
        </Tabs.Item>
      </Tabs.List>
      <Tabs.Panel id="details" className="pt-4">
        My details panel
      </Tabs.Panel>
      <Tabs.Panel id="profile" className="pt-4">
        Profile panel
      </Tabs.Panel>
      <Tabs.Panel id="password" className="pt-4">
        Password panel
      </Tabs.Panel>
    </Tabs.Root>
  ),
};

// ── Sizes ──────────────────────────────────────────────────────────────────────

export const SizeMd: Story = {
  name: "Size — md",
  args: {},
  render: () => (
    <div className="flex flex-col gap-8">
      <Tabs.Root defaultSelectedKey="details">
        <Tabs.List type="button-brand" size="md">
          <Tabs.Item id="details">My details</Tabs.Item>
          <Tabs.Item id="profile">Profile</Tabs.Item>
          <Tabs.Item id="team">Team</Tabs.Item>
        </Tabs.List>
        <Tabs.Panel id="details" className="pt-4">
          Details
        </Tabs.Panel>
        <Tabs.Panel id="profile" className="pt-4">
          Profile
        </Tabs.Panel>
        <Tabs.Panel id="team" className="pt-4">
          Team
        </Tabs.Panel>
      </Tabs.Root>
      <Tabs.Root defaultSelectedKey="details">
        <Tabs.List type="underline" size="md">
          <Tabs.Item id="details">My details</Tabs.Item>
          <Tabs.Item id="profile">Profile</Tabs.Item>
          <Tabs.Item id="team">Team</Tabs.Item>
        </Tabs.List>
        <Tabs.Panel id="details" className="pt-4">
          Details
        </Tabs.Panel>
        <Tabs.Panel id="profile" className="pt-4">
          Profile
        </Tabs.Panel>
        <Tabs.Panel id="team" className="pt-4">
          Team
        </Tabs.Panel>
      </Tabs.Root>
    </div>
  ),
};

// ── Vertical types ─────────────────────────────────────────────────────────────

export const VerticalButtonBrand: Story = {
  name: "Vertical — button brand",
  args: { orientation: "vertical" },
  render: () => (
    <Tabs.Root orientation="vertical" defaultSelectedKey="details" className="gap-6">
      <Tabs.List type="button-brand" className="w-44">
        <Tabs.Item id="details">My details</Tabs.Item>
        <Tabs.Item id="profile">Profile</Tabs.Item>
        <Tabs.Item id="password">Password</Tabs.Item>
        <Tabs.Item id="team">Team</Tabs.Item>
        <Tabs.Item id="billing" badge={2}>
          Billing
        </Tabs.Item>
      </Tabs.List>
      <div className="flex-1">
        <Tabs.Panel id="details">My details panel</Tabs.Panel>
        <Tabs.Panel id="profile">Profile panel</Tabs.Panel>
        <Tabs.Panel id="password">Password panel</Tabs.Panel>
        <Tabs.Panel id="team">Team panel</Tabs.Panel>
        <Tabs.Panel id="billing">Billing panel</Tabs.Panel>
      </div>
    </Tabs.Root>
  ),
};

export const VerticalLine: Story = {
  name: "Vertical — line",
  args: { orientation: "vertical" },
  render: () => (
    <Tabs.Root orientation="vertical" defaultSelectedKey="details" className="gap-6">
      <Tabs.List type="line" className="w-44">
        <Tabs.Item id="details">My details</Tabs.Item>
        <Tabs.Item id="profile">Profile</Tabs.Item>
        <Tabs.Item id="password">Password</Tabs.Item>
        <Tabs.Item id="team">Team</Tabs.Item>
        <Tabs.Item id="billing" badge={2}>
          Billing
        </Tabs.Item>
      </Tabs.List>
      <div className="flex-1">
        <Tabs.Panel id="details">My details panel</Tabs.Panel>
        <Tabs.Panel id="profile">Profile panel</Tabs.Panel>
        <Tabs.Panel id="password">Password panel</Tabs.Panel>
        <Tabs.Panel id="team">Team panel</Tabs.Panel>
        <Tabs.Panel id="billing">Billing panel</Tabs.Panel>
      </div>
    </Tabs.Root>
  ),
};

// ── All states showcase ────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  args: {},
  render: () => (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-secondary">Button brand — sm</p>
        <Tabs.Root defaultSelectedKey="a">
          <Tabs.List type="button-brand" size="sm">
            <Tabs.Item id="a">My details</Tabs.Item>
            <Tabs.Item id="b">Profile</Tabs.Item>
            <Tabs.Item id="c">Password</Tabs.Item>
            <Tabs.Item id="d" badge={2}>
              Notifications
            </Tabs.Item>
          </Tabs.List>
          <Tabs.Panel id="a" className="pt-3 text-sm text-tertiary">
            Panel A
          </Tabs.Panel>
          <Tabs.Panel id="b" className="pt-3 text-sm text-tertiary">
            Panel B
          </Tabs.Panel>
          <Tabs.Panel id="c" className="pt-3 text-sm text-tertiary">
            Panel C
          </Tabs.Panel>
          <Tabs.Panel id="d" className="pt-3 text-sm text-tertiary">
            Panel D
          </Tabs.Panel>
        </Tabs.Root>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-secondary">Button gray — sm</p>
        <Tabs.Root defaultSelectedKey="a">
          <Tabs.List type="button-gray" size="sm">
            <Tabs.Item id="a">My details</Tabs.Item>
            <Tabs.Item id="b">Profile</Tabs.Item>
            <Tabs.Item id="c">Password</Tabs.Item>
            <Tabs.Item id="d" badge={2}>
              Notifications
            </Tabs.Item>
          </Tabs.List>
          <Tabs.Panel id="a" className="pt-3 text-sm text-tertiary">
            Panel A
          </Tabs.Panel>
          <Tabs.Panel id="b" className="pt-3 text-sm text-tertiary">
            Panel B
          </Tabs.Panel>
          <Tabs.Panel id="c" className="pt-3 text-sm text-tertiary">
            Panel C
          </Tabs.Panel>
          <Tabs.Panel id="d" className="pt-3 text-sm text-tertiary">
            Panel D
          </Tabs.Panel>
        </Tabs.Root>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-secondary">Button border — sm</p>
        <Tabs.Root defaultSelectedKey="a">
          <Tabs.List type="button-border" size="sm">
            <Tabs.Item id="a">My details</Tabs.Item>
            <Tabs.Item id="b">Profile</Tabs.Item>
            <Tabs.Item id="c">Password</Tabs.Item>
          </Tabs.List>
          <Tabs.Panel id="a" className="pt-3 text-sm text-tertiary">
            Panel A
          </Tabs.Panel>
          <Tabs.Panel id="b" className="pt-3 text-sm text-tertiary">
            Panel B
          </Tabs.Panel>
          <Tabs.Panel id="c" className="pt-3 text-sm text-tertiary">
            Panel C
          </Tabs.Panel>
        </Tabs.Root>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-secondary">Button minimal — sm</p>
        <Tabs.Root defaultSelectedKey="a">
          <Tabs.List type="button-minimal" size="sm">
            <Tabs.Item id="a">My details</Tabs.Item>
            <Tabs.Item id="b">Profile</Tabs.Item>
            <Tabs.Item id="c">Password</Tabs.Item>
          </Tabs.List>
          <Tabs.Panel id="a" className="pt-3 text-sm text-tertiary">
            Panel A
          </Tabs.Panel>
          <Tabs.Panel id="b" className="pt-3 text-sm text-tertiary">
            Panel B
          </Tabs.Panel>
          <Tabs.Panel id="c" className="pt-3 text-sm text-tertiary">
            Panel C
          </Tabs.Panel>
        </Tabs.Root>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-secondary">Underline — sm</p>
        <Tabs.Root defaultSelectedKey="a">
          <Tabs.List type="underline" size="sm">
            <Tabs.Item id="a">My details</Tabs.Item>
            <Tabs.Item id="b">Profile</Tabs.Item>
            <Tabs.Item id="c">Password</Tabs.Item>
            <Tabs.Item id="d" badge={2}>
              Notifications
            </Tabs.Item>
          </Tabs.List>
          <Tabs.Panel id="a" className="pt-3 text-sm text-tertiary">
            Panel A
          </Tabs.Panel>
          <Tabs.Panel id="b" className="pt-3 text-sm text-tertiary">
            Panel B
          </Tabs.Panel>
          <Tabs.Panel id="c" className="pt-3 text-sm text-tertiary">
            Panel C
          </Tabs.Panel>
          <Tabs.Panel id="d" className="pt-3 text-sm text-tertiary">
            Panel D
          </Tabs.Panel>
        </Tabs.Root>
      </div>

      <div className="flex gap-12">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-secondary">Vertical button-brand</p>
          <Tabs.Root orientation="vertical" defaultSelectedKey="a" className="gap-6">
            <Tabs.List type="button-brand" className="w-40">
              <Tabs.Item id="a">My details</Tabs.Item>
              <Tabs.Item id="b">Profile</Tabs.Item>
              <Tabs.Item id="c">Password</Tabs.Item>
              <Tabs.Item id="d" badge={2}>
                Notifications
              </Tabs.Item>
            </Tabs.List>
            <div className="flex-1 text-sm text-tertiary">
              <Tabs.Panel id="a">Panel A</Tabs.Panel>
              <Tabs.Panel id="b">Panel B</Tabs.Panel>
              <Tabs.Panel id="c">Panel C</Tabs.Panel>
              <Tabs.Panel id="d">Panel D</Tabs.Panel>
            </div>
          </Tabs.Root>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-secondary">Vertical line</p>
          <Tabs.Root orientation="vertical" defaultSelectedKey="a" className="gap-6">
            <Tabs.List type="line" className="w-40">
              <Tabs.Item id="a">My details</Tabs.Item>
              <Tabs.Item id="b">Profile</Tabs.Item>
              <Tabs.Item id="c">Password</Tabs.Item>
              <Tabs.Item id="d" badge={2}>
                Notifications
              </Tabs.Item>
            </Tabs.List>
            <div className="flex-1 text-sm text-tertiary">
              <Tabs.Panel id="a">Panel A</Tabs.Panel>
              <Tabs.Panel id="b">Panel B</Tabs.Panel>
              <Tabs.Panel id="c">Panel C</Tabs.Panel>
              <Tabs.Panel id="d">Panel D</Tabs.Panel>
            </div>
          </Tabs.Root>
        </div>
      </div>
    </div>
  ),
};
