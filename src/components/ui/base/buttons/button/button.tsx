"use client";

import React, {
  isValidElement,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
  type ReactNode,
} from "react";
import {
  type ButtonProps as AriaButtonProps,
  type LinkProps as AriaLinkProps,
  Button as AriaButton,
  Link as AriaLink,
} from "react-aria-components";

import { cn } from "@/libs/utils";

import {
  buttonVariants,
  iconBaseClass,
  type ButtonSize,
  type ButtonColor,
} from "./button.variants";

// ── Internal helper ───────────────────────────────────────────────────────────
// Distinguishes a React function component (accepts className prop) from a
// plain ReactNode. Avoids a dependency on a not-yet-created utils file.
function isReactComponent(value: unknown): value is FC<{ className?: string }> {
  return typeof value === "function";
}

// ── Prop types ────────────────────────────────────────────────────────────────

/** Props shared by both the button and link (anchor) variants. */
export interface CommonProps {
  // ── React Aria press events ────────────────────────────────────────────────
  // These are forwarded to AriaButton / AriaLink and enable React Aria's
  // normalised cross-platform event model (pointer + keyboard + touch).
  onPress?: AriaButtonProps["onPress"];
  onPressStart?: AriaButtonProps["onPressStart"];
  onPressEnd?: AriaButtonProps["onPressEnd"];
  onPressChange?: AriaButtonProps["onPressChange"];
  onPressUp?: AriaButtonProps["onPressUp"];

  /** Disables the button and applies a reduced-opacity disabled style. */
  isDisabled?: boolean;
  /**
   * Shows a spinning loader and disables the button.
   * The loader replaces the leading icon slot.
   */
  isLoading?: boolean;
  /** Height / padding scale following the Untitled UI 4 px base grid. */
  size?: ButtonSize;
  /** Visual color variant mapping to the Untitled UI button color system. */
  color?: ButtonColor;
  /**
   * Icon rendered before the label.
   * Accepts either a React function component or any React node — not locked
   * to one icon library.
   * @example iconLeading={PlusIcon}      // FC — receives className automatically
   * @example iconLeading={<PlusIcon />}  // ReactNode — rendered as-is
   */
  iconLeading?: FC<{ className?: string }> | ReactNode;
  /**
   * Icon rendered after the label.
   * Accepts either a React function component or any React node.
   * @example iconTrailing={ArrowRightIcon}
   */
  iconTrailing?: FC<{ className?: string }> | ReactNode;
  /** Removes horizontal padding on the inner text span. Set automatically for link variants. */
  noTextPadding?: boolean;
  /** When true, keeps the label visible beside the loading spinner instead of hiding it. */
  showTextWhileLoading?: boolean;
}

/** Props for the `<button>` variant. */
export interface ButtonProps
  extends
    CommonProps,
    DetailedHTMLProps<
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "slot">,
      HTMLButtonElement
    > {
  /** React Aria slot name — used when composing inside compound components. */
  slot?: AriaButtonProps["slot"];
}

/** Props for the `<a>` (link) variant — activated when `href` is provided. */
export interface LinkButtonProps
  extends
    CommonProps,
    DetailedHTMLProps<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">, HTMLAnchorElement> {
  /** React Aria router integration options. */
  routerOptions?: AriaLinkProps["routerOptions"];
}

/** Union of button and link props — the public prop type for `<Button>`. */
export type Props = ButtonProps | LinkButtonProps;

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Accessible button component built on React Aria, rebuilt from the Untitled UI
 * design system with MHL design tokens and enhanced interactive states.
 *
 * Supports 8 color variants, 5 sizes (sm → 2xl), library-agnostic icon slots
 * (pass an FC or any ReactNode), loading state, and href-based link rendering.
 * `"use client"` is handled internally — safe to import in Next.js Server Components.
 *
 * @example
 * ```tsx
 * // Button
 * <Button color="primary" size="md">Get started</Button>
 *
 * // With icon — pass as FC (receives className) or ReactNode
 * <Button color="primary" iconLeading={PlusIcon}>Add item</Button>
 * <Button color="secondary" iconLeading={<PlusIcon className="size-4" />}>Add item</Button>
 *
 * // Link (renders as <a> via React Aria Link)
 * <Button href="/dashboard" color="link-color">Dashboard</Button>
 *
 * // Loading
 * <Button isLoading>Saving…</Button>
 *
 * // Destructive
 * <Button color="primary-destructive" onPress={handleDelete}>Delete account</Button>
 * ```
 */
