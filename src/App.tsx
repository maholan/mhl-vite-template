import { useState } from "react";
import { ThemeProvider, useTheme } from "@maholan/theme";
import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  Input,
  Modal,
  Select,
  Slider,
  Tabs,
  Toggle,
  Tooltip,
} from "@/components/ui";

// ---------------------------------------------------------------------------
// Icons (inline SVG — no extra icon library required)
// ---------------------------------------------------------------------------

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function StorybookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 200 200" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M155.088 21.554 158.943 0l32.031 3.411-4.585 179.996L76.666 200 73.349 178.9l81.739-7.256V21.554zM72.11 89.655l3.586-43.677 29.553 1.327-1.478 17.907 8.422-9.167 11.583 4.596-6.107 51.361c3.316 2.07 5.433 5.556 5.433 9.408 0 6.423-5.296 11.626-11.831 11.626-6.534 0-11.83-5.203-11.83-11.626 0-4.028 2.132-7.644 5.6-9.72L72.11 89.655zM0 187.542l46.07 12.442 3.112-148.08L0 54.455v133.087z"
      />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function ComponentIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Theme toggle
// Tooltip wraps the trigger as children — no .Trigger/.Content subcomponents.
// ---------------------------------------------------------------------------

function ThemeToggle() {
  const { mode, setMode } = useTheme();
  const isDark = mode === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Tooltip title={label} placement="bottom">
      <Button
        color="secondary"
        size="sm"
        iconLeading={isDark ? <SunIcon /> : <MoonIcon />}
        aria-label={label}
        onPress={() => { setMode(isDark ? "light" : "dark"); }}
      >
        {isDark ? "Light" : "Dark"}
      </Button>
    </Tooltip>
  );
}

// ---------------------------------------------------------------------------
// Feature card
// ---------------------------------------------------------------------------

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

