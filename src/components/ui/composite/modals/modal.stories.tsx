import React, { useState } from "react";

import { Button } from "@/components/ui/base/buttons/button";

import { Modal, ModalRoot } from "./modal";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Composite/Modals/Modal",
  component: ModalRoot,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible modal dialog built on React Aria `Dialog` + `Modal` primitives. " +
          "Handles focus trapping, ARIA labelling, scroll locking, and enter/exit animations.\n\n" +
          "**Compound API:** `Modal.Trigger`, `Modal.Root`, `Modal.Header`, `Modal.Body`, " +
          "`Modal.Footer`, and `Modal.Dialog` (escape hatch for custom layouts).\n\n" +
          '**`slot="close"`** on any child element automatically closes the modal via ' +
          "React Aria's DialogTrigger close slot — no `onPress` plumbing required.\n\n" +
          'Supports `placement="drawer-right"` / `"drawer-left"` for side drawers and ' +
          '`scrollBehavior="outside"` for modals with long content that should scroll the page.',
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "full"],
      table: { defaultValue: { summary: "md" } },
    },
    placement: {
      control: "select",
      options: ["center", "top", "bottom", "drawer-right", "drawer-left"],
      table: { defaultValue: { summary: "center" } },
    },
    scrollBehavior: {
      control: "select",
      options: ["inside", "outside"],
      table: { defaultValue: { summary: "inside" } },
    },
  },
} satisfies Meta<typeof ModalRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Placeholder body text so we don't repeat it across every story. */
function BodyText(): React.JSX.Element {
  return (
    <p className="text-sm leading-relaxed text-tertiary">
      This action cannot be undone. All data associated with this account will be permanently
      removed from our servers.
    </p>
  );
}

// ── Core stories ──────────────────────────────────────────────────────────────

/** Default — centered, md size, header + body + footer. */
export const Default: Story = {
  name: "Default",
  args: { size: "md", placement: "center", children: null },
  render: (args) => (
    <Modal.Trigger>
      <Button color="primary">Open modal</Button>
      <Modal.Root {...args}>
        <Modal.Header title="Confirm action" description="Review the details before proceeding." />
        <Modal.Body>
          <BodyText />
        </Modal.Body>
        <Modal.Footer>
          <Button slot="close" color="secondary">
            Cancel
          </Button>
          <Button color="primary">Confirm</Button>
        </Modal.Footer>
      </Modal.Root>
    </Modal.Trigger>
  ),
};

/** Destructive — error icon + primary-destructive action button. */
export const Destructive: Story = {
  name: "Destructive",
  args: { size: "sm", children: null },
  render: (args) => (
    <Modal.Trigger>
      <Button color="primary-destructive">Delete account</Button>
      <Modal.Root {...args}>
        <Modal.Header
          title="Delete account"
          description="This will permanently delete your account and all data."
          iconSlot={
            <div className="flex size-10 items-center justify-center rounded-full bg-error-secondary ring-8 ring-error-primary/10">
              <svg
                aria-hidden="true"
                className="size-5 text-error-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                />
              </svg>
            </div>
          }
        />
        <Modal.Body>
          <BodyText />
        </Modal.Body>
        <Modal.Footer align="space-between">
          <Button slot="close" color="secondary">
            Cancel
          </Button>
          <Button color="primary-destructive">Delete account</Button>
        </Modal.Footer>
      </Modal.Root>
    </Modal.Trigger>
  ),
};

/** No footer — informational modal, close via the header × button. */
export const NoFooter: Story = {
  name: "No footer",
  args: { size: "md", children: null },
  render: (args) => (
    <Modal.Trigger>
      <Button color="secondary">View info</Button>
      <Modal.Root {...args}>
        <Modal.Header title="About this feature" description="Learn how this feature works." />
        <Modal.Body>
          <p className="text-sm leading-relaxed text-tertiary">
            This is a read-only dialog used to surface contextual information. Close it via the ×
            button in the header. No footer action row is needed.
          </p>
        </Modal.Body>
      </Modal.Root>
    </Modal.Trigger>
  ),
};

// ── Size stories ─────────────────────────────────────────────────────────────

export const SizeXs: Story = {
  name: "Size: xs",
  args: { size: "xs", children: null },
  render: (args) => (
    <Modal.Trigger>
      <Button color="secondary">xs</Button>
      <Modal.Root {...args}>
        <Modal.Header title="Extra small modal" />
        <Modal.Body>
          <BodyText />
        </Modal.Body>
        <Modal.Footer>
          <Button slot="close" color="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal.Root>
    </Modal.Trigger>
  ),
};

export const SizeLg: Story = {
  name: "Size: lg",
  args: { size: "lg", children: null },
  render: (args) => (
    <Modal.Trigger>
      <Button color="secondary">lg</Button>
      <Modal.Root {...args}>
        <Modal.Header
          title="Large modal"
          description="More horizontal real estate for complex content."
        />
        <Modal.Body>
          <BodyText />
        </Modal.Body>
        <Modal.Footer>
          <Button slot="close" color="secondary">
            Cancel
          </Button>
          <Button color="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Root>
    </Modal.Trigger>
  ),
};

