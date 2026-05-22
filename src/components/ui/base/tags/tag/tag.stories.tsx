import React from "react";

import { Tag, TagGroup, TagList } from "./tag";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Base/Tags",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible tag / badge chip system built on React Aria. " +
          "Supports three sizes, avatar, dot indicator, count badge, " +
          "dismiss button, and single / multiple selection modes.\n\n" +
          "**Selection behaviour:** when `selectionMode` is set on `TagGroup`, only the " +
          "checkbox dot area triggers selection — clicking the tag body has no effect. " +
          "The tag body cursor is `cursor-default`, making the affordance clear.",
      },
    },
  },
  argTypes: {
    isDisabled: { control: "boolean" },
    count: { control: "number" },
    dot: { control: "boolean" },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Individual stories ────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <TagGroup label="Default tags" size="sm">
      <TagList className="flex flex-wrap gap-2">
        <Tag id="react">React</Tag>
        <Tag id="typescript">TypeScript</Tag>
        <Tag id="tailwind">Tailwind CSS</Tag>
      </TagList>
    </TagGroup>
  ),
};

export const SizeMd: Story = {
  name: "Size: md",
  render: () => (
    <TagGroup label="Medium tags" size="md">
      <TagList className="flex flex-wrap gap-2">
        <Tag id="react">React</Tag>
        <Tag id="typescript">TypeScript</Tag>
        <Tag id="tailwind">Tailwind CSS</Tag>
      </TagList>
    </TagGroup>
  ),
};

export const SizeLg: Story = {
  name: "Size: lg",
  render: () => (
    <TagGroup label="Large tags" size="lg">
      <TagList className="flex flex-wrap gap-2">
        <Tag id="react">React</Tag>
        <Tag id="typescript">TypeScript</Tag>
        <Tag id="tailwind">Tailwind CSS</Tag>
      </TagList>
    </TagGroup>
  ),
};

export const WithCount: Story = {
  name: "With count badge",
  render: () => (
    <TagGroup label="Tags with count" size="sm">
      <TagList className="flex flex-wrap gap-2">
        <Tag id="open" count={12}>
          Open
        </Tag>
        <Tag id="in-review" count={5}>
          In Review
        </Tag>
        <Tag id="closed" count={84}>
          Closed
        </Tag>
      </TagList>
    </TagGroup>
  ),
};

export const WithDot: Story = {
  name: "With dot indicator",
  render: () => (
    <TagGroup label="Tags with dot" size="sm">
      <TagList className="flex flex-wrap gap-2">
        <Tag id="active" dot>
          Active
        </Tag>
        <Tag id="online" dot>
          Online
        </Tag>
      </TagList>
    </TagGroup>
  ),
};

export const WithAvatar: Story = {
  name: "With avatar",
  render: () => (
    <TagGroup label="Tags with avatar" size="sm">
      <TagList className="flex flex-wrap gap-2">
        <Tag id="alice" avatarSrc="https://i.pravatar.cc/48?img=1">
          Alice
        </Tag>
        <Tag id="bob" avatarSrc="https://i.pravatar.cc/48?img=2">
          Bob
        </Tag>
        {/* No src — falls back to user icon */}
        <Tag id="charlie">Charlie</Tag>
      </TagList>
    </TagGroup>
  ),
};

export const Closable: Story = {
  name: "Closable (with dismiss button)",
  render: () => {
    const [tags, setTags] = React.useState(["React", "TypeScript", "Tailwind CSS", "Storybook"]);
    return (
      <TagGroup label="Closable tags" size="sm">
        <TagList className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag
              key={tag}
              id={tag}
              onClose={(id) => setTags((prev) => prev.filter((t) => t !== id))}
            >
              {tag}
            </Tag>
          ))}
        </TagList>
      </TagGroup>
    );
  },
};

