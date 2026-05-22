"use client";

import { createContext, useContext, useMemo, type JSX, type ReactNode } from "react";

import { cn } from "@/libs/utils";

// ── Types ──────────────────────────────────────────────────────────────────────

type PaginationPageItem = {
  type: "page";
  value: number;
  isCurrent: boolean;
};

type PaginationEllipsisItem = {
  type: "ellipsis";
  key: number;
};

export type PaginationItem = PaginationPageItem | PaginationEllipsisItem;

// ── Context ────────────────────────────────────────────────────────────────────

interface PaginationContextValue {
  pages: PaginationItem[];
  currentPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

const PaginationContext = createContext<PaginationContextValue | undefined>(undefined);

function usePaginationContext(componentName: string): PaginationContextValue {
  const ctx = useContext(PaginationContext);
  if (!ctx) throw new Error(`<${componentName}> must be used inside <Pagination.Root>`);
  return ctx;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

function buildPages(page: number, total: number, siblingCount: number): PaginationItem[] {
  const items: PaginationItem[] = [];
  // siblingCount * 2 (both sides) + current + first + last + up to 2 ellipses = 5
  const totalVisible = siblingCount * 2 + 5;

  if (totalVisible >= total) {
    for (let i = 1; i <= total; i++) {
      items.push({ type: "page", value: i, isCurrent: i === page });
    }
    return items;
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, total);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftCount = siblingCount * 2 + 3;
    range(1, leftCount).forEach((n) =>
      items.push({ type: "page", value: n, isCurrent: n === page })
    );
    items.push({ type: "ellipsis", key: leftCount + 1 });
    items.push({ type: "page", value: total, isCurrent: total === page });
  } else if (showLeftEllipsis && !showRightEllipsis) {
    const rightCount = siblingCount * 2 + 3;
    items.push({ type: "page", value: 1, isCurrent: page === 1 });
    items.push({ type: "ellipsis", key: total - rightCount });
    range(total - rightCount + 1, total).forEach((n) =>
      items.push({ type: "page", value: n, isCurrent: n === page })
    );
  } else {
    items.push({ type: "page", value: 1, isCurrent: page === 1 });
    items.push({ type: "ellipsis", key: leftSibling - 1 });
    range(leftSibling, rightSibling).forEach((n) =>
      items.push({ type: "page", value: n, isCurrent: n === page })
    );
    items.push({ type: "ellipsis", key: rightSibling + 1 });
    items.push({ type: "page", value: total, isCurrent: total === page });
  }

  return items;
}

// ── Root ───────────────────────────────────────────────────────────────────────

export interface PaginationRootProps {
  /** Current active page (1-based). */
  page: number;
  /** Total number of pages. */
  total: number;
  /** Number of sibling pages shown on each side of the current page. @default 1 */
  siblingCount?: number;
  /** Called when the user navigates to a different page. */
  onPageChange?: (page: number) => void;
  children: ReactNode;
  className?: string;
}

function PaginationRoot({
  page,
  total,
  siblingCount = 1,
  onPageChange,
  children,
  className,
}: PaginationRootProps): JSX.Element {
  const pages = useMemo(() => buildPages(page, total, siblingCount), [page, total, siblingCount]);

  const ctx = useMemo<PaginationContextValue>(
    () => ({
      pages,
      currentPage: page,
      total,
      onPageChange: (newPage: number) => onPageChange?.(newPage),
    }),
    [pages, page, total, onPageChange]
  );

  return (
    <PaginationContext.Provider value={ctx}>
      <nav aria-label="Pagination" className={className}>
        {children}
      </nav>
    </PaginationContext.Provider>
  );
}

PaginationRoot.displayName = "Pagination.Root";

// ── PrevTrigger / NextTrigger ──────────────────────────────────────────────────

export interface PaginationTriggerProps {
  /** Direction this trigger controls. */
  direction: "prev" | "next";
  children: ReactNode;
  className?: string;
  /** Override the default accessible label. */
  "aria-label"?: string;
}

function PaginationTrigger({
  direction,
  children,
  className,
  "aria-label": ariaLabel,
}: PaginationTriggerProps): JSX.Element {
  const { currentPage, total, onPageChange } = usePaginationContext("Pagination.Trigger");
  const isDisabled = direction === "prev" ? currentPage <= 1 : currentPage >= total;
  const defaultLabel = direction === "prev" ? "Go to previous page" : "Go to next page";

  return (
    <button
      aria-label={ariaLabel ?? defaultLabel}
      aria-disabled={isDisabled}
      className={cn("cursor-pointer", className)}
      disabled={isDisabled}
      type="button"
      onClick={() => {
        if (isDisabled) return;
        onPageChange(direction === "prev" ? currentPage - 1 : currentPage + 1);
      }}
    >
      {children}
    </button>
  );
}

PaginationTrigger.displayName = "Pagination.Trigger";

export interface PaginationPrevTriggerProps extends Omit<PaginationTriggerProps, "direction"> {}

function PaginationPrevTrigger(props: PaginationPrevTriggerProps): JSX.Element {
  return <PaginationTrigger {...props} direction="prev" />;
}

PaginationPrevTrigger.displayName = "Pagination.PrevTrigger";

export interface PaginationNextTriggerProps extends Omit<PaginationTriggerProps, "direction"> {}

function PaginationNextTrigger(props: PaginationNextTriggerProps): JSX.Element {
  return <PaginationTrigger {...props} direction="next" />;
}

PaginationNextTrigger.displayName = "Pagination.NextTrigger";

// ── Item ───────────────────────────────────────────────────────────────────────

export interface PaginationPageProps {
  value: number;
  isCurrent: boolean;
  children?: ReactNode;
  className?: string | ((state: { isCurrent: boolean }) => string);
  /** Override the default accessible label. */
  "aria-label"?: string;
}

function PaginationPage({
  value,
  isCurrent,
  children,
  className,
  "aria-label": ariaLabel,
}: PaginationPageProps): JSX.Element {
  const { onPageChange } = usePaginationContext("Pagination.Page");
  const resolvedClass = typeof className === "function" ? className({ isCurrent }) : className;

  return (
    <button
      aria-current={isCurrent ? "page" : undefined}
      aria-label={ariaLabel ?? `Page ${value}`}
      className={cn("cursor-pointer", resolvedClass)}
      type="button"
      onClick={() => onPageChange(value)}
    >
      {children ?? value}
    </button>
  );
}

PaginationPage.displayName = "Pagination.Page";

// ── Ellipsis ───────────────────────────────────────────────────────────────────

export interface PaginationEllipsisProps {
  children?: ReactNode;
  className?: string;
}

function PaginationEllipsis({ children, className }: PaginationEllipsisProps): JSX.Element {
  return (
    <span aria-hidden="true" className={className}>
      {children ?? "…"}
    </span>
  );
}

PaginationEllipsis.displayName = "Pagination.Ellipsis";

// ── Context render-prop consumer ───────────────────────────────────────────────

export interface PaginationContextConsumerProps {
  children: (ctx: PaginationContextValue) => ReactNode;
}

function PaginationContextConsumer({ children }: PaginationContextConsumerProps): JSX.Element {
  const ctx = usePaginationContext("Pagination.Context");
  return <>{children(ctx)}</>;
}

PaginationContextConsumer.displayName = "Pagination.Context";

// ── Compound export ────────────────────────────────────────────────────────────

/**
 * Headless pagination primitive. Handles page range calculation and navigation
 * state — bring your own styles via className or use the pre-built variants in
 * `pagination/`.
 *
 * @example
 * ```tsx
 * <Pagination.Root page={page} total={20} onPageChange={setPage}>
 *   <Pagination.PrevTrigger>←</Pagination.PrevTrigger>
 *   <Pagination.Context>
 *     {({ pages }) =>
 *       pages.map((item, i) =>
 *         item.type === "page" ? (
 *           <Pagination.Page key={i} value={item.value} isCurrent={item.isCurrent} />
 *         ) : (
 *           <Pagination.Ellipsis key={i} />
 *         )
 *       )
 *     }
 *   </Pagination.Context>
 *   <Pagination.NextTrigger>→</Pagination.NextTrigger>
 * </Pagination.Root>
 * ```
 */
export const Pagination = {
  Root: PaginationRoot,
  PrevTrigger: PaginationPrevTrigger,
  NextTrigger: PaginationNextTrigger,
  Page: PaginationPage,
  Ellipsis: PaginationEllipsis,
  Context: PaginationContextConsumer,
};
