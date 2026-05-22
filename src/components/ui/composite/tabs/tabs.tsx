"use client";

import {
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithRef,
  type FC,
  type JSX,
  type ReactNode,
} from "react";
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
  TabsContext,
  useSlottedContext,
  type Key,
  type TabListProps as AriaTabListProps,
  type TabProps as AriaTabProps,
  type TabRenderProps as AriaTabRenderProps,
} from "react-aria-components";

import { Badge } from "@/components/ui/base";
import { cn, isReactComponent } from "@/libs";

import {
  tabListVariants,
  tabPanelVariants,
  tabVariants,
  tabsRootVariants,
  type HorizontalTabType,
  type TabOrientation,
  type TabSize,
  type TabType,
} from "./tabs.variants";

// ── Sliding indicator ──────────────────────────────────────────────────────────

interface IndicatorRect {
  left: number;
  top: number;
  width: number;
  height: number;
  ready: boolean;
}

function useTabIndicator(
  listRef: { current: HTMLElement | null },
  selectedKey: Key | null | undefined
): IndicatorRect {
  const [rect, setRect] = useState<IndicatorRect>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    ready: false,
  });

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const selected = list.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!selected) return;
    const listRect = list.getBoundingClientRect();
    const tabRect = selected.getBoundingClientRect();
    setRect({
      left: tabRect.left - listRect.left,
      top: tabRect.top - listRect.top,
      width: tabRect.width,
      height: tabRect.height,
      ready: true,
    });
  }, [listRef]);

  useEffect(() => {
    const id = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(id);
  }, [measure, selectedKey]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [listRef, measure]);

  return rect;
}

function getTabActiveClasses(
  type: TabType,
  { isFocusVisible, isSelected, isHovered }: AriaTabRenderProps
): string {
  const focused = isFocusVisible
    ? "ring-2 ring-brand-500 ring-offset-2 outline-none"
    : "outline-none";

  switch (type) {
    case "button-brand":
    case "underline":
    case "line":
      return cn(focused, (isSelected || isHovered) && "text-brand-secondary");
    case "button-gray":
    case "button-border":
    case "button-minimal":
      return cn(focused, (isSelected || isHovered) && "text-secondary");
    default:
      return focused;
  }
}

function getIndicatorClass(type: TabType): string {
  switch (type) {
    case "button-brand":
      return "rounded-md bg-brand-primary-alt";
    case "button-gray":
      return "rounded-md bg-active";
    case "button-border":
      return "rounded-md bg-primary-alt shadow-sm ring-1 ring-primary ring-inset";
    case "button-minimal":
      return "rounded-lg bg-primary-alt shadow-xs ring-1 ring-primary ring-inset";
    case "underline":
    case "line":
      return "bg-brand-solid rounded-full";
    default:
      return "";
  }
}

const INDICATOR_TYPES: TabType[] = [
  "button-brand",
  "button-gray",
  "button-border",
  "button-minimal",
  "underline",
  "line",
];

// ── Context ────────────────────────────────────────────────────────────────────

interface TabListContextValue {
  size: TabSize;
  type: TabType;
  orientation: TabOrientation;
  fullWidth?: boolean;
}

const TabListContext = createContext<TabListContextValue>({
  size: "sm",
  type: "button-brand",
  orientation: "horizontal",
});

// ── TabList ────────────────────────────────────────────────────────────────────

interface TabListComponentProps<T extends object> extends Omit<AriaTabListProps<T>, "items"> {
  /** Visual style of the tab strip. @default "button-brand" */
  type?: TabType;
  /** Size of the tab strip. @default "sm" */
  size?: TabSize;
  /** Orientation — inherited from parent Tabs when omitted. */
  orientation?: TabOrientation;
  /** Items for dynamic rendering. */
  items?: T[];
  /** Whether tabs expand to fill available width. */
  fullWidth?: boolean;
}

export function TabList<T extends TabComponentProps>({
  type = "button-brand",
  size = "sm",
  orientation: orientationProp,
  fullWidth,
  className,
  children,
  ...rest
}: TabListComponentProps<T>): JSX.Element {
  const tabsCtx = useSlottedContext(TabsContext);
  const orientation: TabOrientation =
    orientationProp ?? (tabsCtx?.orientation as TabOrientation) ?? "horizontal";

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const showIndicator = INDICATOR_TYPES.includes(type);
  const indicator = useTabIndicator(listRef, selectedKey);

  // The underline bottom-border track lives on the outer wrapper so the
  // sliding indicator span shares the same positioning context as that track.
  const wrapperClass =
    orientation === "horizontal" && type === "underline"
      ? "relative before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-secondary"
      : "relative";

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const readSelected = (): void => {
      const selected = list.querySelector<HTMLElement>('[aria-selected="true"]');
      setSelectedKey(selected?.id ?? null);
    };

    readSelected();

    const mo = new MutationObserver(readSelected);
    mo.observe(list, { subtree: true, attributeFilter: ["aria-selected"] });
    return () => mo.disconnect();
  }, []);

  return (
    <TabListContext.Provider value={{ size, type, orientation, fullWidth }}>
      <div ref={listRef} className={wrapperClass}>
        {showIndicator && indicator.ready && (
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute transition-all duration-200 ease-out",
              getIndicatorClass(type)
            )}
            style={
              type === "underline"
                ? {
                    left: indicator.left,
                    top: indicator.top + indicator.height - 2,
                    width: indicator.width,
                    height: 2,
                  }
                : type === "line"
                  ? {
                      left: indicator.left,
                      top: indicator.top,
                      width: 2,
                      height: indicator.height,
                    }
                  : {
                      left: indicator.left,
                      top: indicator.top,
                      width: indicator.width,
                      height: indicator.height,
                    }
            }
          />
        )}

        <AriaTabList
          {...rest}
          className={(state) =>
            cn(
              tabListVariants({ type: type as HorizontalTabType, size, orientation, fullWidth }),
              typeof className === "function" ? className(state) : className
            )
          }
        >
          {children ?? (rest.items ? (item: T) => <Tab {...item}>{item.children}</Tab> : undefined)}
        </AriaTabList>
      </div>
    </TabListContext.Provider>
  );
}

