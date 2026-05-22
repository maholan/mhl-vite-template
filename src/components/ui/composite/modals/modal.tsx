"use client";

import { createContext, useContext, type JSX, type ReactNode, type RefAttributes } from "react";
import {
  Dialog as PrimitiveDialog,
  DialogTrigger as PrimitiveDialogTrigger,
  Heading as PrimitiveHeading,
  Modal as PrimitiveModal,
  ModalOverlay as PrimitiveModalOverlay,
  type DialogProps as PrimitiveDialogProps,
  type DialogTriggerProps as PrimitiveDialogTriggerProps,
  type HeadingProps as PrimitiveHeadingProps,
  type ModalOverlayProps as PrimitiveModalOverlayProps,
} from "react-aria-components";

import { CloseButton, type CloseButtonProps } from "@/components/ui/base/buttons/close-button";
import { cn } from "@/libs/utils";

import {
  modalBodyVariants,
  modalFooterVariants,
  modalHeaderVariants,
  modalOverlayVariants,
  modalPanelVariants,
  type ModalBodyVariantProps,
  type ModalFooterVariantProps,
  type ModalPlacement,
  type ModalScrollBehavior,
  type ModalSize,
} from "./modal.variants";

// ── Context ────────────────────────────────────────────────────────────────────
// Propagates size + placement down to Header / Body / Footer so consumers
// don't need to repeat these props on every sub-component.

interface ModalContextValue {
  size: ModalSize;
  placement: ModalPlacement;
  scrollBehavior: ModalScrollBehavior;
}

const ModalContext = createContext<ModalContextValue>({
  size: "md",
  placement: "center",
  scrollBehavior: "inside",
});

function useModalContext(): ModalContextValue {
  return useContext(ModalContext);
}

// ── ModalTrigger ───────────────────────────────────────────────────────────────

export interface ModalTriggerProps extends PrimitiveDialogTriggerProps {}

/**
 * Controls open/close state of the modal. Wrap both the trigger element and
 * `<Modal.Root>` inside this component. Uncontrolled by default; pass
 * `isOpen` + `onOpenChange` for controlled mode.
 *
 * @example
 * ```tsx
 * <Modal.Trigger>
 *   <Button>Open</Button>
 *   <Modal.Root size="md">
 *     <Modal.Header title="Confirm" />
 *     <Modal.Body>Are you sure?</Modal.Body>
 *     <Modal.Footer><Button slot="close">Cancel</Button></Modal.Footer>
 *   </Modal.Root>
 * </Modal.Trigger>
 * ```
 */
export function ModalTrigger(props: ModalTriggerProps): JSX.Element {
  return <PrimitiveDialogTrigger {...props} />;
}
ModalTrigger.displayName = "Modal.Trigger";

// ── ModalRoot ──────────────────────────────────────────────────────────────────

export interface ModalRootProps
  extends Omit<PrimitiveModalOverlayProps, "className">, RefAttributes<HTMLDivElement> {
  /**
   * Panel width scale.
   * @default "md"
   */
  size?: ModalSize;
  /**
   * Controls where the panel appears in the viewport.
   * `"drawer-right"` / `"drawer-left"` render as a side drawer.
   * @default "center"
   */
  placement?: ModalPlacement;
  /**
   * Whether the inner `Dialog` scrolls (`"inside"`) or the overlay page scrolls (`"outside"`).
   * @default "inside"
   */
  scrollBehavior?: ModalScrollBehavior;
  /** Additional class names applied to the backdrop overlay. */
  overlayClassName?: string;
  /** Additional class names applied to the panel. */
  className?: string;
  /** Content rendered inside the `Dialog` — typically Modal.Header, Modal.Body, Modal.Footer. */
  children: ReactNode;
}

