import { parseDate, today, getLocalTimeZone } from "@internationalized/date";
import { useState } from "react";

import { Calendar } from "./calendar";

import type { Meta, StoryObj } from "@storybook/react";
import type { DateValue } from "react-aria-components";

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Calendar> = {
  title: "Composite/Calendar/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: [
          "Accessible single-date calendar built on React Aria's `Calendar` primitive.",
          "",
          "Composes `CalendarCell` for each day, a month-navigation header, and an optional",
          "date-input + Today shortcut row. Accepts `highlightedDates` to render event dots.",
          "Wrap with `CalendarContextProvider` when embedding inside a larger composition",
          "that manages its own date state.",
        ].join("\n"),
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    isDisabled: { control: "boolean" },
    isReadOnly: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ── Individual stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: {},
};

export const WithValue: Story = {
  name: "With initial value",
  args: {
    value: parseDate("2025-06-15"),
  },
};

export const WithHighlightedDates: Story = {
  name: "With highlighted dates (event dots)",
  args: {
    value: parseDate("2025-06-01"),
    highlightedDates: [
      parseDate("2025-06-03"),
      parseDate("2025-06-10"),
      parseDate("2025-06-18"),
      parseDate("2025-06-25"),
    ],
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    value: parseDate("2025-06-15"),
  },
};

export const ReadOnly: Story = {
  name: "Read only",
  args: {
    isReadOnly: true,
    value: parseDate("2025-06-15"),
  },
};

export const WithMinMax: Story = {
  name: "With min / max constraints",
  args: {
    minValue: parseDate("2025-06-05"),
    maxValue: parseDate("2025-06-25"),
    value: parseDate("2025-06-15"),
  },
};

export const NoShortcutRow: Story = {
  name: "No shortcut row (children=null)",
  args: {
    children: null,
  },
};

export const Controlled: Story = {
  name: "Controlled",
  args: { children: "" },
  render: () => {
    const [value, setValue] = useState<DateValue | null>(parseDate("2025-06-01"));
    return (
      <div className="flex flex-col gap-4">
        <Calendar value={value} onChange={setValue} />
        <p className="text-sm text-tertiary">
          Selected: <span className="font-medium text-primary">{value?.toString() ?? "—"}</span>
        </p>
      </div>
    );
  },
};

// ── AllStates showcase ────────────────────────────────────────────────────────

export const AllStates: Story = {
  name: "All states",
  args: { children: "" },
  render: () => {
    const todayDate = today(getLocalTimeZone());
    return (
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Default</p>
          <Calendar />
        </section>

        <section className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">
            With selected date
          </p>
          <Calendar value={parseDate("2025-06-15")} />
        </section>

        <section className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">
            With event dots
          </p>
          <Calendar
            value={todayDate}
            highlightedDates={[
              todayDate,
              todayDate.add({ days: 3 }),
              todayDate.add({ days: 7 }),
              todayDate.add({ days: 14 }),
            ]}
          />
        </section>

        <section className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">
            Min / max constraints
          </p>
          <Calendar
            minValue={todayDate}
            maxValue={todayDate.add({ days: 20 })}
            value={todayDate.add({ days: 5 })}
          />
        </section>

        <section className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Disabled</p>
          <Calendar isDisabled value={parseDate("2025-06-15")} />
        </section>

        <section className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">Read only</p>
          <Calendar isReadOnly value={parseDate("2025-06-15")} />
        </section>

        <section className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-tertiary">
            No shortcut row
          </p>
          <Calendar value={parseDate("2025-06-15")}>{null}</Calendar>
        </section>
      </div>
    );
  },
};
