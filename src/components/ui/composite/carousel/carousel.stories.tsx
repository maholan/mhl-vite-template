
import { Carousel } from "./carousel";

import type { Meta, StoryObj } from "@storybook/react";

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta = {
  title: "Composite/Carousel",
  component: Carousel.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Accessible, Embla-powered carousel. " +
          "Supports horizontal and vertical orientations, dot indicators, " +
          "prev/next navigation buttons, looping, and multi-slide layouts.",
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
} satisfies Meta<typeof Carousel.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Helpers ────────────────────────────────────────────────────────────────────

const SLIDES = [
  { id: 1, label: "Slide 1", bg: "bg-brand-100" },
  { id: 2, label: "Slide 2", bg: "bg-success-secondary" },
  { id: 3, label: "Slide 3", bg: "bg-warning-secondary" },
  { id: 4, label: "Slide 4", bg: "bg-error-secondary" },
  { id: 5, label: "Slide 5", bg: "bg-secondary" },
];

function SlideCard({ label, bg }: { label: string; bg: string }) {
  return (
    <div
      className={`flex h-48 w-full items-center justify-center rounded-xl text-base font-semibold text-primary ${bg}`}
    >
      {label}
    </div>
  );
}

// ── Stories ────────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <div className="w-[560px]">
      <Carousel.Root {...args}>
        <Carousel.Content>
          {SLIDES.map((s) => (
            <Carousel.Item key={s.id}>
              <SlideCard label={s.label} bg={s.bg} />
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.PrevButton />
        <Carousel.NextButton />
      </Carousel.Root>
    </div>
  ),
};

export const WithDots: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <div className="w-[560px]">
      <Carousel.Root {...args}>
        <Carousel.Content>
          {SLIDES.map((s) => (
            <Carousel.Item key={s.id}>
              <SlideCard label={s.label} bg={s.bg} />
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.PrevButton />
        <Carousel.NextButton />
        <Carousel.DotGroup className="mt-4 flex justify-center gap-2" />
      </Carousel.Root>
    </div>
  ),
};

export const Loop: Story = {
  args: { orientation: "horizontal", opts: { loop: true } },
  render: (args) => (
    <div className="w-[560px]">
      <Carousel.Root {...args}>
        <Carousel.Content>
          {SLIDES.map((s) => (
            <Carousel.Item key={s.id}>
              <SlideCard label={s.label} bg={s.bg} />
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.PrevButton />
        <Carousel.NextButton />
        <Carousel.DotGroup className="mt-4 flex justify-center gap-2" />
      </Carousel.Root>
    </div>
  ),
};

export const MultiSlide: Story = {
  name: "Multi-slide (3 per view)",
  args: { orientation: "horizontal", opts: { loop: true } },
  render: (args) => (
    <div className="w-[720px]">
      <Carousel.Root {...args}>
        <Carousel.Content>
          {SLIDES.map((s) => (
            <Carousel.Item key={s.id} className="basis-1/3">
              <SlideCard label={s.label} bg={s.bg} />
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.PrevButton />
        <Carousel.NextButton />
      </Carousel.Root>
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="h-80 w-[400px]">
      <Carousel.Root {...args}>
        <Carousel.Content className="h-80">
          {SLIDES.map((s) => (
            <Carousel.Item key={s.id}>
              <SlideCard label={s.label} bg={s.bg} />
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.PrevButton />
        <Carousel.NextButton />
        <Carousel.DotGroup className="absolute left-1/2 mt-2 flex -translate-x-1/2 gap-2" />
      </Carousel.Root>
    </div>
  ),
};

export const DotsOnly: Story = {
  name: "Dots only (no nav buttons)",
  args: { orientation: "horizontal", opts: { loop: true } },
  render: (args) => (
    <div className="w-[560px]">
      <Carousel.Root {...args}>
        <Carousel.Content>
          {SLIDES.map((s) => (
            <Carousel.Item key={s.id}>
              <SlideCard label={s.label} bg={s.bg} />
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.DotGroup className="mt-4 flex justify-center gap-2" />
      </Carousel.Root>
    </div>
  ),
};

export const CustomNavIcons: Story = {
  name: "Custom nav icons",
  args: { orientation: "horizontal", opts: { loop: true } },
  render: (args) => (
    <div className="w-[560px]">
      <Carousel.Root {...args}>
        <Carousel.Content>
          {SLIDES.map((s) => (
            <Carousel.Item key={s.id}>
              <SlideCard label={s.label} bg={s.bg} />
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <Carousel.PrevButton>‹</Carousel.PrevButton>
        <Carousel.NextButton>›</Carousel.NextButton>
        <Carousel.DotGroup className="mt-4 flex justify-center gap-2" />
      </Carousel.Root>
    </div>
  ),
};

export const AllStates: Story = {
  name: "All states",
  args: { children: undefined },
  render: () => (
    <div className="flex flex-col gap-12">
      {/* Horizontal with dots */}
      <div>
        <p className="mb-3 text-sm font-semibold text-secondary">Horizontal + dots</p>
        <div className="w-[480px]">
          <Carousel.Root>
            <Carousel.Content>
              {SLIDES.map((s) => (
                <Carousel.Item key={s.id}>
                  <SlideCard label={s.label} bg={s.bg} />
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.PrevButton />
            <Carousel.NextButton />
            <Carousel.DotGroup className="mt-4 flex justify-center gap-2" />
          </Carousel.Root>
        </div>
      </div>

      {/* Loop + multi-slide */}
      <div>
        <p className="mb-3 text-sm font-semibold text-secondary">Loop + 2 per view</p>
        <div className="w-[480px]">
          <Carousel.Root opts={{ loop: true }}>
            <Carousel.Content>
              {SLIDES.map((s) => (
                <Carousel.Item key={s.id} className="basis-1/2">
                  <SlideCard label={s.label} bg={s.bg} />
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.PrevButton />
            <Carousel.NextButton />
          </Carousel.Root>
        </div>
      </div>

      {/* Vertical */}
      <div>
        <p className="mb-3 text-sm font-semibold text-secondary">Vertical</p>
        <div className="relative h-64 w-[480px]">
          <Carousel.Root orientation="vertical">
            <Carousel.Content className="h-64">
              {SLIDES.map((s) => (
                <Carousel.Item key={s.id}>
                  <SlideCard label={s.label} bg={s.bg} />
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Carousel.PrevButton />
            <Carousel.NextButton />
          </Carousel.Root>
        </div>
      </div>
    </div>
  ),
};