/**
 * The modal root — renders the backdrop overlay, the panel card, and a
 * React Aria `Dialog` that manages focus trapping and ARIA labelling.
 *
 * Must be used inside `<Modal.Trigger>` for open/close state, or rendered with
 * `isOpen` + `onOpenChange` as a controlled modal.
 *
 * @example
 * ```tsx
 * // Uncontrolled — open state managed by Modal.Trigger
 * <Modal.Trigger>
 *   <Button>Open dialog</Button>
 *   <Modal.Root size="lg" placement="center">
 *     <Modal.Header title="Settings" description="Update your account settings." />
 *     <Modal.Body>…</Modal.Body>
 *     <Modal.Footer>
 *       <Button slot="close" color="secondary-gray">Cancel</Button>
 *       <Button color="primary" onPress={handleSave}>Save</Button>
 *     </Modal.Footer>
 *   </Modal.Root>
 * </Modal.Trigger>
 *
 * // Controlled — modal state managed by the parent
 * <Modal.Root isOpen={open} onOpenChange={setOpen} size="sm">
 *   …
 * </Modal.Root>
 *
 * // Drawer
 * <Modal.Root placement="drawer-right" size="sm">…</Modal.Root>
 * ```
 */
export function ModalRoot({
  size = "md",
  placement = "center",
  scrollBehavior = "inside",
  overlayClassName,
  className,
  children,
  ...overlayProps
}: ModalRootProps): JSX.Element {
  return (
    <ModalContext.Provider value={{ size, placement, scrollBehavior }}>
      <PrimitiveModalOverlay
        {...overlayProps}
        className={(state) =>
          cn(
            modalOverlayVariants({ placement }),
            state.isEntering && "animate-in fade-in duration-300 ease-out",
            state.isExiting && "animate-out fade-out duration-200 ease-in",
            overlayClassName
          )
        }
      >
        <PrimitiveModal
          className={(state) =>
            cn(
              modalPanelVariants({ size, placement, scrollBehavior }),
              state.isEntering &&
                (placement === "drawer-right"
                  ? "animate-in slide-in-from-right duration-300 ease-out"
                  : placement === "drawer-left"
                    ? "animate-in slide-in-from-left duration-300 ease-out"
                    : "animate-in zoom-in-95 duration-300 ease-out"),
              state.isExiting &&
                (placement === "drawer-right"
                  ? "animate-out slide-out-to-right duration-200 ease-in"
                  : placement === "drawer-left"
                    ? "animate-out slide-out-to-left duration-200 ease-in"
                    : "animate-out zoom-out-95 duration-200 ease-in"),
              className
            )
          }
        >
          <PrimitiveDialog
            aria-label={undefined}
            className="flex min-h-0 flex-1 flex-col outline-hidden"
          >
            {children}
          </PrimitiveDialog>
        </PrimitiveModal>
      </PrimitiveModalOverlay>
    </ModalContext.Provider>
  );
}
ModalRoot.displayName = "Modal.Root";

// ── ModalHeader ────────────────────────────────────────────────────────────────

export interface ModalHeaderProps {
  /**
   * The modal title — rendered as an `<h2>` and used as the Dialog's
   * accessible name via `aria-labelledby` automatically by React Aria.
   */
  title: ReactNode;
  /**
   * Optional small label rendered above the title in muted tertiary text.
   * Matches Figma's "Optional label" spec (text-xs/regular, text-tertiary).
   */
  label?: ReactNode;
  /**
   * Optional supporting description rendered below the title.
   */
  description?: ReactNode;
  /**
   * Whether to show the built-in close button in the top-right corner.
   * Figma spec: 44×44px, p-8px, rounded-md, absolute right-3 top-3.
   * @default true
   */
  showClose?: boolean;
  /**
   * Props forwarded to the close `<CloseButton>`.
   * Size defaults to `"md"` (44×44px) per Figma spec.
   */
  closeButtonProps?: Omit<CloseButtonProps, "slot">;
  /**
   * Props forwarded to the `<Heading>` element.
   */
  headingProps?: Omit<PrimitiveHeadingProps, "children" | "slot">;
  /**
   * Whether to show the divider line below the header.
   * When `false` the header flows directly into the body (no visual separator).
   * @default true
   */
  showDivider?: boolean;
  /** Additional class names applied to the header container. */
  className?: string;
  /**
   * Optional leading icon or avatar rendered before the title block.
   * Figma spec: 48px circle with bg-success-secondary; pass any ReactNode.
   *
   * @example
   * ```tsx
   * iconSlot={
   *   <div className="flex size-12 items-center justify-center rounded-full bg-success-secondary">
   *     <CheckCircleIcon className="size-6 text-success-primary" />
   *   </div>
   * }
   * ```
   */
  iconSlot?: ReactNode;
}

