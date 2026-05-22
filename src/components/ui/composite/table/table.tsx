"use client";

import {
  createContext,
  isValidElement,
  useContext,
  type ComponentPropsWithRef,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
  type Ref,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import {
  Cell as AriaCell,
  Collection as AriaCollection,
  Column as AriaColumn,
  Group as AriaGroup,
  Row as AriaRow,
  Table as AriaTable,
  TableBody as AriaTableBody,
  TableHeader as AriaTableHeader,
  useTableOptions,
  type CellProps as AriaCellProps,
  type ColumnProps as AriaColumnProps,
  type RowProps as AriaRowProps,
  type TableHeaderProps as AriaTableHeaderProps,
  type TableProps as AriaTableProps,
} from "react-aria-components";

import {
  ArrowDown,
  ChevronSelectorVertical,
  Copy01,
  Edit01,
  HelpCircle,
  Trash01,
} from "@/components/ui/assets/icons";
import { Badge } from "@/components/ui/base/badges";
import { Checkbox } from "@/components/ui/base/checkbox/checkbox";
import { Dropdown } from "@/components/ui/base/dropdown/dropdown";
import { Tooltip, TooltipTrigger } from "@/components/ui/base/tooltip/tooltip";
import { cn } from "@/libs/utils";

import {
  tableCardHeaderVariants,
  tableCardRootVariants,
  tableCellVariants,
  tableHeaderCheckboxVariants,
  tableHeaderVariants,
  tableHeadVariants,
  tableRowCheckboxVariants,
  tableRowVariants,
  tableSortIconVariants,
} from "./table.variants";

// ── Context ───────────────────────────────────────────────────────────────────

const TableContext = createContext<{ size: "sm" | "md" } | null>(null);

// ── TableRowActionsDropdown ───────────────────────────────────────────────────

export interface TableRowActionsDropdownProps {
  /** Custom dropdown items. Defaults to Edit / Copy link / Delete. */
  children?: ReactNode;
}

/**
 * Pre-built row actions dropdown (three-dot menu).
 * Renders default Edit / Copy link / Delete items unless `children` is provided.
 *
 * @example
 * ```tsx
 * <TableRowActionsDropdown />
 * <TableRowActionsDropdown>
 *   <Dropdown.Item icon={Edit01}>Rename</Dropdown.Item>
 * </TableRowActionsDropdown>
 * ```
 */
export function TableRowActionsDropdown({ children }: TableRowActionsDropdownProps): JSX.Element {
  return (
    <Dropdown.Root>
      <Dropdown.DotsButton />
      <Dropdown.Popover className="w-min">
        <Dropdown.Menu>
          {children ?? (
            <>
              <Dropdown.Item icon={Edit01}>
                <span className="pr-4">Edit</span>
              </Dropdown.Item>
              <Dropdown.Item icon={Copy01}>
                <span className="pr-4">Copy link</span>
              </Dropdown.Item>
              <Dropdown.Item icon={Trash01}>
                <span className="pr-4">Delete</span>
              </Dropdown.Item>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}

// ── TableCard ─────────────────────────────────────────────────────────────────

export interface TableCardRootProps extends HTMLAttributes<HTMLDivElement> {
  /** Controls spacing density across all child Table components. @default "md" */
  size?: "sm" | "md";
}

/**
 * Card shell that wraps a Table with a header section.
 * Sets the `size` context for all nested Table components.
 *
 * @example
 * ```tsx
 * <TableCard.Root size="sm">
 *   <TableCard.Header title="Users" badge="24" description="Manage your team" />
 *   <Table aria-label="Users">…</Table>
 * </TableCard.Root>
 * ```
 */
export function TableCardRoot({
  children,
  className,
  size = "md",
  ...props
}: TableCardRootProps): JSX.Element {
  return (
    <TableContext.Provider value={{ size }}>
      <div {...props} className={cn(tableCardRootVariants(), className)}>
        {children}
      </div>
    </TableContext.Provider>
  );
}

TableCardRoot.displayName = "TableCard.Root";

export interface TableCardHeaderProps {
  /** The title displayed in the card header. */
  title: string;
  /** Badge rendered next to the title. Accepts a ReactNode or a string/number (auto-wrapped in Badge). */
  badge?: ReactNode;
  /** Subtitle text rendered below the title. */
  description?: string;
  /** Trailing content aligned to the right (e.g. action buttons). */
  contentTrailing?: ReactNode;
  className?: string;
}

export function TableCardHeader({
  title,
  badge,
  description,
  contentTrailing,
  className,
}: TableCardHeaderProps): JSX.Element {
  const context = useContext(TableContext);
  const size = context?.size ?? "md";

  return (
    <div className={cn(tableCardHeaderVariants({ size }), className)}>
      <div className="flex flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <h2 className="text-md text-primary font-semibold">{title}</h2>
          {badge ? (
            isValidElement(badge) ? (
              badge
            ) : (
              <Badge color="gray" size="sm" variant="modern">
                {badge}
              </Badge>
            )
          ) : null}
        </div>
        {description && <p className="text-tertiary text-sm">{description}</p>}
      </div>
      {contentTrailing}
    </div>
  );
}

TableCardHeader.displayName = "TableCard.Header";

export const TableCard = {
  Root: TableCardRoot,
  Header: TableCardHeader,
};

// ── Table root ────────────────────────────────────────────────────────────────

export interface TableRootProps
  extends AriaTableProps, Omit<ComponentPropsWithRef<"table">, "className" | "slot" | "style"> {
  /** Controls spacing density. Falls back to TableCard context if not set. @default "md" */
  size?: "sm" | "md";
}

/**
 * Accessible table built on React Aria. Supports single/multiple row selection,
 * sortable columns, and keyboard navigation.
 *
 * @example
 * ```tsx
 * <Table aria-label="Members" selectionMode="multiple">
 *   <Table.Header>
 *     <Table.Head label="Name" isRowHeader />
 *     <Table.Head label="Role" allowsSorting />
 *   </Table.Header>
 *   <Table.Body>
 *     <Table.Row><Table.Cell>Alice</Table.Cell><Table.Cell>Admin</Table.Cell></Table.Row>
 *   </Table.Body>
 * </Table>
 * ```
 */
export function TableRoot({ className, size = "md", ...props }: TableRootProps): JSX.Element {
  const context = useContext(TableContext);

  return (
    <TableContext.Provider value={{ size: context?.size ?? size ?? "md" }}>
      <div className="overflow-x-auto">
        <AriaTable
          className={(state) =>
            cn(
              "w-full overflow-x-hidden",
              typeof className === "function" ? className(state) : className
            )
          }
          {...props}
        />
      </div>
    </TableContext.Provider>
  );
}

TableRoot.displayName = "Table";

// ── TableHeader ───────────────────────────────────────────────────────────────

export interface TableHeaderProps<T extends object>
  extends
    AriaTableHeaderProps<T>,
    Omit<ComponentPropsWithRef<"thead">, "children" | "className" | "slot" | "style"> {
  /** Renders a bottom border on the header row. @default true */
  bordered?: boolean;
  size?: "sm" | "md";
}

export function TableHeader<T extends object>({
  columns,
  children,
  bordered = true,
  className,
  size: sizeProp,
  ...props
}: TableHeaderProps<T>): JSX.Element {
  const context = useContext(TableContext);
  const { selectionBehavior, selectionMode } = useTableOptions();
  const size = sizeProp ?? context?.size ?? "md";

  return (
    <AriaTableHeader
      {...props}
      className={(state) =>
        cn(
          tableHeaderVariants({ size, bordered }),
          typeof className === "function" ? className(state) : className
        )
      }
    >
      {selectionBehavior === "toggle" && (
        <AriaColumn className={tableHeaderCheckboxVariants({ size })}>
          {selectionMode === "multiple" && (
            <div className="flex items-start">
              <Checkbox slot="selection" size="md" />
            </div>
          )}
        </AriaColumn>
      )}
      <AriaCollection items={columns}>{children}</AriaCollection>
    </AriaTableHeader>
  );
}

TableHeader.displayName = "TableHeader";

// ── TableHead ─────────────────────────────────────────────────────────────────

export interface TableHeadProps
  extends
    AriaColumnProps,
    Omit<ThHTMLAttributes<HTMLTableCellElement>, "children" | "className" | "style" | "id"> {
  /** Column label text rendered as a styled header. */
  label?: string;
  /** Tooltip text shown on a HelpCircle icon next to the label. */
  tooltip?: string;
}

export function TableHead({
  className,
  tooltip,
  label,
  children,
  ...props
}: TableHeadProps): JSX.Element {
  const { selectionBehavior } = useTableOptions();

  return (
    <AriaColumn
      {...props}
      className={(state) =>
        cn(
          tableHeadVariants(),
          selectionBehavior === "toggle" && "nth-2:pl-3",
          state.allowsSorting && "cursor-pointer",
          typeof className === "function" ? className(state) : className
        )
      }
    >
      {(state) => (
        <AriaGroup className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            {label && (
              <span className="text-icon-quaternary text-xs font-semibold whitespace-nowrap">
                {label}
              </span>
            )}
            {typeof children === "function" ? children(state) : children}
          </div>

          {tooltip && (
            <Tooltip title={tooltip} placement="top">
              <TooltipTrigger className="text-icon-quaternary hover:text-icon-quaternary cursor-pointer transition duration-100 ease-linear">
                <HelpCircle className="size-4" />
              </TooltipTrigger>
            </Tooltip>
          )}

          {state.allowsSorting &&
            (state.sortDirection ? (
              <ArrowDown
                className={tableSortIconVariants({
                  direction: state.sortDirection,
                })}
              />
            ) : (
              <ChevronSelectorVertical className="text-icon-quaternary size-3 stroke-[3px]" />
            ))}
        </AriaGroup>
      )}
    </AriaColumn>
  );
}

TableHead.displayName = "TableHead";

// ── TableRow ──────────────────────────────────────────────────────────────────

export interface TableRowProps<T extends object>
  extends
    AriaRowProps<T>,
    Omit<
      ComponentPropsWithRef<"tr">,
      "children" | "className" | "onClick" | "slot" | "style" | "id"
    > {
  /** Applies a background highlight to selected rows. @default true */
  highlightSelectedRow?: boolean;
  size?: "sm" | "md";
}

export function TableRow<T extends object>({
  columns,
  children,
  className,
  highlightSelectedRow = true,
  size: sizeProp,
  ...props
}: TableRowProps<T>): JSX.Element {
  const context = useContext(TableContext);
  const { selectionBehavior } = useTableOptions();
  const size = sizeProp ?? context?.size ?? "md";

  return (
    <AriaRow
      {...props}
      className={(state) =>
        cn(
          tableRowVariants({ size, highlightSelectedRow }),
          typeof className === "function" ? className(state) : className
        )
      }
    >
      {selectionBehavior === "toggle" && (
        <AriaCell className={tableRowCheckboxVariants({ size })}>
          <div className="flex items-end">
            <Checkbox slot="selection" size="md" />
          </div>
        </AriaCell>
      )}
      <AriaCollection items={columns}>{children}</AriaCollection>
    </AriaRow>
  );
}

TableRow.displayName = "TableRow";

// ── TableCell ─────────────────────────────────────────────────────────────────

export interface TableCellProps
  extends
    AriaCellProps,
    Omit<TdHTMLAttributes<HTMLTableCellElement>, "children" | "className" | "style" | "id"> {
  ref?: Ref<HTMLTableCellElement>;
  size?: "sm" | "md";
}

export function TableCell({
  className,
  children,
  size: sizeProp,
  ...props
}: TableCellProps): JSX.Element {
  const context = useContext(TableContext);
  const { selectionBehavior } = useTableOptions();
  const size = sizeProp ?? context?.size ?? "md";

  return (
    <AriaCell
      {...props}
      className={(state) =>
        cn(
          tableCellVariants({ size }),
          selectionBehavior === "toggle" && "nth-2:pl-3",
          typeof className === "function" ? className(state) : className
        )
      }
    >
      {children}
    </AriaCell>
  );
}

TableCell.displayName = "TableCell";

// ── Compound export ───────────────────────────────────────────────────────────

export const Table = TableRoot as typeof TableRoot & {
  Body: typeof AriaTableBody;
  Cell: typeof TableCell;
  Head: typeof TableHead;
  Header: typeof TableHeader;
  Row: typeof TableRow;
};

Table.Body = AriaTableBody;
Table.Cell = TableCell;
Table.Head = TableHead;
Table.Header = TableHeader;
Table.Row = TableRow;
