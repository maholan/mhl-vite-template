"use client";

import {
  createContext,
  useEffect,
  useState,
  useContext,
  type FC,
  type JSX,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  Breadcrumb as PrimitiveBreadcrumb,
  Breadcrumbs as PrimitiveBreadcrumbs,
  Link as PrimitiveLink,
  type BreadcrumbProps as PrimitiveBreadcrumbProps,
  type BreadcrumbsProps as PrimitiveBreadcrumbsProps,
  type LinkProps as PrimitiveLinkProps,
} from "react-aria-components";

import { ChevronRight, DotsHorizontal, HomeLine, SlashDivider } from "@/components/ui/assets/icons";
import { cn } from "@/libs";

import {
  breadcrumbItemVariants,
  breadcrumbOverflowVariants,
  breadcrumbSeparatorVariants,
  breadcrumbsRootVariants,
  type BreadcrumbDivider,
  type BreadcrumbType,
} from "./breadcrumbs.variants";

// ── Context ────────────────────────────────────────────────────────────────────

interface BreadcrumbsContextValue {
  type: BreadcrumbType;
  divider: BreadcrumbDivider;
}

const BreadcrumbsContext = createContext<BreadcrumbsContextValue>({
  type: "text",
  divider: "chevron",
});

// ── Separator ──────────────────────────────────────────────────────────────────

function BreadcrumbSeparator(): JSX.Element {
  const { divider } = useContext(BreadcrumbsContext);
  return (
    <span aria-hidden="true" className={cn(breadcrumbSeparatorVariants({ divider }))}>
      {divider === "chevron" ? (
        <ChevronRight className="size-full" />
      ) : (
        <SlashDivider className="size-full" />
      )}
    </span>
  );
}

// ── BreadcrumbEllipsis ─────────────────────────────────────────────────────────

export interface BreadcrumbEllipsisProps {
  /** Accessible label for screen readers. @default "More pages" */
  "aria-label"?: string;
  className?: string;
  onPress?: () => void;
  /** Injected by BreadcrumbList — whether to show separator before. */
  showSeparator?: boolean;
}

export function BreadcrumbEllipsis({
  "aria-label": ariaLabel = "More pages",
  className,
  onPress,
  showSeparator = true,
}: BreadcrumbEllipsisProps): JSX.Element {
  const { type } = useContext(BreadcrumbsContext);

  return (
    <PrimitiveBreadcrumb
      className={cn("inline-flex items-center", type === "button" ? "gap-1" : "gap-2")}
    >
      {showSeparator && <BreadcrumbSeparator />}
      <button
        aria-label={ariaLabel}
        className={cn(breadcrumbOverflowVariants({ type }), "cursor-pointer", className)}
        type="button"
        onClick={onPress}
      >
        <DotsHorizontal className="size-5" />
      </button>
    </PrimitiveBreadcrumb>
  );
}

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

// ── BreadcrumbItem ─────────────────────────────────────────────────────────────

export interface BreadcrumbItemProps extends Omit<
  PrimitiveBreadcrumbProps,
  "children" | "className"
> {
  children?: ReactNode;
  className?: string;
  /** When true, renders the home icon instead of text. */
  isHome?: boolean;
  /** Passed by BreadcrumbList — marks the last item as current. */
  isCurrent?: boolean;
  /** Icon component to render instead of the home icon. */
  icon?: FC<{ className?: string }>;
  /** href for the link. Use for standard anchor navigation. */
  href?: string;
  /**
   * Called when the item is pressed. Use instead of (or alongside) href for
   * client-side navigation (e.g. router.push) or custom click handlers.
   */
  onPress?: () => void;
  /** Additional props passed to the underlying PrimitiveLink element. */
  linkProps?: Omit<PrimitiveLinkProps, "href" | "children" | "className" | "onPress">;
  /** Injected by BreadcrumbList — whether to show separator before this item. */
  showSeparator?: boolean;
  /** Injected by BreadcrumbList — animate this item on mount (used after expand). */
  animate?: boolean;
}

export function BreadcrumbItem({
  children,
  className,
  isHome = false,
  isCurrent = false,
  icon: Icon,
  href,
  onPress,
  linkProps,
  showSeparator = false,
  animate = false,
  ...rest
}: BreadcrumbItemProps): JSX.Element {
  const { type } = useContext(BreadcrumbsContext);
  const [visible, setVisible] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  const itemClass = cn(
    breadcrumbItemVariants({ type, isCurrent }),
    isCurrent && "focus-visible:ring-0",
    !isCurrent &&
      type !== "button" &&
      "focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1 rounded-sm",
    !isCurrent &&
      type === "button" &&
      "focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1",
    className
  );

  const content = isHome ? (
    Icon ? (
      <Icon className="size-5 shrink-0" />
    ) : (
      <HomeLine className="size-5 shrink-0" />
    )
  ) : (
    children
  );

  return (
    <PrimitiveBreadcrumb
      {...rest}
      className={cn(
        "inline-flex items-center",
        type === "button" ? "gap-1" : "gap-2",
        animate && "transition-all duration-200 ease-out",
        animate && (visible ? "translate-x-0 opacity-100" : "-translate-x-1.5 opacity-0")
      )}
    >
      {showSeparator && <BreadcrumbSeparator />}
      {isCurrent ? (
        <span aria-current="page" className={itemClass}>
          {content}
        </span>
      ) : (
        <PrimitiveLink
          {...linkProps}
          aria-label={isHome ? "Home" : undefined}
          className={itemClass}
          href={href}
          onPress={onPress}
        >
          {content}
        </PrimitiveLink>
      )}
    </PrimitiveBreadcrumb>
  );
}

BreadcrumbItem.displayName = "BreadcrumbItem";