TabList.displayName = "TabList";

// ── TabPanel ───────────────────────────────────────────────────────────────────

export function TabPanel({
  className,
  ...props
}: ComponentPropsWithRef<typeof AriaTabPanel>): JSX.Element {
  return (
    <AriaTabPanel
      {...props}
      className={(state) =>
        cn(tabPanelVariants(), typeof className === "function" ? className(state) : className)
      }
    />
  );
}

TabPanel.displayName = "TabPanel";

// ── Tab ────────────────────────────────────────────────────────────────────────

export interface TabComponentProps extends AriaTabProps {
  /** Text label for the tab. */
  label?: ReactNode;
  children?: ReactNode | ((props: AriaTabRenderProps) => ReactNode);
  /** Icon — FC with optional className, or a ReactNode element. */
  icon?: FC<{ className?: string }> | ReactNode;
  /** Badge count or label displayed next to the tab text. */
  badge?: number | string;
}

export function Tab({
  label,
  children,
  badge,
  icon: Icon,
  className,
  ...rest
}: TabComponentProps): JSX.Element {
  const { size, type, fullWidth } = useContext(TabListContext);

  const showColorBadge = type === "underline" || type === "line" || type === "button-brand";

  return (
    <AriaTab
      {...rest}
      className={(state) =>
        cn(
          tabVariants({ size, type: type as HorizontalTabType, fullWidth }),
          getTabActiveClasses(type, state),
          typeof className === "function" ? className(state) : className
        )
      }
    >
      {(state) => (
        <>
          {isValidElement(Icon) && Icon}
          {isReactComponent(Icon) && (
            <Icon data-icon className="shrink-0 transition-all duration-150" />
          )}

          <span className={cn("flex items-center gap-1.5", type !== "line" && "px-0.5")}>
            {typeof children === "function" ? children(state) : (children ?? label)}

            {badge !== undefined && (
              <Badge
                size="sm"
                variant={
                  showColorBadge && (state.isHovered || state.isSelected) ? "soft" : "modern"
                }
                color={showColorBadge && (state.isHovered || state.isSelected) ? "brand" : "gray"}
                className={cn(
                  "hidden transition-all duration-150 md:flex",
                  size === "sm" && "-my-px"
                )}
              >
                {badge}
              </Badge>
            )}
          </span>
        </>
      )}
    </AriaTab>
  );
}

Tab.displayName = "Tab";

// ── Tabs root ──────────────────────────────────────────────────────────────────

export type TabsProps = ComponentPropsWithRef<typeof AriaTabs>;

export function TabsRoot({ className, ...props }: TabsProps): JSX.Element {
  const orientation = (props.orientation as TabOrientation) ?? "horizontal";

  return (
    <AriaTabs
      keyboardActivation="manual"
      {...props}
      className={(state) =>
        cn(
          tabsRootVariants({ orientation }),
          typeof className === "function" ? className(state) : className
        )
      }
    />
  );
}

TabsRoot.displayName = "TabsRoot";

// ── Compound export ────────────────────────────────────────────────────────────

/**
 * Tabs compound component with five horizontal and two vertical visual styles.
 * All types feature a sliding indicator that animates between tabs on selection.
 * Built on React Aria Tabs — keyboard navigation, ARIA roles, and focus management included.
 *
 * @example
 * ```tsx
 * <Tabs.Root>
 *   <Tabs.List type="underline">
 *     <Tabs.Item id="details">My details</Tabs.Item>
 *     <Tabs.Item id="profile">Profile</Tabs.Item>
 *     <Tabs.Item id="billing" badge={2}>Billing</Tabs.Item>
 *   </Tabs.List>
 *   <Tabs.Panel id="details">Details content</Tabs.Panel>
 *   <Tabs.Panel id="profile">Profile content</Tabs.Panel>
 *   <Tabs.Panel id="billing">Billing content</Tabs.Panel>
 * </Tabs.Root>
 * ```
 */
export const Tabs = TabsRoot as typeof TabsRoot & {
  Root: typeof TabsRoot;
  List: typeof TabList;
  Item: typeof Tab;
  Panel: typeof TabPanel;
};

Tabs.Root = TabsRoot;
Tabs.List = TabList;
Tabs.Item = Tab;
Tabs.Panel = TabPanel;