export const SelectableMultiple: Story = {
  name: "Selectable (multiple)",
  render: () => (
    <TagGroup label="Select categories" size="sm" selectionMode="multiple">
      <TagList className="flex flex-wrap gap-2">
        <Tag id="design">Design</Tag>
        <Tag id="engineering">Engineering</Tag>
        <Tag id="product">Product</Tag>
        <Tag id="marketing">Marketing</Tag>
      </TagList>
    </TagGroup>
  ),
};

export const SelectableSingle: Story = {
  name: "Selectable (single)",
  render: () => (
    <TagGroup label="Select priority" size="sm" selectionMode="single">
      <TagList className="flex flex-wrap gap-2">
        <Tag id="low">Low</Tag>
        <Tag id="medium">Medium</Tag>
        <Tag id="high">High</Tag>
        <Tag id="critical">Critical</Tag>
      </TagList>
    </TagGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <TagGroup label="Disabled tags" size="sm">
      <TagList className="flex flex-wrap gap-2">
        <Tag id="active">Active</Tag>
        <Tag id="disabled" isDisabled>
          Disabled
        </Tag>
        <Tag id="also-active">Also Active</Tag>
      </TagList>
    </TagGroup>
  ),
};

// ── Rich combination stories ──────────────────────────────────────────────────

export const WithDotAndClose: Story = {
  name: "Icon (dot) + close",
  render: () => {
    const [tags, setTags] = React.useState([
      { id: "active", label: "Active" },
      { id: "online", label: "Online" },
      { id: "away", label: "Away" },
    ]);
    return (
      <TagGroup label="Status tags" size="md">
        <TagList className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <Tag
              key={t.id}
              id={t.id}
              dot
              onClose={(id) => setTags((prev) => prev.filter((x) => x.id !== id))}
            >
              {t.label}
            </Tag>
          ))}
        </TagList>
      </TagGroup>
    );
  },
};

export const WithAvatarAndClose: Story = {
  name: "Icon (avatar) + close",
  render: () => {
    const [users, setUsers] = React.useState([
      { id: "alice", label: "Alice", src: "https://i.pravatar.cc/48?img=1" },
      { id: "bob", label: "Bob", src: "https://i.pravatar.cc/48?img=2" },
      { id: "charlie", label: "Charlie", src: "" },
    ]);
    return (
      <TagGroup label="Assignees" size="md">
        <TagList className="flex flex-wrap gap-2">
          {users.map((u) => (
            <Tag
              key={u.id}
              id={u.id}
              avatarSrc={u.src || undefined}
              onClose={(id) => setUsers((prev) => prev.filter((x) => x.id !== id))}
            >
              {u.label}
            </Tag>
          ))}
        </TagList>
      </TagGroup>
    );
  },
};

export const WithCountAndClose: Story = {
  name: "Count badge + close",
  render: () => {
    const [filters, setFilters] = React.useState([
      { id: "open", label: "Open", count: 12 },
      { id: "review", label: "In Review", count: 5 },
      { id: "done", label: "Done", count: 84 },
    ]);
    return (
      <TagGroup label="Filters" size="md">
        <TagList className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <Tag
              key={f.id}
              id={f.id}
              count={f.count}
              onClose={(id) => setFilters((prev) => prev.filter((x) => x.id !== id))}
            >
              {f.label}
            </Tag>
          ))}
        </TagList>
      </TagGroup>
    );
  },
};

/**
 * Combining `selectionMode="multiple"` and `onClose` per tag.
 * The **checkbox dot** toggles selection; the **× button** removes the tag.
 * Notice the tag body cursor is `cursor-default` — only the two explicit
 * interactive areas (checkbox and ×) respond to clicks.
 */
export const SelectableAndClosable: Story = {
  name: "Checkbox + close (combined)",
  render: () => {
    const [tags, setTags] = React.useState([
      { id: "design", label: "Design" },
      { id: "engineering", label: "Engineering" },
      { id: "product", label: "Product" },
      { id: "marketing", label: "Marketing" },
    ]);
    return (
      <TagGroup label="Categories" size="md" selectionMode="multiple">
        <TagList className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <Tag
              key={t.id}
              id={t.id}
              onClose={(id) => setTags((prev) => prev.filter((x) => x.id !== id))}
            >
              {t.label}
            </Tag>
          ))}
        </TagList>
      </TagGroup>
    );
  },
};

