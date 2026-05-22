"use client";

import React from "react";

import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronLeftDouble,
  ChevronRight,
  ChevronRightDouble,
} from "@/components/ui/assets/icons";
import { Button } from "@/components/ui/base/buttons/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/base/buttons/button-group";
import { InputBase } from "@/components/ui/base/input/base-input";
import { Select } from "@/components/ui/base/select/select";
import { cn } from "@/libs/utils";

import {
  paginationButtonGroupWrapperVariants,
  paginationCardWrapperVariants,
  paginationEllipsisVariants,
  paginationMobileLabelVariants,
  paginationPageItemVariants,
  paginationPageRootVariants,
} from "./pagination.variants";
import {
  Pagination,
  type PaginationItem,
  type PaginationRootProps,
} from "../pagination-base/pagination-base";

// ── Types ──────────────────────────────────────────────────────────────────────

interface PaginationVariantProps extends Partial<Omit<PaginationRootProps, "children">> {
  /** Whether page number buttons are pill-shaped. */
  rounded?: boolean;
}

interface PaginationCardMinimalProps {
  page?: number;
  total?: number;
  pageSize?: number;
  align?: "left" | "center" | "right";
  className?: string;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

interface PaginationCardAdvancedProps {
  page?: number;
  total?: number;
  pageSize?: number;
  align?: "space-between" | "center";
  className?: string;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

interface PaginationButtonGroupProps extends Partial<Omit<PaginationRootProps, "children">> {
  align?: "left" | "center" | "right";
}

// ── Shared page-size options ───────────────────────────────────────────────────

const PAGE_SIZE_OPTIONS = [
  { id: 10, label: "10 / page" },
  { id: 25, label: "25 / page" },
  { id: 50, label: "50 / page" },
  { id: 100, label: "100 / page" },
];

// ── Shared trigger classes (secondary icon button — used where Pagination.PrevTrigger/NextTrigger wraps its own button) ──

const triggerIconClass = [
  "inline-flex items-center justify-center rounded-lg p-2",
  "bg-primary text-secondary shadow-xs-skeuomorphic",
  "hover:bg-primary-hover hover:text-secondary-hover transition-all duration-150",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
  "disabled:opacity-50 disabled:pointer-events-none",
].join(" ");

// ── Internal helpers ───────────────────────────────────────────────────────────

function PageItem({
  value,
  isCurrent,
  rounded,
}: {
  value: number;
  isCurrent: boolean;
  rounded?: boolean;
}): React.JSX.Element {
  return (
    <Pagination.Page
      value={value}
      isCurrent={isCurrent}
      className={() => paginationPageItemVariants({ isCurrent, rounded: rounded ?? false })}
    />
  );
}

function PageList({
  pages,
  rounded,
}: {
  pages: PaginationItem[];
  rounded?: boolean;
}): React.JSX.Element {
  return (
    <div className="hidden justify-center gap-0.5 md:flex">
      {pages.map((item, index) =>
        item.type === "page" ? (
          <PageItem key={index} value={item.value} isCurrent={item.isCurrent} rounded={rounded} />
        ) : (
          <Pagination.Ellipsis key={index} className={paginationEllipsisVariants()} />
        )
      )}
    </div>
  );
}

function MobileLabel({
  currentPage,
  total,
}: {
  currentPage: number;
  total: number;
}): React.JSX.Element {
  return (
    <div className={cn(paginationMobileLabelVariants(), "md:hidden")}>
      Page <span className="font-medium">{currentPage}</span> of{" "}
      <span className="font-medium">{total}</span>
    </div>
  );
}

// ── Exports ────────────────────────────────────────────────────────────────────

/**
 * Full-width pagination bar with ghost "Previous / Next" text triggers on desktop,
 * collapsed to secondary icon-only buttons on mobile.
 *
 * @example
 * ```tsx
 * <PaginationPageDefault page={page} total={20} onPageChange={setPage} />
 * ```
 */
export const PaginationPageDefault = ({
  rounded,
  page = 1,
  total = 10,
  className,
  ...props
}: PaginationVariantProps): React.JSX.Element => (
  <Pagination.Root
    {...props}
    page={page}
    total={total}
    className={cn(paginationPageRootVariants({ spacing: "page" }), className)}
  >
    {/* Desktop prev — ghost text + icon */}
    <div className="hidden flex-1 justify-start md:flex">
      <Pagination.PrevTrigger
        className={cn(
          "text-tertiary inline-flex items-center gap-1.5 text-sm font-semibold",
          "hover:text-tertiary-hover transition-all duration-150",
          "focus-visible:ring-brand-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          "disabled:pointer-events-none disabled:opacity-50"
        )}
      >
        <ArrowLeft className="size-5 shrink-0" />
        Previous
      </Pagination.PrevTrigger>
    </div>

    {/* Mobile prev — secondary icon button */}
    <div className="flex flex-1 justify-start md:hidden">
      <Pagination.PrevTrigger className={triggerIconClass} aria-label="Go to previous page">
        <ArrowLeft className="size-5 shrink-0" />
      </Pagination.PrevTrigger>
    </div>

    <Pagination.Context>
      {({ pages, currentPage, total: t }) => (
        <>
          <PageList pages={pages} rounded={rounded} />
          <MobileLabel currentPage={currentPage} total={t} />
        </>
      )}
    </Pagination.Context>

    {/* Desktop next — ghost text + icon */}
    <div className="hidden flex-1 justify-end md:flex">
      <Pagination.NextTrigger
        className={cn(
          "text-tertiary inline-flex items-center gap-1.5 text-sm font-semibold",
          "hover:text-tertiary-hover transition-all duration-150",
          "focus-visible:ring-brand-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          "disabled:pointer-events-none disabled:opacity-50"
        )}
      >
        Next
        <ArrowRight className="size-5 shrink-0" />
      </Pagination.NextTrigger>
    </div>

    {/* Mobile next — secondary icon button */}
    <div className="flex flex-1 justify-end md:hidden">
      <Pagination.NextTrigger className={triggerIconClass} aria-label="Go to next page">
        <ArrowRight className="size-5 shrink-0" />
      </Pagination.NextTrigger>
    </div>
  </Pagination.Root>
);

/**
 * Centered pagination with symmetric secondary "Previous / Next" buttons on both sides.
 *
 * @example
 * ```tsx
 * <PaginationPageMinimalCenter page={page} total={20} onPageChange={setPage} />
 * ```
 */
export const PaginationPageMinimalCenter = ({
  rounded,
  page = 1,
  total = 10,
  className,
  ...props
}: PaginationVariantProps): React.JSX.Element => (
  <Pagination.Root
    {...props}
    page={page}
    total={total}
    className={cn(paginationPageRootVariants({ spacing: "page" }), className)}
  >
    <div className="flex flex-1 justify-start">
      <Button
        color="secondary"
        size="sm"
        iconLeading={ArrowLeft}
        aria-label="Go to previous page"
        isDisabled={page <= 1}
        onPress={() => props.onPageChange?.(page - 1)}
      >
        <span className="hidden md:inline">Previous</span>
      </Button>
    </div>

    <Pagination.Context>
      {({ pages, currentPage, total: t }) => (
        <>
          <PageList pages={pages} rounded={rounded} />
          <MobileLabel currentPage={currentPage} total={t} />
        </>
      )}
    </Pagination.Context>

    <div className="flex flex-1 justify-end">
      <Button
        color="secondary"
        size="sm"
        iconTrailing={ArrowRight}
        aria-label="Go to next page"
        isDisabled={page >= total}
        onPress={() => props.onPageChange?.(page + 1)}
      >
        <span className="hidden md:inline">Next</span>
      </Button>
    </div>
  </Pagination.Root>
);

/**
 * Card-style pagination with secondary "Previous / Next" buttons.
 *
 * @example
 * ```tsx
 * <PaginationCardDefault page={page} total={20} onPageChange={setPage} />
 * ```
 */
export const PaginationCardDefault = ({
  rounded,
  page = 1,
  total = 10,
  className,
  ...props
}: PaginationVariantProps): React.JSX.Element => (
  <Pagination.Root
    {...props}
    page={page}
    total={total}
    className={cn(
      "flex w-full items-center justify-between gap-3",
      paginationPageRootVariants({ spacing: "card" }),
      className
    )}
  >
    <div className="flex flex-1 justify-start">
      <Button
        color="secondary"
        size="sm"
        iconLeading={ArrowLeft}
        aria-label="Go to previous page"
        isDisabled={page <= 1}
        onPress={() => props.onPageChange?.(page - 1)}
      >
        <span className="hidden md:inline">Previous</span>
      </Button>
    </div>

    <Pagination.Context>
      {({ pages, currentPage, total: t }) => (
        <>
          <PageList pages={pages} rounded={rounded} />
          <MobileLabel currentPage={currentPage} total={t} />
        </>
      )}
    </Pagination.Context>

    <div className="flex flex-1 justify-end">
      <Button
        color="secondary"
        size="sm"
        iconTrailing={ArrowRight}
        aria-label="Go to next page"
        isDisabled={page >= total}
        onPress={() => props.onPageChange?.(page + 1)}
      >
        <span className="hidden md:inline">Next</span>
      </Button>
    </div>
  </Pagination.Root>
);

/**
 * Minimal card pagination with page-size selector and optional alignment.
 *
 * @example
 * ```tsx
 * <PaginationCardMinimal page={page} total={20} pageSize={10} onPageChange={setPage} />
 * ```
 */
export const PaginationCardMinimal = ({
  page = 1,
  total = 10,
  pageSize = 10,
  align = "left",
  onPageChange,
  className,
  onPageSizeChange,
}: PaginationCardMinimalProps): React.JSX.Element => (
  <div className={cn(paginationCardWrapperVariants(), className)}>
    {/* Mobile */}
    <nav aria-label="Pagination navigation" className="flex items-center justify-between md:hidden">
      <Button
        color="secondary"
        size="sm"
        iconLeading={ArrowLeft}
        aria-label="Go to previous page"
        isDisabled={page <= 1}
        onPress={() => onPageChange?.(page - 1)}
      />
      <span className="text-secondary text-sm">
        Page <span className="font-medium">{page}</span> of{" "}
        <span className="font-medium">{total}</span>
      </span>
      <Button
        color="secondary"
        size="sm"
        iconLeading={ArrowRight}
        aria-label="Go to next page"
        isDisabled={page >= total}
        onPress={() => onPageChange?.(page + 1)}
      />
    </nav>

    {/* Desktop */}
    <nav
      aria-label="Pagination"
      className={cn("hidden items-center gap-3 md:flex", align === "center" && "justify-between")}
    >
      <div className={cn(align === "center" && "flex flex-1 justify-start")}>
        <Button
          color="secondary"
          size="sm"
          isDisabled={page <= 1}
          onPress={() => onPageChange?.(page - 1)}
        >
          Previous
        </Button>
      </div>

      <div
        className={cn(
          "flex items-center gap-3",
          align === "right" && "order-first mr-auto",
          align === "left" && "order-last ml-auto flex-row-reverse"
        )}
      >
        <span className="text-secondary text-sm font-medium">
          Page {page} of {total}
        </span>
        <Select
          aria-label="Rows per page"
          size="sm"
          selectedKey={pageSize}
          onSelectionChange={(key) => onPageSizeChange?.(Number(key))}
          items={PAGE_SIZE_OPTIONS}
        >
          {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
        </Select>
      </div>

      <div className={cn(align === "center" && "flex flex-1 justify-end")}>
        <Button
          color="secondary"
          size="sm"
          isDisabled={page >= total}
          onPress={() => onPageChange?.(page + 1)}
        >
          Next
        </Button>
      </div>
    </nav>
  </div>
);

/**
 * Button-group-style pagination — all page numbers rendered as a connected strip.
 *
 * @example
 * ```tsx
 * <PaginationButtonGroup page={page} total={20} align="center" onPageChange={setPage} />
 * ```
 */
export const PaginationButtonGroup = ({
  align = "left",
  page = 1,
  total = 10,
  ...props
}: PaginationButtonGroupProps): React.JSX.Element => (
  <div className={paginationButtonGroupWrapperVariants({ align })}>
    <Pagination.Root {...props} page={page} total={total}>
      <Pagination.Context>
        {({ pages }) => (
          <ButtonGroup size="sm">
            <ButtonGroupItem
              id="prev"
              iconLeading={ArrowLeft}
              isDisabled={page <= 1}
              onPress={() => props.onPageChange?.(page - 1)}
            >
              <span className="hidden md:inline">Previous</span>
            </ButtonGroupItem>

            {pages.map((item, index) =>
              item.type === "page" ? (
                <ButtonGroupItem
                  key={index}
                  id={String(item.value)}
                  isSelected={item.isCurrent}
                  onPress={() => props.onPageChange?.(item.value)}
                >
                  {item.value}
                </ButtonGroupItem>
              ) : (
                <ButtonGroupItem
                  key={index}
                  id={`ellipsis-${index}`}
                  className="pointer-events-none"
                >
                  &#8230;
                </ButtonGroupItem>
              )
            )}

            <ButtonGroupItem
              id="next"
              iconTrailing={ArrowRight}
              isDisabled={page >= total}
              onPress={() => props.onPageChange?.(page + 1)}
            >
              <span className="hidden md:inline">Next</span>
            </ButtonGroupItem>
          </ButtonGroup>
        )}
      </Pagination.Context>
    </Pagination.Root>
  </div>
);

/**
 * Advanced card pagination with page-number input, rows-per-page selector,
 * first/last page jump buttons, and optional center or space-between alignment.
 *
 * @example
 * ```tsx
 * <PaginationCardAdvanced
 *   page={page}
 *   total={20}
 *   pageSize={10}
 *   onPageChange={setPage}
 *   onPageSizeChange={setPageSize}
 * />
 * ```
 */
export const PaginationCardAdvanced = ({
  page = 1,
  total = 10,
  pageSize = 10,
  align = "space-between",
  onPageChange,
  className,
  onPageSizeChange,
}: PaginationCardAdvancedProps): React.JSX.Element => (
  <div className={cn(paginationCardWrapperVariants(), className)}>
    <Pagination.Root
      page={page}
      total={total}
      onPageChange={onPageChange}
      className={cn("flex items-center gap-3", align === "center" && "justify-between")}
    >
      {/* Page input — desktop only */}
      <div className="text-secondary hidden items-center gap-2 text-sm font-medium whitespace-nowrap md:flex">
        Page
        <InputBase
          aria-label="Go to page"
          type="number"
          value={String(page)}
          onChange={(val) => {
            const n = Number(val);
            if (n >= 1 && n <= total) onPageChange?.(n);
          }}
          size="md"
          inputClassName="w-14 text-center"
        />
        of {total}
      </div>

      {align !== "center" && <hr className="border-primary mx-1 h-4 w-px border-l max-md:hidden" />}

      {/* Rows per page — desktop only */}
      <div className={cn("hidden items-center gap-2 md:flex", align === "center" && "order-last")}>
        <span className="text-secondary text-sm font-medium whitespace-nowrap">Rows per page</span>
        <Select
          aria-label="Rows per page"
          size="sm"
          selectedKey={pageSize}
          onSelectionChange={(key) => onPageSizeChange?.(Number(key))}
          items={PAGE_SIZE_OPTIONS}
        >
          {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
        </Select>
      </div>

      {/* Nav controls */}
      <div
        className={cn(
          "flex flex-1 items-center gap-4 md:ml-auto md:justify-end",
          align === "center" && "md:justify-center"
        )}
      >
        {/* Prev group */}
        <div className="flex gap-2">
          <Button
            color="secondary"
            size="sm"
            iconLeading={ChevronLeftDouble}
            aria-label="Go to first page"
            isDisabled={page <= 1}
            onPress={() => onPageChange?.(1)}
          />
          <Pagination.PrevTrigger className={triggerIconClass} aria-label="Go to previous page">
            <ChevronLeft className="size-5 shrink-0" />
          </Pagination.PrevTrigger>
        </div>

        {/* Pages + mobile label */}
        <Pagination.Context>
          {({ pages, currentPage, total: t }) => (
            <>
              <div className="hidden justify-center gap-0.5 md:flex">
                {pages.map((item, index) =>
                  item.type === "page" ? (
                    <PageItem key={index} value={item.value} isCurrent={item.isCurrent} />
                  ) : (
                    <Pagination.Ellipsis key={index} className={paginationEllipsisVariants()} />
                  )
                )}
              </div>
              <div className={cn(paginationMobileLabelVariants(), "flex flex-1 md:hidden")}>
                Page <span className="font-medium">{currentPage}</span> of{" "}
                <span className="font-medium">{t}</span>
              </div>
            </>
          )}
        </Pagination.Context>

        {/* Next group */}
        <div className="flex gap-2">
          <Pagination.NextTrigger className={triggerIconClass} aria-label="Go to next page">
            <ChevronRight className="size-5 shrink-0" />
          </Pagination.NextTrigger>
          <Button
            color="secondary"
            size="sm"
            iconLeading={ChevronRightDouble}
            aria-label="Go to last page"
            isDisabled={page >= total}
            onPress={() => onPageChange?.(total)}
          />
        </div>
      </div>
    </Pagination.Root>
  </div>
);
