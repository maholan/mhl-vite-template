"use client";

import {
  isValidElement,
  type ReactElement,
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

import { buttonUtilityVariants, type ButtonUtilityVariantProps } from "./button-utility.variants";

import type { Placement } from "react-aria";

// Inline helper — avoids an extra import from utils in the consumer's project.
function isReactComponent(value: unknown): value is FC<{ className?: string }> {
  return typeof value === "function";
}

// import { Tooltip } from "@/components/ui/base/tooltip/tooltip";

/**
 * Common props shared between button and anchor variants
 */
export interface CommonProps extends ButtonUtilityVariantProps {
  /** Disables the button and shows a disabled state */
  isDisabled?: boolean;
  /** The icon to display in the button */
  icon?: FC<{ className?: string }> | ReactNode;
  /** The tooltip to display when hovering over the button */
  tooltip?: string;
  /** The placement of the tooltip */
  tooltipPlacement?: Placement;
}

/**
 * Props for the button variant (non-link)
 */
export interface ButtonProps
  extends
    CommonProps,
    DetailedHTMLProps<
      Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color" | "slot">,
      HTMLButtonElement
    > {
  /** Slot name for react-aria component */
  slot?: AriaButtonProps["slot"];
}

/**
 * Props for the link variant (anchor tag)
 */
interface LinkProps
  extends
    CommonProps,
    DetailedHTMLProps<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "color">, HTMLAnchorElement> {
  /** Options for the configured client side router. */
  routerOptions?: AriaLinkProps["routerOptions"];
}

/** Union type of button and link props */
export type Props = ButtonProps | LinkProps;

export const ButtonUtility = ({
  tooltip,
  className,
  isDisabled,
  icon: Icon,
  size = "sm",
  color = "secondary",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  tooltipPlacement: _tooltipPlacement = "top", // TODO: re-enable when Tooltip component is built
  ...otherProps
}: Props): ReactElement => {
  const href = "href" in otherProps ? otherProps.href : undefined;
  const Component = (href ? AriaLink : AriaButton) as typeof AriaButton | typeof AriaLink;

  let props = {};

  if (href) {
    props = {
      ...otherProps,

      href: isDisabled ? undefined : href,

      // Since anchor elements do not support the `disabled` attribute and state,
      // we need to specify `data-rac` and `data-disabled` in order to be able
      // to use the `disabled:` selector in classes.
      ...(isDisabled ? { "data-rac": true, "data-disabled": true } : {}),
    };
  } else {
    props = {
      ...otherProps,

      type: otherProps.type ?? "button",
      isDisabled,
    };
  }

  const content = (
    <Component
      aria-label={tooltip}
      {...props}
      className={(state: { isFocusVisible: boolean }) =>
        cn(
          buttonUtilityVariants({ color, size }),
          state.isFocusVisible && "ring-brand-500 ring-2 ring-offset-2",
          className
        )
      }
    >
      {isReactComponent(Icon) && <Icon data-icon />}
      {isValidElement(Icon) && Icon}
    </Component>
  );

  // TODO: Re-enable tooltip when we have a better solution for disabled buttons (see #516)
  // if (tooltip) {
  //   return (
  //     <Tooltip
  //       title={tooltip}
  //       placement={tooltipPlacement}
  //       isDisabled={isDisabled}
  //       offset={size === "xs" ? 4 : 6}
  //     >
  //       {content}
  //     </Tooltip>
  //   );
  // }

  return content;
};

ButtonUtility.displayName = "ButtonUtility";