export const SelectableWithAvatar: Story = {
  name: "Checkbox + avatar (combined)",
  render: () => (
    <TagGroup label="Assignees" size="md" selectionMode="multiple">
      <TagList className="flex flex-wrap gap-2">
        <Tag id="alice" avatarSrc="https://i.pravatar.cc/48?img=1">
          Alice
        </Tag>
        <Tag id="bob" avatarSrc="https://i.pravatar.cc/48?img=2">
          Bob
        </Tag>
        <Tag id="charlie">Charlie</Tag>
      </TagList>
    </TagGroup>
  ),
};

// ── AllVariants showcase ──────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: 560 }}>
      {/* ── Sizes ── */}
      <section>
        <p style={labelStyle}>sizes — sm / md / lg</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {(["sm", "md", "lg"] as const).map((size) => (
            <TagGroup key={size} label={`${size} tags`} size={size}>
              <TagList className="flex flex-wrap gap-2">
                <Tag id={`${size}-a`}>React</Tag>
                <Tag id={`${size}-b`}>TypeScript</Tag>
                <Tag id={`${size}-c`}>Tailwind</Tag>
              </TagList>
            </TagGroup>
          ))}
        </div>
      </section>

      {/* ── With count ── */}
      <section>
        <p style={labelStyle}>with count badge</p>
        <TagGroup label="Count tags" size="md">
          <TagList className="flex flex-wrap gap-2">
            <Tag id="open" count={12}>
              Open
            </Tag>
            <Tag id="review" count={5}>
              In Review
            </Tag>
            <Tag id="closed" count={84}>
              Closed
            </Tag>
          </TagList>
        </TagGroup>
      </section>

      {/* ── With dot ── */}
      <section>
        <p style={labelStyle}>icon — dot indicator</p>
        {(["sm", "md", "lg"] as const).map((size) => (
          <TagGroup key={size} label={`Dot ${size}`} size={size}>
            <TagList className="flex flex-wrap gap-2">
              <Tag id={`dot-${size}-active`} dot>
                Active
              </Tag>
              <Tag id={`dot-${size}-online`} dot>
                Online
              </Tag>
            </TagList>
          </TagGroup>
        ))}
      </section>

      {/* ── With avatar ── */}
      <section>
        <p style={labelStyle}>icon — avatar</p>
        {(["sm", "md", "lg"] as const).map((size) => (
          <TagGroup key={size} label={`Avatar ${size}`} size={size}>
            <TagList className="flex flex-wrap gap-2">
              <Tag id={`av-${size}-1`} avatarSrc="https://i.pravatar.cc/48?img=3">
                Alice
              </Tag>
              <Tag id={`av-${size}-2`}>No Src</Tag>
            </TagList>
          </TagGroup>
        ))}
      </section>

      {/* ── Dot + close ── */}
      <section>
        <p style={labelStyle}>icon (dot) + close button</p>
        <TagGroup label="Dot + close" size="md">
          <TagList className="flex flex-wrap gap-2">
            <Tag id="d1" dot onClose={() => {}}>
              Active
            </Tag>
            <Tag id="d2" dot onClose={() => {}}>
              Online
            </Tag>
            <Tag id="d3" dot onClose={() => {}}>
              Away
            </Tag>
          </TagList>
        </TagGroup>
      </section>

      {/* ── Avatar + close ── */}
      <section>
        <p style={labelStyle}>icon (avatar) + close button</p>
        <TagGroup label="Avatar + close" size="md">
          <TagList className="flex flex-wrap gap-2">
            <Tag id="u1" avatarSrc="https://i.pravatar.cc/48?img=5" onClose={() => {}}>
              Alice
            </Tag>
            <Tag id="u2" avatarSrc="https://i.pravatar.cc/48?img=6" onClose={() => {}}>
              Bob
            </Tag>
            <Tag id="u3" onClose={() => {}}>
              Charlie
            </Tag>
          </TagList>
        </TagGroup>
      </section>

      {/* ── Count + close ── */}
      <section>
        <p style={labelStyle}>count badge + close button</p>
        <TagGroup label="Count + close" size="md">
          <TagList className="flex flex-wrap gap-2">
            <Tag id="f1" count={12} onClose={() => {}}>
              Open
            </Tag>
            <Tag id="f2" count={5} onClose={() => {}}>
              In Review
            </Tag>
            <Tag id="f3" count={84} onClose={() => {}}>
              Done
            </Tag>
          </TagList>
        </TagGroup>
      </section>

      {/* ── Checkbox (single) ── */}
      <section>
        <p style={labelStyle}>checkbox — single selection</p>
        <TagGroup label="Single select" size="sm" selectionMode="single">
          <TagList className="flex flex-wrap gap-2">
            <Tag id="low">Low</Tag>
            <Tag id="medium">Medium</Tag>
            <Tag id="high">High</Tag>
            <Tag id="critical">Critical</Tag>
          </TagList>
        </TagGroup>
      </section>

      {/* ── Checkbox (multiple) ── */}
      <section>
        <p style={labelStyle}>checkbox — multiple selection</p>
        {(["sm", "md", "lg"] as const).map((size) => (
          <TagGroup key={size} label={`Multi ${size}`} size={size} selectionMode="multiple">
            <TagList className="flex flex-wrap gap-2">
              <Tag id={`m-${size}-1`}>Design</Tag>
              <Tag id={`m-${size}-2`}>Engineering</Tag>
              <Tag id={`m-${size}-3`}>Product</Tag>
            </TagList>
          </TagGroup>
        ))}
      </section>

      {/* ── Checkbox + close ── */}
      <section>
        <p style={labelStyle}>checkbox + close button (combined)</p>
        <TagGroup label="Checkbox + close" size="md" selectionMode="multiple">
          <TagList className="flex flex-wrap gap-2">
            <Tag id="c1" onClose={() => {}}>
              Design
            </Tag>
            <Tag id="c2" onClose={() => {}}>
              Engineering
            </Tag>
            <Tag id="c3" onClose={() => {}}>
              Product
            </Tag>
          </TagList>
        </TagGroup>
      </section>

      {/* ── Checkbox + avatar + close ── */}
      <section>
        <p style={labelStyle}>checkbox + avatar + close (all combined)</p>
        <TagGroup label="All combined" size="md" selectionMode="multiple">
          <TagList className="flex flex-wrap gap-2">
            <Tag id="a1" avatarSrc="https://i.pravatar.cc/48?img=7" onClose={() => {}}>
              Alice
            </Tag>
            <Tag id="a2" avatarSrc="https://i.pravatar.cc/48?img=8" onClose={() => {}}>
              Bob
            </Tag>
            <Tag id="a3" onClose={() => {}}>
              Charlie
            </Tag>
          </TagList>
        </TagGroup>
      </section>

      {/* ── Disabled ── */}
      <section>
        <p style={labelStyle}>disabled state</p>
        <TagGroup label="Disabled" size="md" selectionMode="multiple">
          <TagList className="flex flex-wrap gap-2">
            <Tag id="en1">Enabled</Tag>
            <Tag id="dis1" isDisabled>
              Disabled
            </Tag>
            <Tag id="en2">Enabled</Tag>
            <Tag id="dis2" isDisabled onClose={() => {}}>
              Disabled + close
            </Tag>
          </TagList>
        </TagGroup>
      </section>
    </div>
  ),
};

const labelStyle: React.CSSProperties = {
  marginBottom: "0.5rem",
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "#9CA3AF",
};