/**
 * Sticky header at the top of the modal panel. Renders:
 * - Optional `label` (xs/regular, tertiary) above the title
 * - Required `title` as an accessible `<h2>` (React Aria `slot="title"`)
 * - Optional `description` (sm/regular, tertiary) below the title
 * - Optional `iconSlot` (leading icon/avatar)
 * - Built-in 44×44px close button (absolute positioned, top-right)
 * - A 1px divider line below the header (hide with `showDivider={false}`)
 *
 * Figma spec: pt-24px px-24px (desktop) / pt-20px px-16px (mobile).
 * The close button is 44×44px per Figma (`size="md"` on CloseButton).
 *
 * @example
 * ```tsx
 * <Modal.Header
 *   label="Account settings"
 *   title="Delete account"
 *   description="This action cannot be undone."
 *   iconSlot={
 *     <div className="flex size-12 items-center justify-center rounded-full bg-error-secondary">
 *       <TrashIcon className="size-6 text-error-primary" />
 *     </div>
 *   }
 * />
 * ```
 */
export function ModalHeader({
  title,
  label,
  description,
  showClose = true,
  showDivider = true,
  closeButtonProps,
  headingProps,
  className,
  iconSlot,
}: ModalHeaderProps): JSX.Element {
  const { size } = useModalContext();

  return (
    <>
      <div className={cn(modalHeaderVariants({ size }), className)}>
        {/* Leading icon slot — 48px circle per Figma */}
        {iconSlot && <div className="mt-0.5 shrink-0">{iconSlot}</div>}

        {/* Text block: optional label → title → description */}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5 pr-10">
          {label && <p className="text-tertiary text-xs leading-[18px]">{label}</p>}

          <PrimitiveHeading
            {...headingProps}
            slot="title"
            className={cn(
              "text-primary text-base leading-6 font-semibold",
              headingProps?.className
            )}
          >
            {title}
          </PrimitiveHeading>

          {description && <p className="text-tertiary text-sm leading-5">{description}</p>}
        </div>

        {/* Close button — 44×44px absolute per Figma spec */}
        {showClose && (
          <CloseButton
            size="md"
            {...closeButtonProps}
            slot="close"
            className={cn("absolute top-3 right-3 shrink-0", closeButtonProps?.className)}
          />
        )}
      </div>

      {/* Separate divider element — Figma renders this as a sibling, not a border */}
      {showDivider && <hr className="border-primary shrink-0 border-0 border-t" />}
    </>
  );
}

ModalHeader.displayName = "Modal.Header";

// ── ModalBody ──────────────────────────────────────────────────────────────────

export interface ModalBodyProps extends Pick<ModalBodyVariantProps, "noPadding"> {
  children: ReactNode;
  /** Additional class names. */
  className?: string;
}

/**
 * Scrollable body area between the header and footer. Grows to fill available
 * space and clips overflow (when `scrollBehavior="inside"`).
 *
 * Pass `noPadding` for full-bleed content like tables or images.
 *
 * @example
 * ```tsx
 * <Modal.Body>
 *   <p>Are you sure you want to delete this item?</p>
 * </Modal.Body>
 *
 * // Full-bleed table
 * <Modal.Body noPadding>
 *   <DataTable rows={rows} />
 * </Modal.Body>
 * ```
 */
export function ModalBody({ children, className, noPadding }: ModalBodyProps): JSX.Element {
  const { size } = useModalContext();

  return <div className={cn(modalBodyVariants({ size, noPadding }), className)}>{children}</div>;
}

ModalBody.displayName = "Modal.Body";

// ── ModalFooter ────────────────────────────────────────────────────────────────

export interface ModalFooterProps extends Pick<ModalFooterVariantProps, "align"> {
  children: ReactNode;
  /**
   * Whether to show the divider line above the footer.
   * Figma spec: the divider is a separate 1px element, not a CSS border-t.
   * @default true
   */
  showDivider?: boolean;
  /** Additional class names. */
  className?: string;
}

