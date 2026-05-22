import React, { useState } from "react";

import { Pagination, type PaginationRootProps } from "./pagination-base";

import type { Meta, StoryObj } from "@storybook/react";

// ── Shared helpers ────────────────────────────────────────────────────────────

const storyTriggerClass =
  "rounded-lg px-3 py-2 text-sm font-medium bg-primary text-secondary shadow-xs ring-1 ring-primary ring-inset hover:bg-primary-hover disabled:opacity-50 disabled:pointer-events-none";

function PageList(): React.JSX.Element {
  return (
    <Pagination.Context>
      {({ pages }) => (
        <div style={{ display: "flex", gap: 4 }}>
          {pages.map((item, i) =>
            item.type === "page" ? (
              <Pagination.Page
                key={i}
                value={item.value}
                isCurrent={item.isCurrent}
                className={({ isCurrent }) =>
                  [
                    "flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-sm font-medium transition-colors",
                    isCurrent
                      ? "bg-brand-solid text-white"
                      : "bg-primary text-secondary hover:bg-primary-hover",
                  ].join(" ")
                }
              />
            ) : (
              <Pagination.Ellipsis
                key={i}
                className="flex h-9 w-9 items-center justify-center text-tertiary"
              />
            )
          )}
        </div>
      )}
    </Pagination.Context>
  );
}

function PaginationControls({
  initialPage,
  total,
  siblingCount,
}: {
  initialPage: number;
  total: number;
  siblingCount?: number;
}): React.JSX.Element {
  const [page, setPage] = useState(initialPage);
  return (
    <Pagination.Root page={page} total={total} siblingCount={siblingCount} onPageChange={setPage}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Pagination.PrevTrigger className={storyTriggerClass}>← Prev</Pagination.PrevTrigger>
        <PageList />
        <Pagination.NextTrigger className={storyTriggerClass}>Next →</Pagination.NextTrigger>
      </div>
    </Pagination.Root>
  );
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: "Composite/Pagination/Pagination.Root (Headless)",
  component: Pagination.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Headless pagination primitive. Manages page-range calculation and navigation state. " +
          "Bring your own styles via `className` props, or use the pre-built variants " +
          "(`PaginationPageDefault`, `PaginationCardDefault`, etc.) from `pagination/`.",
      },
    },
  },
  argTypes: {
    page: { control: { type: "number", min: 1 }, description: "Current page (1-based)." },
    total: { control: { type: "number", min: 1 }, description: "Total number of pages." },
    siblingCount: {
      control: { type: "number", min: 0, max: 3 },
      description: "Sibling pages shown on each side of the current page.",
      table: { defaultValue: { summary: "1" } },
    },
  },
} satisfies Meta<typeof Pagination.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Stories ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { page: 1, total: 10, children: "" },
  render: ({ page: initialPage = 1, total = 10, siblingCount }: Partial<PaginationRootProps>) => (
    <PaginationControls initialPage={initialPage} total={total} siblingCount={siblingCount} />
  ),
};

export const MiddlePage: Story = {
  args: { page: 5, total: 10, children: "" },
  render: ({ total = 10, siblingCount }: Partial<PaginationRootProps>) => (
    <PaginationControls initialPage={5} total={total} siblingCount={siblingCount} />
  ),
};

export const LastPage: Story = {
  args: { page: 10, total: 10, children: "" },
  render: ({ total = 10, siblingCount }: Partial<PaginationRootProps>) => (
    <PaginationControls initialPage={10} total={total} siblingCount={siblingCount} />
  ),
};

export const WideSiblingCount: Story = {
  name: "siblingCount = 2",
  args: { page: 10, total: 20, siblingCount: 2, children: "" },
  render: ({ total = 20, siblingCount = 2 }: Partial<PaginationRootProps>) => (
    <PaginationControls initialPage={10} total={total} siblingCount={siblingCount} />
  ),
};

export const SmallTotal: Story = {
  name: "Small total (5 pages)",
  args: { page: 3, total: 5, children: "" },
  render: ({ total = 5, siblingCount }: Partial<PaginationRootProps>) => (
    <PaginationControls initialPage={3} total={total} siblingCount={siblingCount} />
  ),
};

export const AllStates: Story = {
  name: "All states",
  args: { page: 1, total: 10, children: "" },
  render: () => {
    const scenarios: { label: string; page: number; total: number }[] = [
      { label: "First page (Prev disabled)", page: 1, total: 10 },
      { label: "Middle page (both enabled)", page: 5, total: 10 },
      { label: "Last page (Next disabled)", page: 10, total: 10 },
      { label: "Small total — no ellipsis", page: 3, total: 5 },
      { label: "Large total — both ellipses", page: 10, total: 30 },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 500 }}>
        {scenarios.map(({ label, page, total }) => (
          <div key={label}>
            <p style={{ fontSize: 12, marginBottom: 8, opacity: 0.6 }}>{label}</p>
            <Pagination.Root page={page} total={total}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Pagination.PrevTrigger className={storyTriggerClass}>
                  ← Prev
                </Pagination.PrevTrigger>
                <Pagination.Context>
                  {({ pages }) => (
                    <div style={{ display: "flex", gap: 4 }}>
                      {pages.map((item, i) =>
                        item.type === "page" ? (
                          <Pagination.Page
                            key={i}
                            value={item.value}
                            isCurrent={item.isCurrent}
                            className={({ isCurrent }) =>
                              [
                                "flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-sm font-medium transition-colors",
                                isCurrent
                                  ? "bg-brand-solid text-white"
                                  : "bg-primary text-secondary hover:bg-primary-hover",
                              ].join(" ")
                            }
                          />
                        ) : (
                          <Pagination.Ellipsis
                            key={i}
                            className="flex h-9 w-9 items-center justify-center text-tertiary"
                          />
                        )
                      )}
                    </div>
                  )}
                </Pagination.Context>
                <Pagination.NextTrigger className={storyTriggerClass}>
                  Next →
                </Pagination.NextTrigger>
              </div>
            </Pagination.Root>
          </div>
        ))}
      </div>
    );
  },
};
