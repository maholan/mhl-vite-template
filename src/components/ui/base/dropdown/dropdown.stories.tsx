"use client";

import React, { useState } from "react";
import { Button as PrimitiveButton } from "react-aria-components";

import {
  Building05,
  HelpCircle,
  HomeLine,
  Keyboard01,
  LayersTwo01,
  LogOut01,
  MessageSmileCircle,
  SearchLg,
  Settings01,
  User01,
  UserPlus01,
  Users01,
  Zap,
} from "@/components/ui/assets/icons";

import { Dropdown } from "./dropdown";
import { Avatar } from "../avatar/avatar";
import { Button } from "../buttons/button/button";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Dropdown.Menu> = {
  title: "Base/Dropdown",
  component: Dropdown.Menu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible dropdown / context-menu built on React Aria MenuTrigger. " +
          "Compose Root, Popover, Menu, Section, Item, and Separator to build any menu layout.",
      },
    },
  },
} satisfies Meta<typeof Dropdown.Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Helpers ───────────────────────────────────────────────────────────────────

function BasicTrigger({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <Dropdown.Root>
      <Button color="secondary" size="sm">
        Options
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu>{children}</Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}

// ── Core variant stories ──────────────────────────────────────────────────────

export const Default: Story = {
  name: "Default (no selection)",
  args: {},
  render: () => (
    <BasicTrigger>
      <Dropdown.Item id="view" label="View details" selectionIndicator="none" />
      <Dropdown.Item id="edit" label="Edit" selectionIndicator="none" />
      <Dropdown.Item id="duplicate" label="Duplicate" selectionIndicator="none" />
      <Dropdown.Separator />
      <Dropdown.Item id="delete" label="Delete" selectionIndicator="none" />
    </BasicTrigger>
  ),
};

export const WithIcons: Story = {
  name: "With icons",
  args: {},
  render: () => (
    <BasicTrigger>
      <Dropdown.Item id="profile" label="View profile" icon={User01} selectionIndicator="none" />
      <Dropdown.Item id="settings" label="Settings" icon={Settings01} selectionIndicator="none" />
      <Dropdown.Separator />
      <Dropdown.Item id="logout" label="Log out" icon={LogOut01} selectionIndicator="none" />
    </BasicTrigger>
  ),
};

export const WithShortcuts: Story = {
  name: "With keyboard shortcuts",
  args: {},
  render: () => (
    <BasicTrigger>
      <Dropdown.Item
        id="profile"
        label="View profile"
        icon={User01}
        shortcut="⌘K→P"
        selectionIndicator="none"
      />
      <Dropdown.Item
        id="settings"
        label="Settings"
        icon={Settings01}
        shortcut="⌘S"
        selectionIndicator="none"
      />
      <Dropdown.Item
        id="keyboard"
        label="Keyboard shortcuts"
        icon={Keyboard01}
        shortcut="?"
        selectionIndicator="none"
      />
      <Dropdown.Separator />
      <Dropdown.Item
        id="logout"
        label="Sign out"
        icon={LogOut01}
        shortcut="⌥⇧Q"
        selectionIndicator="none"
      />
    </BasicTrigger>
  ),
};

export const WithAvatars: Story = {
  name: "With avatars",
  args: {},
  render: () => (
    <Dropdown.Root>
      <Button color="secondary" size="sm">
        Assign to
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu selectionMode="single">
          <Dropdown.Item
            id="alice"
            label="Alice Johnson"
            avatarUrl="https://i.pravatar.cc/32?img=1"
            selectionIndicator="checkmark"
          />
          <Dropdown.Item
            id="bob"
            label="Bob Smith"
            avatarUrl="https://i.pravatar.cc/32?img=2"
            selectionIndicator="checkmark"
          />
          <Dropdown.Item
            id="carol"
            label="Carol White"
            avatarUrl="https://i.pravatar.cc/32?img=3"
            selectionIndicator="checkmark"
          />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

export const WithCheckboxSelection: Story = {
  name: "Checkbox selection",
  args: {},
  render: () => (
    <Dropdown.Root>
      <Button color="secondary" size="sm">
        Filter columns
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu selectionMode="multiple" defaultSelectedKeys={["name", "email"]}>
          <Dropdown.Item id="name" label="Name" selectionIndicator="checkbox" />
          <Dropdown.Item id="email" label="Email" selectionIndicator="checkbox" />
          <Dropdown.Item id="role" label="Role" selectionIndicator="checkbox" />
          <Dropdown.Item id="status" label="Status" selectionIndicator="checkbox" />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

export const WithRadioSelection: Story = {
  name: "Radio selection",
  args: {},
  render: () => (
    <Dropdown.Root>
      <Button color="secondary" size="sm">
        Sort by
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu selectionMode="single" defaultSelectedKeys={["name"]}>
          <Dropdown.Item id="name" label="Name" selectionIndicator="radio" />
          <Dropdown.Item id="date" label="Date created" selectionIndicator="radio" />
          <Dropdown.Item id="status" label="Status" selectionIndicator="radio" />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

export const WithToggleSelection: Story = {
  name: "Toggle selection",
  args: {},
  render: () => (
    <Dropdown.Root>
      <Button color="secondary" size="sm">
        Display options
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu selectionMode="multiple" defaultSelectedKeys={["sidebar"]}>
          <Dropdown.Item id="sidebar" label="Sidebar" selectionIndicator="toggle" />
          <Dropdown.Item id="toolbar" label="Toolbar" selectionIndicator="toggle" />
          <Dropdown.Item id="statusbar" label="Status bar" selectionIndicator="toggle" />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

export const WithSections: Story = {
  name: "With sections",
  args: {},
  render: () => (
    <Dropdown.Root>
      <Button color="secondary" size="sm">
        Account
      </Button>
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Section>
            <Dropdown.SectionHeader>Account</Dropdown.SectionHeader>
            <Dropdown.Item id="profile" label="View profile" selectionIndicator="none" />
            <Dropdown.Item id="settings" label="Settings" selectionIndicator="none" />
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.SectionHeader>Support</Dropdown.SectionHeader>
            <Dropdown.Item id="help" label="Help center" selectionIndicator="none" />
            <Dropdown.Item id="docs" label="Documentation" selectionIndicator="none" />
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Item id="logout" label="Log out" selectionIndicator="none" />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

export const WithDisabledItems: Story = {
  name: "With disabled items",
  args: {},
  render: () => (
    <BasicTrigger>
      <Dropdown.Item id="edit" label="Edit" selectionIndicator="none" />
      <Dropdown.Item id="share" label="Share" selectionIndicator="none" isDisabled />
      <Dropdown.Item id="export" label="Export" selectionIndicator="none" isDisabled />
      <Dropdown.Separator />
      <Dropdown.Item id="delete" label="Delete" selectionIndicator="none" />
    </BasicTrigger>
  ),
};

export const DotsButtonTrigger: Story = {
  name: "DotsButton trigger (kebab menu)",
  args: {},
  render: () => (
    <Dropdown.Root>
      <Dropdown.DotsButton />
      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item id="edit" label="Edit" selectionIndicator="none" />
          <Dropdown.Item id="duplicate" label="Duplicate" selectionIndicator="none" />
          <Dropdown.Separator />
          <Dropdown.Item id="delete" label="Delete" selectionIndicator="none" />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

// ── Figma example stories (modified/) ────────────────────────────────────────

export const MenuAccount: Story = {
  name: "Example: Account (DotsButton trigger)",
  args: {},
  render: () => (
    <Dropdown.Root>
      <Dropdown.DotsButton />
      <Dropdown.Popover>
        <Dropdown.AccountHeader
          name="Cameron Yang"
          email="cameron@mhl.design"
          avatarSrc="https://i.pravatar.cc/40?img=12"
          isOnline
        />
        <Dropdown.Menu>
          <Dropdown.Item
            id="profile"
            label="View profile"
            icon={User01}
            shortcut="⌘K→P"
            selectionIndicator="none"
          />
          <Dropdown.Item
            id="settings"
            label="Settings"
            icon={Settings01}
            shortcut="⌘S"
            selectionIndicator="none"
          />
          <Dropdown.Item
            id="keyboard"
            label="Keyboard shortcuts"
            icon={Keyboard01}
            shortcut="?"
            selectionIndicator="none"
          />
          <Dropdown.Separator />
          <Dropdown.Item
            id="company"
            label="Company profile"
            icon={HomeLine}
            shortcut="⌘K→C"
            selectionIndicator="none"
          />
          <Dropdown.Item
            id="team"
            label="Team"
            icon={Users01}
            shortcut="⌘K→T"
            selectionIndicator="none"
          />
          <Dropdown.Item
            id="invite"
            label="Invite colleagues"
            icon={UserPlus01}
            shortcut="⌘I"
            selectionIndicator="none"
          />
          <Dropdown.Separator />
          <Dropdown.Item
            id="changelog"
            label="Changelog"
            icon={LayersTwo01}
            selectionIndicator="none"
          />
          <Dropdown.Item
            id="slack"
            label="Slack Community"
            icon={MessageSmileCircle}
            selectionIndicator="none"
          />
          <Dropdown.Item id="support" label="Support" icon={HelpCircle} selectionIndicator="none" />
          <Dropdown.Item id="api" label="API" icon={Building05} selectionIndicator="none" />
          <Dropdown.Separator />
          <Dropdown.Item
            id="logout"
            label="Sign out"
            icon={LogOut01}
            shortcut="⌥⇧Q"
            selectionIndicator="none"
          />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

export const MenuButtonExplore: Story = {
  name: "Example: Menu header (Button trigger)",
  args: {},
  render: () => (
    <Dropdown.Root>
      <Button color="secondary" size="sm">
        Dropdown
      </Button>
      <Dropdown.Popover>
        <Dropdown.MenuHeader>Dropdown menu</Dropdown.MenuHeader>
        <Dropdown.Menu>
          <Dropdown.Item
            id="profile"
            label="View profile"
            icon={User01}
            shortcut="⌘K→P"
            selectionIndicator="none"
          />
          <Dropdown.Item
            id="settings"
            label="Settings"
            icon={Settings01}
            shortcut="⌘S"
            selectionIndicator="none"
          />
          <Dropdown.Item
            id="keyboard"
            label="Keyboard shortcuts"
            icon={Zap}
            shortcut="?"
            selectionIndicator="none"
          />
          <Dropdown.Separator />
          <Dropdown.Item
            id="company"
            label="Company profile"
            icon={HomeLine}
            shortcut="⌘K→C"
            selectionIndicator="none"
          />
          <Dropdown.Item
            id="team"
            label="Team"
            icon={Users01}
            shortcut="⌘K→T"
            selectionIndicator="none"
          />
          <Dropdown.Item
            id="invite"
            label="Invite colleagues"
            icon={UserPlus01}
            shortcut="⌘I"
            selectionIndicator="none"
          />
          <Dropdown.Separator />
          <Dropdown.Item
            id="changelog"
            label="Changelog"
            icon={LayersTwo01}
            selectionIndicator="none"
          />
          <Dropdown.Item
            id="slack"
            label="Slack Community"
            icon={MessageSmileCircle}
            selectionIndicator="none"
          />
          <Dropdown.Item id="support" label="Support" icon={HelpCircle} selectionIndicator="none" />
          <Dropdown.Item id="api" label="API" icon={Building05} selectionIndicator="none" />
          <Dropdown.Separator />
          <Dropdown.Item
            id="logout"
            label="Sign out"
            icon={LogOut01}
            shortcut="⌥⇧Q"
            selectionIndicator="none"
          />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

export const MenuAccountCard: Story = {
  name: "Example: Account card (Avatar trigger)",
  args: {},
  render: () => (
    <Dropdown.Root>
      <PrimitiveButton
        aria-label="Open account menu"
        className={(state) =>
          `cursor-pointer rounded-full outline-hidden${state.isFocusVisible ? " ring-2 ring-brand-500 ring-offset-2" : ""}`
        }
      >
        <Avatar
          size="md"
          src="https://i.pravatar.cc/40?img=33"
          alt="Cameron Yang"
          className="size-8"
        />
      </PrimitiveButton>
      <Dropdown.Popover placement="bottom right">
        <Dropdown.AccountHeader
          name="Cameron Yang"
          email="cameron@mhl.design"
          avatarSrc="https://i.pravatar.cc/40?img=33"
          isOnline
        />
        <Dropdown.Menu>
          <Dropdown.Section>
            <Dropdown.SectionHeader>Account</Dropdown.SectionHeader>
            <Dropdown.Item
              id="profile"
              label="View profile"
              icon={User01}
              selectionIndicator="none"
            />
            <Dropdown.Item
              id="settings"
              label="Settings"
              icon={Settings01}
              selectionIndicator="none"
            />
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Section>
            <Dropdown.SectionHeader>Workspace</Dropdown.SectionHeader>
            <Dropdown.Item
              id="team"
              label="Team members"
              icon={Users01}
              selectionIndicator="none"
            />
            <Dropdown.Item
              id="invite"
              label="Invite people"
              icon={UserPlus01}
              selectionIndicator="none"
            />
          </Dropdown.Section>
          <Dropdown.Separator />
          <Dropdown.Item
            id="changelog"
            label="Changelog"
            icon={Zap}
            shortcut="⌥⇧C"
            selectionIndicator="none"
          />
          <Dropdown.Item
            id="support"
            label="Support"
            icon={MessageSmileCircle}
            selectionIndicator="none"
          />
          <Dropdown.Separator />
          <Dropdown.Item
            id="logout"
            label="Sign out"
            icon={LogOut01}
            shortcut="⌥⇧Q"
            selectionIndicator="none"
          />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

export const MenuSearchAdvanced: Story = {
  name: "Example: Search-filtered picker",
  args: {},
  render: function SearchStory() {
    const [query, setQuery] = useState("");
    const members = [
      { id: "alice", name: "Alice Johnson", avatarUrl: "https://i.pravatar.cc/32?img=1" },
      { id: "bob", name: "Bob Smith", avatarUrl: "https://i.pravatar.cc/32?img=2" },
      { id: "carol", name: "Carol White", avatarUrl: "https://i.pravatar.cc/32?img=3" },
      { id: "dan", name: "Dan Brown", avatarUrl: "https://i.pravatar.cc/32?img=4" },
      { id: "eva", name: "Eva Martinez", avatarUrl: "https://i.pravatar.cc/32?img=5" },
    ];
    const filtered = members.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()));
    return (
      <Dropdown.Root>
        <Button color="secondary" size="sm">
          Assign to
        </Button>
        <Dropdown.Popover>
          <div className="border-b border-secondary px-3 py-2">
            <div className="flex items-center gap-2 rounded-md border border-primary bg-primary px-3 py-2 focus-within:border-brand-300 focus-within:ring-1 focus-within:ring-brand-300">
              <SearchLg className="size-4 shrink-0 text-icon-quaternary" />
              <input
                autoFocus
                type="text"
                placeholder="Search members…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm text-primary outline-none placeholder:text-quaternary"
              />
            </div>
          </div>
          <Dropdown.Menu selectionMode="single">
            {filtered.length === 0 ? (
              <Dropdown.Item
                id="_empty"
                isDisabled
                label="No members found"
                selectionIndicator="none"
              />
            ) : (
              filtered.map((m) => (
                <Dropdown.Item
                  key={m.id}
                  id={m.id}
                  label={m.name}
                  avatarUrl={m.avatarUrl}
                  selectionIndicator="checkmark"
                />
              ))
            )}
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown.Root>
    );
  },
};

export const MenuAdvancedSubmenu: Story = {
  name: "Example: Advanced + submenu",
  args: {},
  render: () => (
    <Dropdown.Root>
      <Button color="secondary" size="sm">
        Options
      </Button>
      <Dropdown.Popover>
        <Dropdown.MenuHeader>Workspace</Dropdown.MenuHeader>
        <Dropdown.Menu>
          {/* Top section — account actions */}
          <Dropdown.Section>
            <Dropdown.SectionHeader>Account</Dropdown.SectionHeader>
            <Dropdown.Item
              id="profile"
              label="View profile"
              icon={User01}
              shortcut="⌘K→P"
              selectionIndicator="none"
            />
            <Dropdown.Item
              id="settings"
              label="Settings"
              icon={Settings01}
              shortcut="⌘S"
              selectionIndicator="none"
            />
          </Dropdown.Section>

          <Dropdown.Separator />

          {/* Team section — "Invite" opens a submenu */}
          <Dropdown.Section>
            <Dropdown.SectionHeader>Team</Dropdown.SectionHeader>
            <Dropdown.Item
              id="members"
              label="Team members"
              icon={Users01}
              selectionIndicator="none"
            />

            {/* ── Submenu: Invite options ── */}
            <Dropdown.SubmenuTrigger>
              <Dropdown.Item
                id="invite"
                label="Invite people"
                icon={UserPlus01}
                selectionIndicator="none"
              />
              <Dropdown.Popover placement="right top">
                <Dropdown.Menu>
                  <Dropdown.Item
                    id="invite-email"
                    label="Invite by email"
                    selectionIndicator="none"
                  />
                  <Dropdown.Item
                    id="invite-link"
                    label="Copy invite link"
                    selectionIndicator="none"
                  />
                  <Dropdown.Separator />
                  <Dropdown.Item
                    id="invite-slack"
                    label="Invite via Slack"
                    icon={MessageSmileCircle}
                    selectionIndicator="none"
                  />
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.SubmenuTrigger>

            {/* ── Submenu: Switch workspace ── */}
            <Dropdown.SubmenuTrigger>
              <Dropdown.Item
                id="workspace"
                label="Switch workspace"
                icon={LayersTwo01}
                selectionIndicator="none"
              />
              <Dropdown.Popover placement="right top">
                <Dropdown.Menu selectionMode="single" defaultSelectedKeys={["mhl"]}>
                  <Dropdown.Item
                    id="mhl"
                    label="MHL Design"
                    avatarUrl="https://i.pravatar.cc/32?img=10"
                    selectionIndicator="checkmark"
                  />
                  <Dropdown.Item
                    id="acme"
                    label="Acme Corp"
                    avatarUrl="https://i.pravatar.cc/32?img=11"
                    selectionIndicator="checkmark"
                  />
                  <Dropdown.Item
                    id="untitled"
                    label="Untitled Studio"
                    avatarUrl="https://i.pravatar.cc/32?img=12"
                    selectionIndicator="checkmark"
                  />
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown.SubmenuTrigger>
          </Dropdown.Section>

          <Dropdown.Separator />

          {/* Bottom section — support + sign out */}
          <Dropdown.Item
            id="help"
            label="Help & support"
            icon={HelpCircle}
            selectionIndicator="none"
          />
          <Dropdown.Item
            id="changelog"
            label="Changelog"
            icon={Zap}
            shortcut="⌥⇧C"
            selectionIndicator="none"
          />
          <Dropdown.Separator />
          <Dropdown.Item
            id="logout"
            label="Sign out"
            icon={LogOut01}
            shortcut="⌥⇧Q"
            selectionIndicator="none"
          />
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  ),
};

// ── AllStates showcase ────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  args: {},
  render: () => (
    <div className="flex flex-wrap items-start gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-tertiary">No selection</p>
        <Dropdown.Root>
          <Button color="secondary" size="sm">
            Options
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu>
              <Dropdown.Item id="edit" label="Edit" selectionIndicator="none" />
              <Dropdown.Item id="dup" label="Duplicate" selectionIndicator="none" />
              <Dropdown.Separator />
              <Dropdown.Item id="del" label="Delete" selectionIndicator="none" />
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown.Root>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-tertiary">With icons + shortcuts</p>
        <Dropdown.Root>
          <Button color="secondary" size="sm">
            Dropdown
          </Button>
          <Dropdown.Popover>
            <Dropdown.MenuHeader>Dropdown menu</Dropdown.MenuHeader>
            <Dropdown.Menu>
              <Dropdown.Item
                id="profile"
                label="View profile"
                icon={User01}
                shortcut="⌘K→P"
                selectionIndicator="none"
              />
              <Dropdown.Item
                id="settings"
                label="Settings"
                icon={Settings01}
                shortcut="⌘S"
                selectionIndicator="none"
              />
              <Dropdown.Separator />
              <Dropdown.Item
                id="logout"
                label="Sign out"
                icon={LogOut01}
                shortcut="⌥⇧Q"
                selectionIndicator="none"
              />
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown.Root>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-tertiary">Account header</p>
        <Dropdown.Root>
          <Dropdown.DotsButton />
          <Dropdown.Popover>
            <Dropdown.AccountHeader
              name="Cameron Yang"
              email="cameron@mhl.design"
              avatarSrc="https://i.pravatar.cc/40?img=12"
              isOnline
            />
            <Dropdown.Menu>
              <Dropdown.Item
                id="profile"
                label="View profile"
                icon={User01}
                selectionIndicator="none"
              />
              <Dropdown.Item
                id="settings"
                label="Settings"
                icon={Settings01}
                selectionIndicator="none"
              />
              <Dropdown.Separator />
              <Dropdown.Item
                id="logout"
                label="Sign out"
                icon={LogOut01}
                shortcut="⌥⇧Q"
                selectionIndicator="none"
              />
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown.Root>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-tertiary">Single select (checkmark)</p>
        <Dropdown.Root>
          <Button color="secondary" size="sm">
            Sort by
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu selectionMode="single" defaultSelectedKeys={["name"]}>
              <Dropdown.Item id="name" label="Name" selectionIndicator="checkmark" />
              <Dropdown.Item id="date" label="Date" selectionIndicator="checkmark" />
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown.Root>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-tertiary">Multi select (checkbox)</p>
        <Dropdown.Root>
          <Button color="secondary" size="sm">
            Columns
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu selectionMode="multiple" defaultSelectedKeys={["name"]}>
              <Dropdown.Item id="name" label="Name" selectionIndicator="checkbox" />
              <Dropdown.Item id="email" label="Email" selectionIndicator="checkbox" />
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown.Root>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-tertiary">Avatar picker</p>
        <Dropdown.Root>
          <Button color="secondary" size="sm">
            Assign to
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu selectionMode="single">
              <Dropdown.Item
                id="alice"
                label="Alice Johnson"
                avatarUrl="https://i.pravatar.cc/32?img=1"
                selectionIndicator="checkmark"
              />
              <Dropdown.Item
                id="bob"
                label="Bob Smith"
                avatarUrl="https://i.pravatar.cc/32?img=2"
                selectionIndicator="checkmark"
              />
              <Dropdown.Item
                id="carol"
                label="Carol White"
                avatarUrl="https://i.pravatar.cc/32?img=3"
                selectionIndicator="checkmark"
              />
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown.Root>
      </div>
    </div>
  ),
};
