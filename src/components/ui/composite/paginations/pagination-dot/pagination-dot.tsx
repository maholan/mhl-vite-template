"use client";

import { type JSX } from "react";

import { cn } from "@/libs/utils";

import { Pagination, type PaginationRootProps } from "../pagination-base";
import {
  paginationDotIndicatorVariants,
  paginationDotWrapperVariants,
  paginationLineIndicatorVariants,
  type PaginationDotWrapperVariantProps,
} from "./pagination-dot.variants";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PaginationDotProps
  extends Omit<PaginationRootProps, "children">, PaginationDotWrapperVariantProps {}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Dot/line-style pagination indicator built on `Pagination.Root`.
 * Intended for carousels, slideshows, and image galleries.
 *
 * @example
 * ```tsx
 * // Dot style (default)
 * <PaginationDot page={2} total={5} onPageChange={setPage} />
 *
 * // Line style, large, framed
 * <PaginationDot page={2} total={5} style="Line" size="lg" framed onPageChange={setPage} />
 * ```
 */
export function PaginationDot({
  size = "md",
  style = "Dot",
  framed = false,
  className,
  ...props
}: PaginationDotProps): JSX.Element {
  return (
    <Pagination.Root
      {...props}
      className={cn(paginationDotWrapperVariants({ size, style, framed }), className)}
    >
      <Pagination.Context>
        {({ pages, currentPage, onPageChange }) =>
          pages.map((item, index) => {
            if (item.type !== "page") return null;

            const isCurrent = item.value === currentPage;

            if (style === "Line") {
              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${item.value}`}
                  aria-current={isCurrent ? "true" : undefined}
                  className={paginationLineIndicatorVariants({ size, isCurrent })}
                  onClick={() => onPageChange(item.value)}
                />
              );
            }

            return (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${item.value}`}
                aria-current={isCurrent ? "true" : undefined}
                className={paginationDotIndicatorVariants({ size, isCurrent })}
                onClick={() => onPageChange(item.value)}
              />
            );
          })
        }
      </Pagination.Context>
    </Pagination.Root>
  );
}
