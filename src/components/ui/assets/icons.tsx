// ── General-purpose UI icons ──────────────────────────────────────────────────
// Minimal SVG icon components used internally by MHL UI components.
// Each icon follows the Lucide/Heroicons stroke style:
//   - viewBox="0 0 24 24"
//   - stroke="currentColor", fill="none"
//   - strokeWidth and strokeLinecap/strokeLinejoin via props (default 2 / round)
//
// Size is controlled entirely by the consumer via className (e.g. `size-4`).
// All icons are purely decorative by default — add `aria-label` when meaningful.

import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

// ── ArrowLeft ─────────────────────────────────────────────────────────────────

/**
 * Left-pointing arrow icon (←). Used as Previous page button in pagination.
 * Recommended: `size-4`.
 */
export function ArrowLeft({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

// ── ArrowRight ────────────────────────────────────────────────────────────────

/**
 * Right-pointing arrow icon (→).
 * Default size: inherit from parent. Recommended: `size-4` (leading) or `size-3 stroke-[3px]` (trailing addon).
 *
 * @example
 * ```tsx
 * import { ArrowRight } from "@maholan/ui";
 *
 * <BadgeGroup addonText="Read more" iconTrailing={<ArrowRight className="size-3 stroke-[3px]" />}>
 *   New feature
 * </BadgeGroup>
 * ```
 */
export function ArrowRight({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

// ── ChevronRight ──────────────────────────────────────────────────────────────

/**
 * Right-pointing chevron (›). Lighter visual weight than `ArrowRight`.
 * Recommended: `size-4`.
 */
export function ChevronRight({
  className,
  strokeWidth = 2,
  ...props
}: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// ── ChevronLeft ───────────────────────────────────────────────────────────────

/**
 * Left-pointing chevron (‹). Used as Previous page button in compact pagination.
 * Recommended: `size-4`.
 */
export function ChevronLeft({
  className,
  strokeWidth = 2,
  ...props
}: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

// ── ChevronLeftDouble ──────────────────────────────────────────────────────────

/**
 * Double left chevron (««). Used as First page button in advanced pagination.
 * Recommended: `size-4`.
 */
export function ChevronLeftDouble({
  className,
  strokeWidth = 2,
  ...props
}: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="m11 17-5-5 5-5" />
      <path d="m18 17-5-5 5-5" />
    </svg>
  );
}

// ── ChevronRightDouble ─────────────────────────────────────────────────────────

/**
 * Double right chevron (»»). Used as Last page button in advanced pagination.
 * Recommended: `size-4`.
 */
export function ChevronRightDouble({
  className,
  strokeWidth = 2,
  ...props
}: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="m6 17 5-5-5-5" />
      <path d="m13 17 5-5-5-5" />
    </svg>
  );
}

// ── XClose ────────────────────────────────────────────────────────────────────

/**
 * X / close / remove icon. Used inside tag dismiss buttons.
 * Recommended: `size-2.5 stroke-[3.6px]` (sm), `size-3 stroke-[2.86px]` (md), `size-3.5 stroke-3` (lg).
 */
export function XClose({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

// ── User01 ────────────────────────────────────────────────────────────────────

/**
 * User / person icon. Used as avatar placeholder when no image is available.
 * Recommended: `size-3 stroke-[2.25px]`.
 */
export function User01({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// ── SearchLg ──────────────────────────────────────────────────────────────────

/**
 * Magnifying glass / search icon.
 * Recommended: `size-4 stroke-[2.25px]` (sm), `size-5` (md/lg).
 */
export function SearchLg({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle cx={11} cy={11} r={8} />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

// ── ChevronDown ───────────────────────────────────────────────────────────────

/**
 * Downward-pointing chevron. Used in select triggers and dropdowns.
 * Recommended: `size-4 stroke-[2.25px]` (sm/md), `size-5` (lg).
 */
export function ChevronDown({
  className,
  strokeWidth = 2,
  ...props
}: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

// ── Check ─────────────────────────────────────────────────────────────────────

/**
 * Checkmark icon. Used as selection indicator in list items.
 * Recommended: `size-4 stroke-[2.25px]` (sm), `size-5` (md/lg).
 */
export function Check({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// ── HelpCircle ────────────────────────────────────────────────────────────────

/**
 * Help / question-mark circle icon. Used in tooltip triggers and hint slots.
 * Recommended: `size-4`.
 */
export function HelpCircle({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

// ── InfoCircle ────────────────────────────────────────────────────────────────

/**
 * Info / information circle icon. Used as error / invalid state indicator.
 * Recommended: `size-4`.
 */
export function InfoCircle({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

// ── ChevronUp ─────────────────────────────────────────────────────────────────

/**
 * Upward-pointing chevron. Used in number field increment buttons.
 * Recommended: `size-3 stroke-3` (sm/md), `size-3.5 stroke-[2.57px]` (lg).
 */
export function ChevronUp({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

// ── Minus ─────────────────────────────────────────────────────────────────────

/**
 * Minus / subtract icon. Used in horizontal number field decrement button.
 * Recommended: `size-4`.
 */
export function Minus({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M5 12h14" />
    </svg>
  );
}

// ── Plus ──────────────────────────────────────────────────────────────────────

/**
 * Plus / add icon. Used in horizontal number field increment button.
 * Recommended: `size-4`.
 */
export function Plus({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

// ── UploadCloud ───────────────────────────────────────────────────────────────

/**
 * Cloud upload icon. Used as the default icon in file input drop zones.
 * Recommended: `size-5`.
 */
export function UploadCloud({
  className,
  strokeWidth = 2,
  ...props
}: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  );
}

// ── DotsVertical ─────────────────────────────────────────────────────────────

/**
 * Three vertical dots / kebab menu icon. Used as the trigger for overflow / context menus.
 * Recommended: `size-5`.
 */
export function DotsVertical({
  className,
  strokeWidth = 2,
  ...props
}: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle cx="12" cy="5" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  );
}

// ── Dot ──────────────────────────────────────────────────────────────────────

/**
 * Small filled circle. Used as a status / colour indicator inside tags.
 * Color is controlled via `text-*` className (`fill="currentColor"`).
 * Size scales with the `size` prop: `sm` = 6 px, `md` = 8 px, `lg` = 10 px.
 *
 * @example
 * ```tsx
 * <Dot size="sm" className="text-icon-success-secondary" />
 * ```
 */
interface DotProps extends React.SVGProps<SVGSVGElement> {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const dotSizeClass: Record<NonNullable<DotProps["size"]>, string> = {
  sm: "size-1.5",
  md: "size-2",
  lg: "size-2.5",
};

export function Dot({ size = "sm", className, ...props }: DotProps): React.JSX.Element {
  const sizeClass = dotSizeClass[size];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 8 8"
      fill="currentColor"
      aria-hidden="true"
      className={[sizeClass, "shrink-0", className].filter(Boolean).join(" ")}
      {...props}
    >
      <circle cx="4" cy="4" r="4" />
    </svg>
  );
}

// ── Settings01 ────────────────────────────────────────────────────────────────

export function Settings01({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

// ── Zap ──────────────────────────────────────────────────────────────────────

export function Zap({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

// ── HomeLine ──────────────────────────────────────────────────────────────────

export function HomeLine({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

// ── Users01 ───────────────────────────────────────────────────────────────────

export function Users01({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// ── UserPlus01 ────────────────────────────────────────────────────────────────

export function UserPlus01({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  );
}

// ── LayersTwo01 ───────────────────────────────────────────────────────────────

export function LayersTwo01({
  className,
  strokeWidth = 2,
  ...props
}: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  );
}

// ── MessageSmileCircle ────────────────────────────────────────────────────────

export function MessageSmileCircle({
  className,
  strokeWidth = 2,
  ...props
}: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h.01" />
      <path d="M12 10h.01" />
      <path d="M16 10h.01" />
    </svg>
  );
}

// ── LogOut01 ──────────────────────────────────────────────────────────────────

export function LogOut01({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

// ── Keyboard01 ────────────────────────────────────────────────────────────────

export function Keyboard01({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" />
    </svg>
  );
}

// ── DotsHorizontal ────────────────────────────────────────────────────────────

/**
 * Three horizontal dots / meatball menu icon. Used as overflow ellipsis in breadcrumbs.
 * Recommended: `size-5`.
 */
export function DotsHorizontal({ className, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle cx="4" cy="10" r="1.5" />
      <circle cx="10" cy="10" r="1.5" />
      <circle cx="16" cy="10" r="1.5" />
    </svg>
  );
}

// ── SlashDivider ──────────────────────────────────────────────────────────────

/**
 * Diagonal slash icon. Used as a breadcrumb path separator.
 * Recommended: `size-5`.
 */
export function SlashDivider({
  className,
  strokeWidth = 1.5,
  ...props
}: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M13 3L7 17" />
    </svg>
  );
}

// ── ArrowDown ─────────────────────────────────────────────────────────────────

/**
 * Downward arrow icon. Used as sort-descending indicator in table column headers.
 * Recommended: `size-3 stroke-[3px]`.
 */
export function ArrowDown({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

// ── ChevronSelectorVertical ───────────────────────────────────────────────────

/**
 * Dual chevron (up+down) icon. Used as unsorted column sort indicator in tables.
 * Recommended: `size-3 stroke-[3px]`.
 */
export function ChevronSelectorVertical({
  className,
  strokeWidth = 2,
  ...props
}: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  );
}

// ── Copy01 ────────────────────────────────────────────────────────────────────

/**
 * Copy / duplicate icon. Used in row action dropdowns.
 * Recommended: `size-4`.
 */
export function Copy01({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

// ── Edit01 ────────────────────────────────────────────────────────────────────

/**
 * Edit / pencil icon. Used in row action dropdowns.
 * Recommended: `size-4`.
 */
export function Edit01({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

// ── Trash01 ───────────────────────────────────────────────────────────────────

/**
 * Trash / delete icon. Used in row action dropdowns.
 * Recommended: `size-4`.
 */
export function Trash01({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

// ── Building05 ────────────────────────────────────────────────────────────────

export function Building05({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}

// ── Calendar ──────────────────────────────────────────────────────────────────

/**
 * Calendar icon — used as leading icon in date input fields.
 * Recommended: `size-4` or `size-5`.
 */
export function Calendar({ className, strokeWidth = 2, ...props }: IconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}