// ── BreadcrumbList ─────────────────────────────────────────────────────────────

export interface BreadcrumbListProps extends Omit<
  PrimitiveBreadcrumbsProps<object>,
  "children" | "className"
> {
  children: ReactNode;
  className?: string;
  /**
   * Maximum number of visible items (including first and last).
   * When the total exceeds this, middle items are collapsed behind an ellipsis.
   * Clicking the ellipsis expands all items with an entrance animation.
   * @default undefined (show all)
   */
  maxItems?: number;
  /** Called when the ellipsis is pressed to expand all items. */
  onExpandEllipsis?: () => void;
}

export function BreadcrumbList({
  children,
  className,
  maxItems,
  onExpandEllipsis,
  ...rest
}: BreadcrumbListProps): JSX.Element {
  const [expanded, setExpanded] = useState(false);

  const items = Array.isArray(children) ? children.filter(Boolean) : children ? [children] : [];
  const total = items.length;

  const shouldCollapse = !expanded && maxItems !== undefined && total > maxItems && maxItems >= 2;

  // Indices that were hidden before the user expanded — animate them on reveal.
  const wasCollapsed = expanded && maxItems !== undefined && total > maxItems && maxItems >= 2;

  let visibleItems: ReactNode[];

  if (shouldCollapse) {
    visibleItems = [
      items[0],
      <BreadcrumbEllipsis
        key="__ellipsis__"
        showSeparator
        onPress={() => {
          setExpanded(true);
          onExpandEllipsis?.();
        }}
      />,
      items[total - 1],
    ];
  } else {
    visibleItems = items;
  }

  return (
    <PrimitiveBreadcrumbs {...rest} className={cn("flex flex-wrap items-center gap-0", className)}>
      {visibleItems.map((item, index) => {
        const isLast = index === visibleItems.length - 1;
        const isEllipsis = (item as { key?: string })?.key === "__ellipsis__";

        if (isEllipsis) return item;

        const needsSeparator = index > 0;
        // Middle items (index 1 to total-2) were hidden — animate them after expand.
        const shouldAnimate = wasCollapsed && index > 0 && index < total - 1;

        const cloned = isLast
          ? cloneWithProps(item, {
              isCurrent: true,
              showSeparator: needsSeparator,
              animate: shouldAnimate,
            })
          : cloneWithProps(item, { showSeparator: needsSeparator, animate: shouldAnimate });

        return cloned;
      })}
    </PrimitiveBreadcrumbs>
  );
}

BreadcrumbList.displayName = "BreadcrumbList";

function cloneWithProps(node: ReactNode, props: Partial<BreadcrumbItemProps>): ReactNode {
  if (node && typeof node === "object" && "props" in node) {
    const element = node as ReactElement<BreadcrumbItemProps>;
    return { ...element, props: { ...element.props, ...props } };
  }
  return node;
}

// ── BreadcrumbsRoot ────────────────────────────────────────────────────────────

export interface BreadcrumbsRootProps {
  children: ReactNode;
  className?: string;
  /** Visual style. @default "text" */
  type?: BreadcrumbType;
  /** Separator icon. @default "chevron" */
  divider?: BreadcrumbDivider;
}

export function BreadcrumbsRoot({
  children,
  className,
  type = "text",
  divider = "chevron",
}: BreadcrumbsRootProps): JSX.Element {
  return (
    <BreadcrumbsContext.Provider value={{ type, divider }}>
      <nav aria-label="Breadcrumb" className={cn(breadcrumbsRootVariants({ type }), className)}>
        {children}
      </nav>
    </BreadcrumbsContext.Provider>
  );
}

BreadcrumbsRoot.displayName = "BreadcrumbsRoot";

// ── Compound export ────────────────────────────────────────────────────────────

/**
 * Breadcrumbs compound component with three visual styles and two divider types.
 * Supports automatic overflow ellipsis with animated expand-on-click, home icon,
 * and current-page highlighting. Built on React Aria — keyboard navigation and
 * ARIA roles included.
 *
 * @example
 * ```tsx
 * <Breadcrumbs.Root type="text" divider="chevron">
 *   <Breadcrumbs.List>
 *     <Breadcrumbs.Item href="/" isHome />
 *     <Breadcrumbs.Item href="/settings">Settings</Breadcrumbs.Item>
 *     <Breadcrumbs.Item>Profile</Breadcrumbs.Item>
 *   </Breadcrumbs.List>
 * </Breadcrumbs.Root>
 *
 * // With overflow collapse — clicking ellipsis expands with animation
 * <Breadcrumbs.Root type="button" divider="slash">
 *   <Breadcrumbs.List maxItems={3}>
 *     <Breadcrumbs.Item href="/" isHome />
 *     <Breadcrumbs.Item href="/a" onPress={() => router.push('/a')}>Projects</Breadcrumbs.Item>
 *     <Breadcrumbs.Item href="/a/b">Alpha</Breadcrumbs.Item>
 *     <Breadcrumbs.Item href="/a/b/c">Sprint 4</Breadcrumbs.Item>
 *     <Breadcrumbs.Item>Ticket-123</Breadcrumbs.Item>
 *   </Breadcrumbs.List>
 * </Breadcrumbs.Root>
 * ```
 */
export const Breadcrumbs = BreadcrumbsRoot as typeof BreadcrumbsRoot & {
  Root: typeof BreadcrumbsRoot;
  List: typeof BreadcrumbList;
  Item: typeof BreadcrumbItem;
  Ellipsis: typeof BreadcrumbEllipsis;
};

Breadcrumbs.Root = BreadcrumbsRoot;
Breadcrumbs.List = BreadcrumbList;
Breadcrumbs.Item = BreadcrumbItem;
Breadcrumbs.Ellipsis = BreadcrumbEllipsis;
