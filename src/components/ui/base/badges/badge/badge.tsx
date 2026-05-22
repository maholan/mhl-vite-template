"use client";

import React, { type MouseEventHandler, type ReactNode } from "react";

import { cn } from "@/libs/utils";

import {
  BADGE_DISMISS_COLOR_MODERN,
  BADGE_DISMISS_COLOR_SOLID,
  BADGE_DISMISS_COLORS_LIGHT,
  BADGE_DOT_COLORS_LIGHT,
  BADGE_ICON_COLORS_LIGHT,
  BADGE_OUTLINE_COLORS,
  BADGE_SOFT_COLORS,
  BADGE_SOLID_COLORS,
  badgeIconOnlyVariants,
  badgeVariants,
} from "./badge.variants";

import type { BadgeColor, BadgeShape, BadgeSize, BadgeVariant } from "./badge.type";

// ── Internal helpers ──────────────────────────────────────────────────────────

function getRootColorClass(variant: BadgeVariant, color: BadgeColor): string {
  if (variant === "soft") return BADGE_SOFT_COLORS[color];
  if (variant === "outline") return BADGE_OUTLINE_COLORS[color];
  if (variant === "solid") return BADGE_SOLID_COLORS[color];
  return "";
}

function getAddonColorClass(variant: BadgeVariant, color: BadgeColor): string {
  if (variant === "solid") return "text-white/70";
  if (variant === "modern") return "text-quaternary";
  return BADGE_ICON_COLORS_LIGHT[color];
}

function getDismissColorClass(variant: BadgeVariant, color: BadgeColor): string {
  if (variant === "solid") return BADGE_DISMISS_COLOR_SOLID;
  if (variant === "modern") return BADGE_DISMISS_COLOR_MODERN;
  return BADGE_DISMISS_COLORS_LIGHT[color];
}

// ── X close icon (internal) ───────────────────────────────────────────────────

function XIcon(): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

// ── Shared base props ─────────────────────────────────────────────────────────

interface BadgeBaseProps {
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  shape?: BadgeShape;
  className?: string;
}

// ── Badge ─────────────────────────────────────────────────────────────────────

export interface BadgeProps extends BadgeBaseProps {
  children: ReactNode;
}

/**
 * Simple text badge with 4 visual styles, 13 colour palettes, 3 sizes, and 2 shapes.
 *
 * @example
 * ```tsx
 * <Badge color="brand" variant="soft">New feature</Badge>
 * <Badge color="error" variant="solid" shape="badge">Critical</Badge>
 * ```
 */
export function Badge({
  variant = "soft",
  color = "gray",
  size = "md",
  shape = "pill",
  className,
  children,
}: BadgeProps): React.JSX.Element {
  return (
    <span
      className={cn(
        badgeVariants({ variant, size, shape }),
        getRootColorClass(variant, color),
        className
      )}
    >
      {children}
    </span>
  );
}

Badge.displayName = "Badge";

// ── BadgeWithDot ──────────────────────────────────────────────────────────────

export interface BadgeWithDotProps extends BadgeBaseProps {
  children: ReactNode;
}

/**
 * Badge with a leading status dot. Dot colour matches the badge colour and variant.
 *
 * @example
 * ```tsx
 * <BadgeWithDot color="success">Active</BadgeWithDot>
 * ```
 */