export const SizeXl: Story = {
  name: "Size: xl",
  args: { size: "xl", children: null },
  render: (args) => (
    <Modal.Trigger>
      <Button color="secondary">xl</Button>
      <Modal.Root {...args}>
        <Modal.Header
          title="Extra large modal"
          description="For data-heavy contexts like a settings panel."
        />
        <Modal.Body>
          <BodyText />
        </Modal.Body>
        <Modal.Footer>
          <Button slot="close" color="secondary">
            Cancel
          </Button>
          <Button color="primary">Apply</Button>
        </Modal.Footer>
      </Modal.Root>
    </Modal.Trigger>
  ),
};

// ── Placement stories ─────────────────────────────────────────────────────────

export const PlacementTop: Story = {
  name: "Placement: top",
  args: { size: "md", placement: "top", children: null },
  render: (args) => (
    <Modal.Trigger>
      <Button color="secondary">Top</Button>
      <Modal.Root {...args}>
        <Modal.Header title="Top placement" />
        <Modal.Body>
          <BodyText />
        </Modal.Body>
        <Modal.Footer>
          <Button slot="close" color="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal.Root>
    </Modal.Trigger>
  ),
};

export const PlacementBottom: Story = {
  name: "Placement: bottom",
  args: { size: "md", placement: "bottom", children: null },
  render: (args) => (
    <Modal.Trigger>
      <Button color="secondary">Bottom sheet</Button>
      <Modal.Root {...args}>
        <Modal.Header title="Bottom sheet" description="Slides up from the bottom on mobile." />
        <Modal.Body>
          <BodyText />
        </Modal.Body>
        <Modal.Footer>
          <Button slot="close" color="secondary">
            Dismiss
          </Button>
        </Modal.Footer>
      </Modal.Root>
    </Modal.Trigger>
  ),
};

export const DrawerRight: Story = {
  name: "Drawer: right",
  args: { placement: "drawer-right", size: "sm", children: null },
  render: (args) => (
    <Modal.Trigger>
      <Button color="secondary">Open right drawer</Button>
      <Modal.Root {...args}>
        <Modal.Header title="Filters" description="Narrow down results." />
        <Modal.Body>
          <p className="text-sm text-tertiary">Filter controls go here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button slot="close" color="secondary">
            Reset
          </Button>
          <Button color="primary">Apply filters</Button>
        </Modal.Footer>
      </Modal.Root>
    </Modal.Trigger>
  ),
};

export const DrawerLeft: Story = {
  name: "Drawer: left",
  args: { placement: "drawer-left", size: "sm", children: null },
  render: (args) => (
    <Modal.Trigger>
      <Button color="secondary">Open left drawer</Button>
      <Modal.Root {...args}>
        <Modal.Header title="Navigation" />
        <Modal.Body>
          <p className="text-sm text-tertiary">Navigation items go here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button slot="close" color="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal.Root>
    </Modal.Trigger>
  ),
};

// ── Scroll behaviour ──────────────────────────────────────────────────────────

