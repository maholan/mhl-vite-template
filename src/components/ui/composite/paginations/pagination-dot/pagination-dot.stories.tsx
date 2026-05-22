import React, { useState } from "react";

import { PaginationDot } from "./pagination-dot";

import type { Meta, StoryObj } from "@storybook/react";

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: "Composite/Pagination/Dot",
  component: PaginationDot,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dot/line-style pagination indicator built on `Pagination.Root`. " +
          "Intended for carousels, slideshows, and image galleries. " +
          "Supports dot and line styles, two sizes, and an optional frosted-glass frame.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    style: {
      control: "select",
      options: ["Dot", "Line"],
      table: { defaultValue: { summary: "Dot" } },
    },
    framed: { control: "boolean", table: { defaultValue: { summary: "false" } } },
    page: { control: { type: "number", min: 1 } },
    total: { control: { type: "number", min: 1 } },
  },
} satisfies Meta<typeof PaginationDot>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Helper ────────────────────────────────────────────────────────────────────

function Controlled(props: Omit<React.ComponentProps<typeof PaginationDot>, "onPageChange">) {
  const [page, setPage] = useState(props.page ?? 1);
  return <PaginationDot {...props} page={page} onPageChange={setPage} />;
}

function OnImage({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-end justify-center rounded-xl p-6"
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", minWidth: 220 }}
    >
      {children}
    </div>
  );
}

// ── Stories ───────────────────────────────────────────────────────────────────

export const DotMd: Story = {
  name: "Dot — md",
  args: { page: 1, total: 4 },
  render: (args) => <Controlled {...args} />,
};

export const DotLg: Story = {
  name: "Dot — lg",
  args: { page: 1, total: 4, size: "lg" },
  render: (args) => <Controlled {...args} />,
};

export const DotMdFramed: Story = {
  name: "Dot — md, framed",
  args: { page: 1, total: 4, framed: true },
  render: (args) => (
    <OnImage>
      <Controlled {...args} />
    </OnImage>
  ),
};

export const DotLgFramed: Story = {
  name: "Dot — lg, framed",
  args: { page: 1, total: 4, size: "lg", framed: true },
  render: (args) => (
    <OnImage>
      <Controlled {...args} />
    </OnImage>
  ),
};

export const LineMd: Story = {
  name: "Line — md",
  args: { page: 1, total: 4, style: "Line" },
  render: (args) => <Controlled {...args} />,
};

export const LineLg: Story = {
  name: "Line — lg",
  args: { page: 1, total: 4, size: "lg", style: "Line" },
  render: (args) => <Controlled {...args} />,
};

export const LineMdFramed: Story = {
  name: "Line — md, framed",
  args: { page: 1, total: 4, style: "Line", framed: true },
  render: (args) => (
    <OnImage>
      <Controlled {...args} />
    </OnImage>
  ),
};

export const LineLgFramed: Story = {
  name: "Line — lg, framed",
  args: { page: 1, total: 4, size: "lg", style: "Line", framed: true },
  render: (args) => (
    <OnImage>
      <Controlled {...args} />
    </OnImage>
  ),
};

export const AllStates: Story = {
  name: "All states",
  args: { page: 1, total: 4 },
  render: () => {
    const sections: { label: string; framed?: boolean; element: React.ReactNode }[] = [
      { label: "Dot md", element: <PaginationDot page={1} total={4} /> },
      { label: "Dot lg", element: <PaginationDot page={1} total={4} size="lg" /> },
      {
        label: "Dot md — framed",
        framed: true,
        element: <PaginationDot page={1} total={4} framed />,
      },
      {
        label: "Dot lg — framed",
        framed: true,
        element: <PaginationDot page={1} total={4} size="lg" framed />,
      },
      { label: "Line md", element: <PaginationDot page={1} total={4} style="Line" /> },
      { label: "Line lg", element: <PaginationDot page={1} total={4} size="lg" style="Line" /> },
      {
        label: "Line md — framed",
        framed: true,
        element: <PaginationDot page={1} total={4} style="Line" framed />,
      },
      {
        label: "Line lg — framed",
        framed: true,
        element: <PaginationDot page={1} total={4} size="lg" style="Line" framed />,
      },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 260 }}>
        {sections.map(({ label, framed, element }) => (
          <div key={label}>
            <p style={{ fontSize: 12, marginBottom: 8, opacity: 0.55 }}>{label}</p>
            <div
              className={`flex items-center justify-center rounded-lg p-4 ${framed ? "" : "bg-secondary"}`}
              style={
                framed
                  ? { background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }
                  : undefined
              }
            >
              {element}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