/**
 * Sticky footer at the bottom of the modal panel. Renders a 1px divider above
 * the action row (hide with `showDivider={false}`), then the children.
 *
 * Figma spec: px-24px pb-24px (desktop) / px-16px pb-16px (mobile). No top
 * padding — spacing is handled by the divider element above.
 *
 * Any `<Button slot="close">` placed inside automatically closes the modal via
 * React Aria's DialogTrigger close slot — no extra `onPress` plumbing needed.
 *
 * @example
 * ```tsx
 * <Modal.Footer>
 *   <Button slot="close" color="secondary">Cancel</Button>
 *   <Button color="primary" onPress={handleSubmit}>Confirm</Button>
 * </Modal.Footer>
 *
 * // Destructive — cancel left, delete right
 * <Modal.Footer align="space-between">
 *   <Button slot="close" color="secondary">Cancel</Button>
 *   <Button color="primary-destructive" onPress={handleDelete}>Delete</Button>
 * </Modal.Footer>
 * ```
 */
export function ModalFooter({
  children,
  className,
  align = "right",
  showDivider = true,
}: ModalFooterProps): JSX.Element {
  const { size } = useModalContext();

  return (
    <>
      {showDivider && <hr className="border-primary shrink-0 border-0 border-t" />}
      <div className={cn(modalFooterVariants({ size, align }), className)}>{children}</div>
    </>
  );
}

ModalFooter.displayName = "Modal.Footer";

// ── ModalDialog ────────────────────────────────────────────────────────────────
// Low-level escape hatch: exposes the raw React Aria Dialog for consumers who
// need full control over the inner content structure (e.g., a form that IS the
// dialog, a wizard with its own layout logic).

export interface ModalDialogProps extends PrimitiveDialogProps {
  className?: string;
}

/**
 * Low-level escape hatch — wraps `react-aria-components` `Dialog` with the
 * standard flex column layout. Use this instead of `Modal.Header / Body / Footer`
 * when you need total layout control, e.g. a wizard with its own stepper.
 *
 * @example
 * ```tsx
 * <Modal.Root size="lg">
 *   <Modal.Dialog>
 *     {({ close }) => (
 *       <MyWizard onComplete={close} />
 *     )}
 *   </Modal.Dialog>
 * </Modal.Root>
 * ```
 */
export function ModalDialog({ className, ...props }: ModalDialogProps): JSX.Element {
  return (
    <PrimitiveDialog
      {...props}
      className={cn("flex min-h-0 flex-1 flex-col outline-hidden", className)}
    />
  );
}
ModalDialog.displayName = "Modal.Dialog";

// ── Compound export ────────────────────────────────────────────────────────────

/**
 * Accessible modal dialog built on React Aria's `Dialog` + `Modal` primitives.
 * Handles focus trapping, ARIA labelling, scroll locking, and animations.
 *
 * ## Anatomy
 *
 * ```
 * <Modal.Trigger>
 *   {trigger element}
 *   <Modal.Root size="md" placement="center">
 *     <Modal.Header title="…" description="…" />
 *     <Modal.Body>…</Modal.Body>
 *     <Modal.Footer>
 *       <Button slot="close" color="secondary-gray">Cancel</Button>
 *       <Button color="primary">Confirm</Button>
 *     </Modal.Footer>
 *   </Modal.Root>
 * </Modal.Trigger>
 * ```
 *
 * ## Controlled mode
 *
 * ```tsx
 * const [open, setOpen] = useState(false);
 * <Modal.Root isOpen={open} onOpenChange={setOpen}>…</Modal.Root>
 * ```
 *
 * ## Drawer mode
 *
 * ```tsx
 * <Modal.Root placement="drawer-right" size="sm">…</Modal.Root>
 * ```
 *
 * ## Custom layout (escape hatch)
 *
 * ```tsx
 * <Modal.Root size="xl">
 *   <Modal.Dialog>
 *     {({ close }) => <MyCustomLayout onClose={close} />}
 *   </Modal.Dialog>
 * </Modal.Root>
 * ```
 */
export const Modal = ModalRoot as typeof ModalRoot & {
  displayName?: string;
  /** Alias for `<Modal>` — allows the `Modal.Root` dot-notation form. */
  Root: typeof ModalRoot;
  Trigger: typeof ModalTrigger;
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
  Dialog: typeof ModalDialog;
};

Modal.displayName = "Modal";
Modal.Root = ModalRoot;
Modal.Trigger = ModalTrigger;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Dialog = ModalDialog;