export const ScrollInside: Story = {
  name: "Scroll: inside",
  args: { size: "sm", scrollBehavior: "inside", children: null },
  render: (args) => (
    <Modal.Trigger>
      <Button color="secondary">Scroll inside</Button>
      <Modal.Root {...args}>
        <Modal.Header title="Terms of service" description="Please read carefully." />
        <Modal.Body>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className="mb-4 text-sm text-tertiary">
              Section {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button slot="close" color="secondary">
            Decline
          </Button>
          <Button color="primary">Accept</Button>
        </Modal.Footer>
      </Modal.Root>
    </Modal.Trigger>
  ),
};

// ── No padding body (full-bleed) ──────────────────────────────────────────────

export const NoPaddingBody: Story = {
  name: "Body: no padding (full-bleed)",
  args: { size: "lg", children: null },
  render: (args) => (
    <Modal.Trigger>
      <Button color="secondary">Full-bleed content</Button>
      <Modal.Root {...args}>
        <Modal.Header title="Data table" description="No inner padding for full-bleed tables." />
        <Modal.Body noPadding>
          <div className="divide-y divide-primary">
            {["Alpha", "Beta", "Gamma", "Delta"].map((row) => (
              <div key={row} className="flex items-center justify-between px-6 py-3 text-sm">
                <span className="text-primary">{row}</span>
                <span className="text-tertiary">—</span>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button slot="close" color="secondary">
            Close
          </Button>
        </Modal.Footer>
      </Modal.Root>
    </Modal.Trigger>
  ),
};

// ── Controlled mode ───────────────────────────────────────────────────────────

function ControlledDemo(): React.JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-tertiary">
        Open:{" "}
        <strong className={open ? "text-brand-secondary" : "text-tertiary"}>
          {open ? "true" : "false"}
        </strong>
      </p>
      <Button color="primary" onPress={() => setOpen(true)}>
        Open controlled modal
      </Button>
      <Modal.Root isOpen={open} onOpenChange={setOpen} size="md">
        <Modal.Header title="Controlled modal" description="State is managed by the parent." />
        <Modal.Body>
          <p className="text-sm text-tertiary">
            The <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs">isOpen</code>{" "}
            and{" "}
            <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs">onOpenChange</code>{" "}
            props are wired to a <code className="font-mono text-xs">useState</code> call in the
            parent component.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button slot="close" color="secondary">
            Cancel
          </Button>
          <Button color="primary" onPress={() => setOpen(false)}>
            Save &amp; close
          </Button>
        </Modal.Footer>
      </Modal.Root>
    </div>
  );
}

export const Controlled: Story = {
  name: "Controlled (isOpen + onOpenChange)",
  args: { children: null },
  render: () => <ControlledDemo />,
};

// ── Footer alignment ──────────────────────────────────────────────────────────

export const FooterAlignLeft: Story = {
  name: "Footer: align left",
  args: { size: "md", children: null },
  render: (args) => (
    <Modal.Trigger>
      <Button color="secondary">Footer left</Button>
      <Modal.Root {...args}>
        <Modal.Header title="Left-aligned footer" />
        <Modal.Body>
          <BodyText />
        </Modal.Body>
        <Modal.Footer align="left">
          <Button slot="close" color="secondary">
            Cancel
          </Button>
          <Button color="primary">Confirm</Button>
        </Modal.Footer>
      </Modal.Root>
    </Modal.Trigger>
  ),
};

// ── Custom layout (escape hatch) ──────────────────────────────────────────────

export const CustomLayout: Story = {
  name: "Custom layout (Modal.Dialog escape hatch)",
  args: { size: "md", children: null },
  render: (args) => (
    <Modal.Trigger>
      <Button color="secondary">Custom layout</Button>
      <Modal.Root {...args}>
        <Modal.Dialog>
          {({ close }) => (
            <div className="flex flex-col gap-6 p-6">
              <p className="text-sm font-semibold text-primary">
                Full control via <code className="font-mono">Modal.Dialog</code>
              </p>
              <p className="text-sm text-tertiary">
                Use this escape hatch when you need total layout control — wizard steps, custom
                forms, or non-standard panel structures.
              </p>
              <Button color="primary" onPress={close}>
                Close
              </Button>
            </div>
          )}
        </Modal.Dialog>
      </Modal.Root>
    </Modal.Trigger>
  ),
};

// ── All states showcase ───────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  args: { children: null },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      {/* Default */}
      <Modal.Trigger>
        <Button color="secondary" size="sm">
          Default
        </Button>
        <Modal.Root size="md">
          <Modal.Header title="Default modal" description="Standard centered dialog." />
          <Modal.Body>
            <BodyText />
          </Modal.Body>
          <Modal.Footer>
            <Button slot="close" color="secondary" size="sm">
              Cancel
            </Button>
            <Button color="primary" size="sm">
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Root>
      </Modal.Trigger>

      {/* Destructive */}
      <Modal.Trigger>
        <Button color="primary-destructive" size="sm">
          Destructive
        </Button>
        <Modal.Root size="sm">
          <Modal.Header
            title="Delete item"
            description="This action is permanent."
            iconSlot={
              <div className="flex size-9 items-center justify-center rounded-full bg-error-secondary">
                <svg
                  aria-hidden="true"
                  className="size-4 text-error-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0H7m3-3h4"
                  />
                </svg>
              </div>
            }
          />
          <Modal.Body>
            <BodyText />
          </Modal.Body>
          <Modal.Footer align="space-between">
            <Button slot="close" color="secondary" size="sm">
              Cancel
            </Button>
            <Button color="primary-destructive" size="sm">
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Root>
      </Modal.Trigger>

      {/* Drawer */}
      <Modal.Trigger>
        <Button color="secondary" size="sm">
          Drawer
        </Button>
        <Modal.Root placement="drawer-right" size="sm">
          <Modal.Header title="Side drawer" description="Slides from the right." />
          <Modal.Body>
            <p className="text-sm text-tertiary">Drawer content goes here.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button slot="close" color="secondary" size="sm">
              Close
            </Button>
          </Modal.Footer>
        </Modal.Root>
      </Modal.Trigger>

      {/* No footer */}
      <Modal.Trigger>
        <Button color="secondary" size="sm">
          No footer
        </Button>
        <Modal.Root size="sm">
          <Modal.Header title="Info" description="No footer needed." />
          <Modal.Body>
            <BodyText />
          </Modal.Body>
        </Modal.Root>
      </Modal.Trigger>
    </div>
  ),
};