export function BadgeWithDot({
  variant = "soft",
  color = "gray",
  size = "md",
  shape = "pill",
  className,
  children,
}: BadgeWithDotProps): React.JSX.Element {
  const dotColor =
    variant === "solid"
      ? "bg-white/80"
      : variant === "modern"
        ? "bg-fg-quaternary"
        : BADGE_DOT_COLORS_LIGHT[color];

  return (
    <span
      className={cn(
        badgeVariants({ variant, size, shape }),
        size === "sm" ? "pl-1.5" : size === "lg" ? "pl-2.5" : "pl-2",
        getRootColorClass(variant, color),
        className
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 shrink-0 rounded-full", dotColor)} />
      {children}
    </span>
  );
}

BadgeWithDot.displayName = "BadgeWithDot";

// ── BadgeWithIcon ─────────────────────────────────────────────────────────────

export interface BadgeWithIconProps extends BadgeBaseProps {
  children: ReactNode;
  /**
   * Icon rendered before the label. Accepts any React node.
   * Recommended size: `size-3` with `stroke-[3px]`.
   */
  leadingIcon?: ReactNode;
  /**
   * Icon rendered after the label. Accepts any React node.
   * Recommended size: `size-3` with `stroke-[3px]`.
   */
  trailingIcon?: ReactNode;
}

/**
 * Badge with optional leading and/or trailing icon slots.
 *
 * @example
 * ```tsx
 * <BadgeWithIcon color="brand" leadingIcon={<StarIcon className="size-3 stroke-[3px]" />}>
 *   Featured
 * </BadgeWithIcon>
 * ```
 */
export function BadgeWithIcon({
  variant = "soft",
  color = "gray",
  size = "md",
  shape = "pill",
  leadingIcon,
  trailingIcon,
  className,
  children,
}: BadgeWithIconProps): React.JSX.Element {
  const addonClass = getAddonColorClass(variant, color);

  return (
    <span
      className={cn(
        badgeVariants({ variant, size, shape }),
        leadingIcon ? (size === "sm" ? "pl-1.5" : size === "lg" ? "pl-2.5" : "pl-2") : undefined,
        trailingIcon ? (size === "sm" ? "pr-1.5" : size === "lg" ? "pr-2.5" : "pr-2") : undefined,
        getRootColorClass(variant, color),
        className
      )}
    >
      {leadingIcon !== undefined && (
        <span aria-hidden="true" className={cn("shrink-0", addonClass)}>
          {leadingIcon}
        </span>
      )}
      {children}
      {trailingIcon !== undefined && (
        <span aria-hidden="true" className={cn("shrink-0", addonClass)}>
          {trailingIcon}
        </span>
      )}
    </span>
  );
}

BadgeWithIcon.displayName = "BadgeWithIcon";

// ── BadgeWithButton ───────────────────────────────────────────────────────────

export interface BadgeWithButtonProps extends BadgeBaseProps {
  children: ReactNode;
  /**
   * Accessible label for the dismiss button. Required for screen readers.
   * @example "Remove New feature tag"
   */
  buttonLabel: string;
  /** Click handler for the dismiss button. */
  onDismiss?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * Dismissible badge with a close button.
 *
 * @example
 * ```tsx
 * <BadgeWithButton color="brand" buttonLabel="Remove tag" onDismiss={handleDismiss}>
 *   New feature
 * </BadgeWithButton>
 * ```
 */
export function BadgeWithButton({
  variant = "soft",
  color = "gray",
  size = "md",
  shape = "pill",
  buttonLabel,
  onDismiss,
  className,
  children,
}: BadgeWithButtonProps): React.JSX.Element {
  const dismissClass = getDismissColorClass(variant, color);
  const btnShape = shape === "pill" ? "rounded-full" : "rounded-[3px]";

  return (
    <span
      className={cn(
        badgeVariants({ variant, size, shape }),
        size === "sm" ? "pr-0.5" : size === "lg" ? "pr-1.5" : "pr-1",
        getRootColorClass(variant, color),
        className
      )}
    >
      {children}
      <button
        type="button"
        aria-label={buttonLabel}
        onClick={onDismiss}
        className={cn(
          "flex cursor-pointer items-center justify-center p-0.5",
          "transition duration-100 ease-linear",
          "outline-none focus-visible:outline-2 focus-visible:outline-offset-1",
          btnShape,
          dismissClass
        )}
      >
        <XIcon />
      </button>
    </span>
  );
}

BadgeWithButton.displayName = "BadgeWithButton";

// ── BadgeIcon ─────────────────────────────────────────────────────────────────

export interface BadgeIconProps extends BadgeBaseProps {
  /**
   * The icon to display. Accepts any React node.
   * Recommended size: `size-3` with `stroke-[3px]`.
   */
  icon: ReactNode;
  /** Accessible label describing the badge icon. Required for screen readers. */
  "aria-label": string;
}

/**
 * Icon-only badge. Always requires an `aria-label` for accessibility.
 *
 * @example
 * ```tsx
 * <BadgeIcon color="success" icon={<CheckIcon className="size-3" />} aria-label="Verified" />
 * ```
 */
export function BadgeIcon({
  variant = "soft",
  color = "gray",
  size = "md",
  shape = "pill",
  icon,
  className,
  "aria-label": ariaLabel,
}: BadgeIconProps): React.JSX.Element {
  return (
    <span
      role="img"
      aria-label={ariaLabel}
      className={cn(
        badgeIconOnlyVariants({ variant, size, shape }),
        getRootColorClass(variant, color),
        className
      )}
    >
      <span aria-hidden="true">{icon}</span>
    </span>
  );
}

BadgeIcon.displayName = "BadgeIcon";
