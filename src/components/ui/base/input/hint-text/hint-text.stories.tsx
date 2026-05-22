
import { HintText } from "./hint-text";

import type { Meta, StoryObj } from "@storybook/react";

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta = {
  title: "Base/Inputs/HintText",
  component: HintText,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Accessible hint / helper text for form fields, built on React Aria's `Text` primitive.",
          "",
          'Renders as `slot="description"` (always visible) by default, or `slot="errorMessage"`',
          "(visible only when the parent field is in an invalid state) when `isInvalid` is set.",
          "",
          "**Automatic state handling** — no extra props needed when used inside a React Aria `Field`:",
          "- Parent `data-invalid` → text turns `text-error-primary`",
          "- Parent `data-disabled` → text dims to `text-disable-subtle`",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    isInvalid: {
      control: "boolean",
      description:
        'When `true`, sets `slot="errorMessage"` and applies error color. ' +
        'When `false` (default), sets `slot="description"`.',
      table: { defaultValue: { summary: "false" } },
    },
    elementType: {
      control: "text",
      description:
        'Override the rendered HTML element. Accepts native tag strings only (`"span"`, `"div"`, etc.).',
      table: { defaultValue: { summary: "p" } },
    },
    children: { control: "text" },
    className: { control: "text" },
  },
} satisfies Meta<typeof HintText>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── States ────────────────────────────────────────────────────────────────────

/** Default description — always visible, uses `text-tertiary`. */
export const Description: Story = {
  args: { children: "Use at least 8 characters including a number." },
};

/** Error message — uses `text-error-primary`. Set `isInvalid` on the field or directly on this component. */
export const ErrorMessage: Story = {
  name: "Error message",
  args: { isInvalid: true, children: "Password is required." },
};

// ── elementType override ──────────────────────────────────────────────────────

/** Rendered as `<span>` instead of the default `<p>` — useful for inline layout. */
export const AsSpan: Story = {
  name: "elementType=span",
  args: { children: "Inline hint text.", elementType: "span" },
};

// ── className override ────────────────────────────────────────────────────────

/** Consumer `className` is merged via `cn()` — token styles are preserved. */
export const WithClassName: Story = {
  name: "Custom className",
  args: { children: "Enter your work email.", className: "mt-1 italic" },
};

// ── Showcase ──────────────────────────────────────────────────────────────────

/** All states side by side. */
export const AllStates: Story = {
  name: "All states",
  // args.children is required by the HintTextProps type contract.
  // The render function handles all content; this value is never displayed.
  args: { children: "" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", minWidth: 360 }}>
      <section>
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 8,
            opacity: 0.5,
          }}
        >
          Description (default)
        </p>
        <HintText>Use at least 8 characters including a number.</HintText>
      </section>

      <section>
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 8,
            opacity: 0.5,
          }}
        >
          Error message (isInvalid)
        </p>
        <HintText isInvalid>Password is required.</HintText>
      </section>

      <section>
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 8,
            opacity: 0.5,
          }}
        >
          Simulated parent-invalid state
        </p>
        {/* data-invalid on the wrapper simulates what React Aria writes on a Field root */}
        <div className="group" data-invalid="true">
          <HintText>This is a description hint — but the field is invalid.</HintText>
        </div>
      </section>

      <section>
        <p
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 8,
            opacity: 0.5,
          }}
        >
          Simulated parent-disabled state
        </p>
        {/* data-disabled on the wrapper simulates what React Aria writes on a Field root */}
        <div className="group" data-disabled="true">
          <HintText>This field is disabled.</HintText>
        </div>
      </section>
    </div>
  ),
};