export function Button(props: LinkButtonProps): React.JSX.Element;
export function Button(props: ButtonProps): React.JSX.Element;
export function Button({
  size = "sm",
  color = "primary",
  children,
  className,
  noTextPadding,
  iconLeading: IconLeading,
  iconTrailing: IconTrailing,
  isDisabled: disabled,
  isLoading: loading,
  showTextWhileLoading,
  ...otherProps
}: Props): React.JSX.Element {
  const href = "href" in otherProps ? otherProps.href : undefined;
  const Component = (href ? AriaLink : AriaButton);

  const isIconOnly = (IconLeading ?? IconTrailing) !== undefined && !children;
  const isLinkVariant = (["link-gray", "link-color", "link-destructive"] as const).includes(
    color as "link-gray" | "link-color" | "link-destructive"
  );

  noTextPadding = isLinkVariant || noTextPadding;

  // Build component-specific props to avoid passing button-only props to AriaLink and vice versa
  let componentProps: Record<string, unknown>;
  if (href) {
    const { routerOptions, ...rest } = otherProps as LinkButtonProps;
    componentProps = { ...rest, href: disabled ? undefined : href, routerOptions };
  } else {
    const { slot, ...rest } = otherProps as ButtonProps;
    componentProps = {
      ...rest,
      slot,
      type: (rest as ButtonHTMLAttributes<HTMLButtonElement>).type ?? "button",
      isPending: loading,
    };
  }

  return (
    <Component
      data-loading={loading ? true : undefined}
      data-icon-only={isIconOnly ? true : undefined}
      {...componentProps}
      isDisabled={disabled}
      className={(renderProps: { isFocusVisible: boolean; isPressed: boolean }) =>
        cn(
          buttonVariants({ size, color }),
          // Pointer-events-none during loading or disabled-link states
           
          (loading || (href !== undefined && (disabled ?? false))) && "pointer-events-none",
          // Hide all children except the loader (optionally keep text visible)
          loading &&
            (showTextWhileLoading
              ? "[&>*:not([data-icon=loading]):not([data-text])]:hidden"
              : "[&>*:not([data-icon=loading])]:invisible"),
          // MHL focus ring — keyboard navigation only via React Aria isFocusVisible
          renderProps.isFocusVisible && "ring-brand-500 ring-2 ring-offset-2",
          // MHL press micro-interaction
          renderProps.isPressed && "scale-[0.98]",
          className
        )
      }
    >
      {/* Leading icon — hidden while loading; spinner shown instead */}
      {!loading && isValidElement(IconLeading) && IconLeading}
      {!loading && isReactComponent(IconLeading) && (
        <IconLeading data-icon="leading" className={iconBaseClass} />
      )}

      {/* Loading spinner */}
      {loading && (
        <svg
          fill="none"
          aria-hidden="true"
          data-icon="loading"
          viewBox="0 0 20 20"
          className={cn(
            iconBaseClass,
            !showTextWhileLoading && "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          )}
        >
          {/* Track */}
          <circle
            className="stroke-current opacity-30"
            cx="10"
            cy="10"
            r="8"
            fill="none"
            strokeWidth="2"
          />
          {/* Spinning arc */}
          <circle
            className="origin-center animate-spin stroke-current"
            cx="10"
            cy="10"
            r="8"
            fill="none"
            strokeWidth="2"
            strokeDasharray="12.5 50"
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Label */}
      {children !== undefined && (
        <span data-text className={cn("transition-all", !noTextPadding && "px-0.5")}>
          {children}
        </span>
      )}

      {/* Trailing icon */}
      {isValidElement(IconTrailing) && IconTrailing}
      {isReactComponent(IconTrailing) && (
        <IconTrailing data-icon="trailing" className={iconBaseClass} />
      )}
    </Component>
  );
}

Button.displayName = "Button";
