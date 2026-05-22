import React, { type ReactNode } from "react";

import { ArrowRight } from "@/components/ui/assets";
import { cn } from "@/libs/utils";

import {
  BADGE_GROUP_LIGHT_ADDON,
  BADGE_GROUP_LIGHT_ROOT,
  BADGE_GROUP_MODERN_DOT,
  badgeGroupAddonVariants,
  badgeGroupDotVariants,
  badgeGroupRootVariants,
  type BadgeGroupAlign,
  type BadgeGroupColor,
  type BadgeGroupSize,
  type BadgeGroupTheme,
} from "./badge-group.variants";

export interface BadgeGroupProps {
  /** Text label displayed in the main badge area. */
  children?: ReactNode;
  /** Text displayed inside the addon pill. */
  addonText: string;
  size?: BadgeGroupSize;
  /** Colour palette. Maps to the five core semantic `utility-*` tokens. */
  color?: BadgeGroupColor;
  /** Visual theme: `light` (coloured pill) or `modern` (neutral pill with status dot). */
  theme?: BadgeGroupTheme;
  /** Position of the addon pill relative to `children`. Defaults to `"leading"`. */
  align?: BadgeGroupAlign;
  /**
   * Trailing icon rendered after `children` (leading align) or inside the addon pill
   * (trailing align). Library-agnostic — accepts any React node.
   *
   * Defaults to `<ArrowRight />` from `@/components/assets`.
   * Recommended sizing: `size-4` for leading, `size-3 stroke-[3px]` for trailing.
   * Use `BADGE_GROUP_LIGHT_ICON[color]` to match the icon colour to the badge colour.
   *
   * Pass `null` to render without any trailing icon.
   */
  iconTrailing?: ReactNode;
  className?: string;
}

/**
 * Announcement / callout badge combining a prominent addon pill with a text label.
 * Follows the Untitled UI BadgeGroup pattern with `light` and `modern` themes.
 *
 * @example
 * ```tsx
 * // Light, leading (default)
 * <BadgeGroup addonText="New" color="brand">
 *   We just launched version 2.0!
 * </BadgeGroup>
 *
 * // Modern, trailing, with icon
 * <BadgeGroup
 *   addonText="Read more"
 *   color="brand"
 *   theme="modern"
 *   align="trailing"
 *   iconTrailing={<ArrowRight className="ml-0.5 size-3 stroke-[3px]" />}
 * >
 *   New feature announcement
 * </BadgeGroup>
 * ```
 */
export function BadgeGroup({
  children,
  addonText,
  size = "md",
  color = "brand",
  theme = "light",
  align = "leading",
  iconTrailing = <ArrowRight className="ml-1 size-4" />,
  className,
}: BadgeGroupProps): React.JSX.Element {
  const hasChildren = !!children;

  // Root — CVA resolves all structural + padding classes; colour map adds theme colours
  const rootClasses = cn(
    badgeGroupRootVariants({ theme, size, align }),
    // Leading with no text and no icon: collapse right padding to match the pill
    align === "leading" && !hasChildren && !iconTrailing && "pr-1",
    theme === "light" && BADGE_GROUP_LIGHT_ROOT[color],
    className
  );

  // Addon pill — CVA resolves structure + padding; colour map adds ring colour
  const addonClasses = cn(
    badgeGroupAddonVariants({ theme, size, align }),
    hasChildren && align === "leading" && "mr-2",
    hasChildren && align === "trailing" && "ml-2",
    theme === "light" && BADGE_GROUP_LIGHT_ADDON[color]
  );

  // Modern status dot — CVA resolves margin; colour map adds bg + outline
  const dotClasses = cn(badgeGroupDotVariants({ align, size }), BADGE_GROUP_MODERN_DOT[color]);

  if (align === "trailing") {
    return (
      <div className={rootClasses}>
        {theme === "modern" && <span aria-hidden="true" className={dotClasses} />}
        {children}
        <span className={addonClasses}>
          {addonText}
          {iconTrailing}
        </span>
      </div>
    );
  }

  return (
    <div className={rootClasses}>
      <span className={addonClasses}>
        {theme === "modern" && <span aria-hidden="true" className={dotClasses} />}
        {addonText}
      </span>
      {children}
      {iconTrailing}
    </div>
  );
}

BadgeGroup.displayName = "BadgeGroup";
