import React, { useState } from "react";

import {
  PaginationButtonGroup,
  PaginationCardAdvanced,
  PaginationCardDefault,
  PaginationCardMinimal,
  PaginationPageDefault,
  PaginationPageMinimalCenter,
} from "./pagination";

import type { Meta, StoryObj } from "@storybook/react";

// ── Helpers ───────────────────────────────────────────────────────────────────

function Controlled({
  Component,
  initialPage = 5,
  total = 20,
  ...rest
}: {
  Component: React.FC<{ page: number; total: number; onPageChange: (p: number) => void }>;
  initialPage?: number;
  total?: number;
  [key: string]: unknown;
}): React.JSX.Element {
  const [page, setPage] = useState(initialPage);
  return <Component {...rest} page={page} total={total} onPageChange={setPage} />;
}

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof PaginationPageDefault> = {
  title: "Composite/Pagination/Variants",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pre-built, styled pagination variants built on top of `Pagination.Root` (headless). " +
          "Pick the variant that matches your layout; all accept `page`, `total`, and `onPageChange`.",
      },
    },
  },
  // Use PaginationPageDefault as the primary component for arg inference
  component: PaginationPageDefault,
} satisfies Meta<typeof PaginationPageDefault>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Stories ───────────────────────────────────────────────────────────────────

export const PageDefault: Story = {
  name: "Page Default",
  args: {},
  render: () => <Controlled Component={PaginationPageDefault} />,
};

export const PageDefaultRounded: Story = {
  name: "Page Default (rounded)",
  args: {},
  render: () => <Controlled Component={PaginationPageDefault} rounded />,
};

export const PageMinimalCenter: Story = {
  name: "Page Minimal Center",
  args: {},
  render: () => <Controlled Component={PaginationPageMinimalCenter} />,
};

export const CardDefault: Story = {
  name: "Card Default",
  args: {},
  render: () => <Controlled Component={PaginationCardDefault} />,
};

export const CardMinimal: Story = {
  name: "Card Minimal",
  args: {},
  render: () => {
    const [page, setPage] = useState(5);
    const [pageSize, setPageSize] = useState(10);
    return (
      <PaginationCardMinimal
        page={page}
        total={20}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    );
  },
};

export const CardMinimalCenter: Story = {
  name: "Card Minimal (center)",
  args: {},
  render: () => {
    const [page, setPage] = useState(5);
    const [pageSize, setPageSize] = useState(10);
    return (
      <PaginationCardMinimal
        align="center"
        page={page}
        total={20}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    );
  },
};

export const ButtonGroupLeft: Story = {
  name: "Button Group (left)",
  args: {},
  render: () => {
    const [page, setPage] = useState(5);
    return <PaginationButtonGroup page={page} total={20} align="left" onPageChange={setPage} />;
  },
};

export const ButtonGroupCenter: Story = {
  name: "Button Group (center)",
  args: {},
  render: () => {
    const [page, setPage] = useState(5);
    return <PaginationButtonGroup page={page} total={20} align="center" onPageChange={setPage} />;
  },
};

export const CardAdvanced: Story = {
  name: "Card Advanced",
  args: {},
  render: () => {
    const [page, setPage] = useState(5);
    const [pageSize, setPageSize] = useState(10);
    return (
      <PaginationCardAdvanced
        page={page}
        total={20}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    );
  },
};

export const AllStates: Story = {
  name: "All states",
  args: {},
  render: () => {
    const sections: { label: string; element: React.ReactNode }[] = [
      {
        label: "PaginationPageDefault",
        element: <PaginationPageDefault page={5} total={20} />,
      },
      {
        label: "PaginationPageDefault — first page",
        element: <PaginationPageDefault page={1} total={20} />,
      },
      {
        label: "PaginationPageDefault — last page",
        element: <PaginationPageDefault page={20} total={20} />,
      },
      {
        label: "PaginationPageDefault — rounded",
        element: <PaginationPageDefault page={5} total={20} rounded />,
      },
      {
        label: "PaginationPageMinimalCenter",
        element: <PaginationPageMinimalCenter page={5} total={20} />,
      },
      {
        label: "PaginationCardDefault",
        element: <PaginationCardDefault page={5} total={20} />,
      },
      {
        label: "PaginationCardMinimal",
        element: <PaginationCardMinimal page={5} total={20} pageSize={10} />,
      },
      {
        label: "PaginationButtonGroup — left",
        element: <PaginationButtonGroup page={5} total={20} align="left" />,
      },
      {
        label: "PaginationButtonGroup — center",
        element: <PaginationButtonGroup page={5} total={20} align="center" />,
      },
      {
        label: "PaginationCardAdvanced",
        element: <PaginationCardAdvanced page={5} total={20} pageSize={10} />,
      },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 32, minWidth: 640 }}>
        {sections.map(({ label, element }) => (
          <div key={label}>
            <p style={{ fontSize: 12, marginBottom: 8, opacity: 0.55 }}>{label}</p>
            {element}
          </div>
        ))}
      </div>
    );
  },
};