function FeatureCard({ icon, title, description, badge }: FeatureCardProps) {
  return (
    <div className="bg-primary-50 border-primary rounded-xl border p-6 shadow-xs transition-shadow duration-200 hover:shadow-sm">
      <div className="bg-brand-50 border-brand-200 mb-4 inline-flex rounded-lg border p-2.5 text-brand-600">
        {icon}
      </div>
      <div className="mb-1 flex items-center gap-2">
        <h3 className="text-primary text-sm font-semibold">{title}</h3>
        {badge && (
          <Badge variant="soft" color="brand" size="sm">
            {badge}
          </Badge>
        )}
      </div>
      <p className="text-tertiary text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Storybook card
// ---------------------------------------------------------------------------

function StorybookCard() {
  const storybookUrl = import.meta.env.VITE_STORYBOOK_URL ?? "http://localhost:6006";

  return (
    <div className="bg-primary-50 border-primary group rounded-xl border p-6 shadow-xs transition-shadow duration-200 hover:shadow-sm">
      <div className="mb-4 inline-flex rounded-lg border border-[#FF4785]/20 bg-[#FF4785]/10 p-2.5 text-[#FF4785]">
        <StorybookIcon />
      </div>
      <div className="mb-1 flex items-center gap-2">
        <h3 className="text-primary text-sm font-semibold">Storybook</h3>
        <Badge variant="soft" color="brand" size="sm">
          v8
        </Badge>
      </div>
      <p className="text-tertiary mb-4 text-sm leading-relaxed">
        All 40+ components documented with live controls, dark mode, and accessibility checks.
      </p>
      <Button
        color="secondary"
        size="sm"
        iconTrailing={<ArrowRightIcon />}
        onPress={() => { window.open(storybookUrl, "_blank"); }}
      >
        Open Storybook
      </Button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Contact form demo
// ---------------------------------------------------------------------------

const SUBJECT_ITEMS = [
  { id: "general", label: "General inquiry" },
  { id: "support", label: "Technical support" },
  { id: "billing", label: "Billing" },
  { id: "other", label: "Other" },
];

function ContactFormDemo() {
  const [submitted, setSubmitted] = useState(false);

  return submitted ? (
    <div className="bg-success-50 border-success-200 rounded-xl border p-8 text-center">
      <div className="text-success-700 mb-2 text-2xl">✓</div>
      <p className="text-success-700 font-medium">Message sent successfully!</p>
      <Button
        color="tertiary"
        size="sm"
        className="mt-4"
        onPress={() => { setSubmitted(false); }}
      >
        Send another
      </Button>
    </div>
  ) : (
    <div className="bg-primary-alt border-primary space-y-4 rounded-xl border p-6 shadow-xs">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="First name" placeholder="Alex" autoComplete="given-name" />
        <Input label="Last name" placeholder="Johnson" autoComplete="family-name" />
      </div>
      <Input
        label="Email address"
        placeholder="alex@example.com"
        type="email"
        autoComplete="email"
        isRequired
      />
      <Select
        label="Subject"
        placeholder="Select a topic…"
        items={SUBJECT_ITEMS}
      >
        {(item) => <Select.Item key={item.id} id={item.id} label={item.label} />}
      </Select>
      <Input label="Message" placeholder="Tell us more…" isRequired />
      <div className="flex items-center justify-between pt-1">
        <Checkbox>I agree to the privacy policy</Checkbox>
        <Button
          color="primary"
          iconTrailing={<ArrowRightIcon />}
          onPress={() => { setSubmitted(true); }}
        >
          Send message
        </Button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Modal demo
// Modal is ModalRoot directly — use isOpen/onOpenChange for controlled mode.
// Modal.Header takes title + description as props, not children.
// ---------------------------------------------------------------------------

function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button color="secondary" onPress={() => { setOpen(true); }}>
        Open modal
      </Button>
      <Modal isOpen={open} onOpenChange={setOpen}>
        <Modal.Header
          title="Confirm action"
          description="Are you sure you want to proceed? This action cannot be undone."
        />
        <Modal.Footer>
          <Button color="tertiary" onPress={() => { setOpen(false); }}>
            Cancel
          </Button>
          <Button color="primary-destructive" onPress={() => { setOpen(false); }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// ---------------------------------------------------------------------------
// Slider demo
// ---------------------------------------------------------------------------

function SliderDemo() {
  const [value, setValue] = useState(40);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-secondary text-sm font-medium">Budget allocation</span>
        <Badge variant="soft" color="brand" size="sm">
          {value}%
        </Badge>
      </div>
      <Slider
        value={value}
        onChange={(v) => { setValue(Array.isArray(v) ? v[0] : v); }}
        minValue={0}
        maxValue={100}
        step={5}
        aria-label="Budget allocation"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main app content
// Tabs uses .Root, .List, .Item, .Panel — NOT .Tab
// ---------------------------------------------------------------------------

function AppContent() {
  return (
    <div className="bg-primary text-primary min-h-screen font-sans antialiased">
      {/* Skip link */}
      <a
        href="#main-content"
        className="bg-brand-solid focus-visible:ring-brand-500 sr-only z-50 rounded-lg px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus-visible:ring-2"
      >
        Skip to content
      </a>

      {/* ------------------------------------------------------------------ */}
      {/* Header                                                              */}
      {/* ------------------------------------------------------------------ */}
      <header className="border-primary sticky top-0 z-40 border-b backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8" aria-hidden="true">
              <rect width="32" height="32" rx="8" fill="#6938EF" />
              <path d="M8 22L16 10L24 22H8Z" fill="white" fillOpacity="0.9" />
            </svg>
            <span className="text-md text-primary font-semibold">MHL UI</span>
            <Badge variant="soft" color="brand" size="sm">
              v1.4.0
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              color="tertiary"
              size="sm"
              iconLeading={<StorybookIcon />}
              onPress={() => {
                window.open(
                  import.meta.env.VITE_STORYBOOK_URL ?? "http://localhost:6006",
                  "_blank"
                );
              }}
            >
              Storybook
            </Button>
            <Button
              color="tertiary"
              size="sm"
              iconLeading={<GithubIcon />}
              onPress={() => {
                window.open("https://github.com/maholan/mhl-untitledui-platform", "_blank");
              }}
            >
              GitHub
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* ---------------------------------------------------------------- */}
        {/* Hero                                                              */}
        {/* ---------------------------------------------------------------- */}
        <section className="border-primary border-b">
          <div className="mx-auto max-w-6xl px-6 py-20 text-center">
            <Badge variant="soft" color="brand" size="md" className="mb-6 inline-flex">
              Vite React components
            </Badge>
            <h1 className="text-display-lg text-primary mx-auto mb-4 max-w-3xl font-semibold tracking-tight">
              Build faster with{" "}
              <span className="text-brand-600">MHL UI</span>
            </h1>
            <p className="text-tertiary mx-auto mb-8 max-w-2xl text-xl leading-relaxed">
              Accessible, themeable components built on React Aria and Tailwind CSS v4. Dark mode
              out of the box. Start building in seconds.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button color="primary" size="lg" iconTrailing={<ArrowRightIcon />}>
                Get started
              </Button>
              <Button color="secondary" size="lg" iconLeading={<GithubIcon />}>
                View on GitHub
              </Button>
            </div>
            {/* Avatar stack — social proof */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="flex -space-x-2">
                {(["AB", "CD", "EF", "GH"] as const).map((initials) => (
                  <Avatar key={initials} size="sm" initials={initials} alt={initials} />
                ))}
              </div>
              <p className="text-secondary text-sm">
                Trusted by <span className="text-primary font-semibold">500+</span> developers
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Features                                                          */}
        {/* ---------------------------------------------------------------- */}
        <section className="border-primary border-b">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-10 text-center">
              <h2 className="text-display-xs text-primary mb-2 font-semibold">
                Everything you need
              </h2>
              <p className="text-tertiary">A complete design system ready for production.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <FeatureCard
                icon={<ZapIcon />}
                title="Lightning fast"
                description="Vite 6 + Tailwind CSS v4 for instant HMR and optimized production builds."
                badge="Vite 6"
              />
              <FeatureCard
                icon={<ShieldIcon />}
                title="Accessible"
                description="Every interactive component is built on React Aria — WCAG 2.1 AA compliant out of the box."
              />
              <FeatureCard
                icon={<PaletteIcon />}
                title="Themeable"
                description="4-tier design token system. Switch brand colors, gray scale, and dark mode at runtime."
              />
              <FeatureCard
                icon={<ComponentIcon />}
                title="40+ components"
                description="Buttons, inputs, modals, tables, date pickers, and more — all typed and production-ready."
                badge="New"
              />
              <StorybookCard />
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Interactive showcase                                              */}
        {/* ---------------------------------------------------------------- */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8 text-center">
            <h2 className="text-display-xs text-primary mb-2 font-semibold">
              Interactive showcase
            </h2>
            <p className="text-tertiary">
              Explore components live. Every interaction is accessible by keyboard and screen
              reader.
            </p>
          </div>

          {/* Tabs.Root wraps everything. Tabs.List + Tabs.Item for the tab bar. */}
          <Tabs.Root defaultSelectedKey="components" aria-label="Component showcase">
            <div className="flex justify-center">
              <Tabs.List>
                <Tabs.Item id="components">Components</Tabs.Item>
                <Tabs.Item id="form">Form</Tabs.Item>
                <Tabs.Item id="theme">Theme</Tabs.Item>
              </Tabs.List>
            </div>

            {/* Components tab */}
            <Tabs.Panel id="components">
              <div className="mt-6 space-y-10">
                {/* Buttons */}
                <div className="space-y-3">
                  <h3 className="text-secondary text-xs font-semibold uppercase tracking-wider">
                    Buttons
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button color="primary">Primary</Button>
                    <Button color="secondary">Secondary</Button>
                    <Button color="tertiary">Tertiary</Button>
                    <Button color="primary-destructive">Destructive</Button>
                    <Button color="link-gray">Link</Button>
                    <Button color="primary" isDisabled>
                      Disabled
                    </Button>
                  </div>
                  <ButtonGroup>
                    <Button color="secondary" size="sm">
                      Day
                    </Button>
                    <Button color="secondary" size="sm">
                      Week
                    </Button>
                    <Button color="secondary" size="sm">
                      Month
                    </Button>
                    <Button color="secondary" size="sm">
                      Year
                    </Button>
                  </ButtonGroup>
                </div>

                {/* Badges */}
                <div className="space-y-3">
                  <h3 className="text-secondary text-xs font-semibold uppercase tracking-wider">
                    Badges
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(["brand", "gray", "error", "warning", "success"] as const).map((color) => (
                      <Badge key={color} variant="soft" color={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(["brand", "gray", "error", "warning", "success"] as const).map((color) => (
                      <Badge key={color} variant="outline" color={color}>
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Avatars */}
                <div className="space-y-3">
                  <h3 className="text-secondary text-xs font-semibold uppercase tracking-wider">
                    Avatars
                  </h3>
                  <div className="flex flex-wrap items-end gap-3">
                    {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
                      <div key={size} className="flex flex-col items-center gap-1.5">
                        <Avatar size={size} initials="JD" alt="John Doe" />
                        <span className="text-tertiary text-xs">{size}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Toggle + Checkbox */}
                <div className="space-y-3">
                  <h3 className="text-secondary text-xs font-semibold uppercase tracking-wider">
                    Controls
                  </h3>
                  <div className="flex flex-wrap items-center gap-6">
                    <Toggle aria-label="Notifications">
                      <span className="text-secondary text-sm">Email notifications</span>
                    </Toggle>
                    <Toggle defaultSelected aria-label="Marketing">
                      <span className="text-secondary text-sm">Marketing emails</span>
                    </Toggle>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Checkbox defaultSelected>Accept terms</Checkbox>
                    <Checkbox>Subscribe to newsletter</Checkbox>
                    <Checkbox isDisabled>Disabled option</Checkbox>
                  </div>
                </div>

                {/* Slider */}
                <div className="space-y-3">
                  <h3 className="text-secondary text-xs font-semibold uppercase tracking-wider">
                    Slider
                  </h3>
                  <div className="max-w-sm">
                    <SliderDemo />
                  </div>
                </div>

                {/* Modal */}
                <div className="space-y-3">
                  <h3 className="text-secondary text-xs font-semibold uppercase tracking-wider">
                    Modal
                  </h3>
                  <ModalDemo />
                </div>
              </div>
            </Tabs.Panel>

            {/* Form tab */}
            <Tabs.Panel id="form">
              <div className="mx-auto mt-6 max-w-xl">
                <h3 className="text-primary mb-1 font-semibold">Contact us</h3>
                <p className="text-tertiary mb-5 text-sm">
                  All fields validate on submit. Try submitting empty required fields.
                </p>
                <ContactFormDemo />
              </div>
            </Tabs.Panel>

            {/* Theme tab */}
            <Tabs.Panel id="theme">
              <div className="mt-6 space-y-8">
                <div className="space-y-3">
                  <h3 className="text-secondary text-xs font-semibold uppercase tracking-wider">
                    Semantic token colors
                  </h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                    {[
                      { label: "bg-primary", cls: "bg-primary border-primary border" },
                      { label: "bg-secondary", cls: "bg-secondary" },
                      { label: "bg-brand-solid", cls: "bg-brand-solid" },
                      { label: "bg-error-solid", cls: "bg-error-solid" },
                      { label: "bg-success-solid", cls: "bg-success-solid" },
                      { label: "bg-warning-solid", cls: "bg-warning-solid" },
                    ].map(({ label, cls }) => (
                      <div key={label} className="space-y-1.5">
                        <div className={`h-10 rounded-lg ${cls}`} />
                        <p className="text-tertiary font-mono text-xs">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-secondary text-xs font-semibold uppercase tracking-wider">
                    Typography scale
                  </h3>
                  <div className="space-y-2">
                    {[
                      { cls: "text-display-lg", label: "display-lg", text: "Display Large" },
                      { cls: "text-display-md", label: "display-md", text: "Display Medium" },
                      { cls: "text-display-sm", label: "display-sm", text: "Display Small" },
                      { cls: "text-xl", label: "xl", text: "Text XL" },
                      { cls: "text-lg", label: "lg", text: "Text Large" },
                      { cls: "text-md", label: "md", text: "Text Medium (MHL)" },
                      { cls: "text-sm", label: "sm", text: "Text Small" },
                    ].map(({ cls, label, text }) => (
                      <div key={label} className="flex items-baseline gap-4">
                        <span className="text-tertiary w-24 shrink-0 font-mono text-xs">
                          {label}
                        </span>
                        <span className={`text-primary font-medium ${cls}`}>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-secondary text-xs font-semibold uppercase tracking-wider">
                    Shadow scale
                  </h3>
                  <div className="flex flex-wrap items-end gap-4">
                    {(["shadow-xs", "shadow-sm", "shadow-md", "shadow-lg"] as const).map(
                      (shadow) => (
                        <div key={shadow} className="space-y-2 text-center">
                          <div
                            className={`bg-primary-alt border-primary h-16 w-16 rounded-xl border ${shadow}`}
                          />
                          <p className="text-tertiary font-mono text-xs">{shadow}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </Tabs.Panel>
          </Tabs.Root>
        </section>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* Footer                                                              */}
      {/* ------------------------------------------------------------------ */}
      <footer className="border-primary border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <rect width="24" height="24" rx="6" fill="#6938EF" />
              <path d="M6 16.5L12 7.5L18 16.5H6Z" fill="white" fillOpacity="0.9" />
            </svg>
            <span className="text-secondary text-sm font-medium">MHL UI</span>
          </div>
          <p className="text-tertiary text-sm">
            &copy; {new Date().getFullYear()} Maholan. Released under the MIT License.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/maholan/mhl-untitledui-platform"
              className="text-tertiary hover:text-primary text-sm transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://maholan.co.th"
              className="text-tertiary hover:text-primary text-sm transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Maholan
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

function App() {
  return (
    <ThemeProvider defaultMode="light" storageKey="mhl-theme-mode" disableTransitionOnChange>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
