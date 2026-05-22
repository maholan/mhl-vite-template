"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import React, {
  createContext,
  useContext,
  useId,
  type ComponentPropsWithRef,
  type JSX,
} from "react";

import { HintText } from "@/components/ui/base/input/hint-text";
import { Label as LabelBase } from "@/components/ui/base/input/label";
import { cn } from "@/libs/utils";

import { pinInputSizes, pinInputSlotVariants, type PinInputSize } from "./pin-input.variants";

// ── Context ───────────────────────────────────────────────────────────────────

interface PinInputContextValue {
  size: PinInputSize;
  isDisabled: boolean;
  isInvalid: boolean;
  id: string;
}

const PinInputContext = createContext<PinInputContextValue>({
  size: "md",
  id: "",
  isDisabled: false,
  isInvalid: false,
});

function usePinInputContext(): PinInputContextValue {
  return useContext(PinInputContext);
}

export { usePinInputContext };

// ── Root ──────────────────────────────────────────────────────────────────────

export interface PinInputProps extends ComponentPropsWithRef<"div"> {
  /**
   * Visual size of each digit slot.
   * @default "md"
   */
  size?: PinInputSize;
  /** Disables the entire input. */
  isDisabled?: boolean;
  /** Marks the input as invalid — slots get an error ring. */
  isInvalid?: boolean;
}

/**
 * Accessible OTP / PIN input built on `input-otp`.
 * Compose with `PinInput.Group`, `PinInput.Slot`, `PinInput.Separator`,
 * `PinInput.Label`, and `PinInput.Description`.
 *
 * @example
 * ```tsx
 * <PinInput size="md">
 *   <PinInput.Label>Secure code</PinInput.Label>
 *   <PinInput.Group maxLength={6}>
 *     <PinInput.Slot index={0} />
 *     <PinInput.Slot index={1} />
 *     <PinInput.Slot index={2} />
 *     <PinInput.Separator />
 *     <PinInput.Slot index={3} />
 *     <PinInput.Slot index={4} />
 *     <PinInput.Slot index={5} />
 *   </PinInput.Group>
 *   <PinInput.Description>This is a hint text to help user.</PinInput.Description>
 * </PinInput>
 * ```
 */
function Root({
  className,
  size = "md",
  isDisabled = false,
  isInvalid = false,
  ...props
}: PinInputProps): JSX.Element {
  const id = useId();

  return (
    <PinInputContext.Provider value={{ size, isDisabled, isInvalid, id }}>
      <div role="group" className={cn("flex h-max flex-col gap-1.5", className)} {...props} />
    </PinInputContext.Provider>
  );
}
Root.displayName = "PinInput";

// ── Group ─────────────────────────────────────────────────────────────────────

export type PinInputGroupProps = Omit<ComponentPropsWithRef<typeof OTPInput>, "size" | "render"> & {
  /** Override the OTPInput rendered input className. */
  inputClassName?: string;
  children: React.ReactNode;
};

/**
 * Wraps `OTPInput` — place `PinInput.Slot` components inside.
 */
function Group({
  inputClassName,
  containerClassName,
  maxLength = 4,
  ...props
}: PinInputGroupProps): JSX.Element {
  const { id, size, isDisabled } = usePinInputContext();

  return (
    <OTPInput
      {...props}
      maxLength={maxLength}
      disabled={isDisabled}
      id={`pin-input-${id}`}
      aria-label="Enter your PIN"
      aria-labelledby={`pin-input-label-${id}`}
      aria-describedby={`pin-input-description-${id}`}
      containerClassName={cn(
        "flex flex-row items-center",
        pinInputSizes[size].group,
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", inputClassName)}
    />
  );
}
Group.displayName = "PinInput.Group";

// ── Slot ──────────────────────────────────────────────────────────────────────

export interface PinInputSlotProps extends ComponentPropsWithRef<"div"> {
  /** Zero-based index of this slot within the group. */
  index: number;
}

function Slot({ index, className, ...props }: PinInputSlotProps): JSX.Element {
  const { size, isDisabled, isInvalid } = usePinInputContext();
  const { slots, isFocused } = useContext(OTPInputContext);

  const slot = slots[index];
  const isActive = Boolean(isFocused && slot?.isActive);
  const hasChar = Boolean(slot?.char);
  // isDefault: the slot is idle — not focused, no char, not disabled, not invalid
  const isDefault = !isActive && !hasChar && !isDisabled && !isInvalid;

  return (
    <div
      {...props}
      // Slots are purely visual — the hidden <input> managed by OTPInput is the
      // accessible element. aria-hidden prevents duplicate announcements.
      aria-hidden="true"
      className={cn(
        pinInputSlotVariants({ isActive, hasChar, isDefault, isDisabled, isInvalid }),
        pinInputSizes[size].slot,
        className
      )}
    >
      {hasChar ? slot.char : slot?.hasFakeCaret ? <FakeCaret size={size} /> : <span>0</span>}
    </div>
  );
}
Slot.displayName = "PinInput.Slot";

// ── FakeCaret (internal) ──────────────────────────────────────────────────────

function FakeCaret({ size }: { size: PinInputSize }): JSX.Element {
  return (
    <div
      className={cn(
        "animate-caret-blink bg-brand-primary pointer-events-none h-[1em] w-0.5",
        pinInputSizes[size].caret
      )}
      aria-hidden="true"
    />
  );
}

// ── Separator ─────────────────────────────────────────────────────────────────

export type PinInputSeparatorProps = ComponentPropsWithRef<"div">;

/**
 * Visual separator between slot groups (renders a `-` dash).
 * Typically used to split a 6-digit code into two groups of 3.
 */
function Separator({ className, children, ...props }: PinInputSeparatorProps): JSX.Element {
  const { size } = usePinInputContext();

  return (
    <div
      role="separator"
      aria-hidden="true"
      {...props}
      className={cn(
        "text-placeholder-subtle flex items-center justify-center font-medium",
        pinInputSizes[size].separator,
        className
      )}
    >
      {children ?? "-"}
    </div>
  );
}
Separator.displayName = "PinInput.Separator";

// ── Label ─────────────────────────────────────────────────────────────────────

export type PinInputLabelProps = ComponentPropsWithRef<typeof LabelBase>;

function Label(props: PinInputLabelProps): JSX.Element {
  const { id } = usePinInputContext();
  return <LabelBase {...props} htmlFor={`pin-input-${id}`} id={`pin-input-label-${id}`} />;
}
Label.displayName = "PinInput.Label";

// ── Description ───────────────────────────────────────────────────────────────

export type PinInputDescriptionProps = ComponentPropsWithRef<typeof HintText>;

function Description({ className, ...props }: PinInputDescriptionProps): JSX.Element {
  const { id } = usePinInputContext();
  return <HintText {...props} id={`pin-input-description-${id}`} className={className} />;
}
Description.displayName = "PinInput.Description";

// ── Compound export ───────────────────────────────────────────────────────────

export const PinInput = Object.assign(Root, {
  Group,
  Slot,
  Separator,
  Label,
  Description,
});
