"use client";

import React, { useRef, useState, type ReactNode } from "react";
import { Button as PrimitiveButton } from "react-aria-components";

import { InputGroup } from "@/components/ui/base/input/input-group";
import { cn } from "@/libs/utils";

import {
  inputFileButtonVariants,
  inputFileDisplayPadding,
  inputFileDisplayVariants,
  inputFileSpinnerVariants,
  type InputFileSize,
} from "./input-file.variants";

// ── Types ──────────────────────────────────────────────────────────────────────

export interface InputFileProps {
  /**
   * The size of the input.
   * @default "md"
   */
  size?: InputFileSize;
  /** Label text displayed above the input. */
  label?: string;
  /** Helper / error text displayed below the input. */
  hint?: ReactNode;
  /** Placeholder text when no file is selected. */
  placeholder?: string;
  /** Whether the input is disabled. */
  isDisabled?: boolean;
  /** Whether the input is in an invalid state. */
  isInvalid?: boolean;
  /** Whether the input is required. */
  isRequired?: boolean;
  /** When `true`, suppresses the required indicator on the label. */
  hideRequiredIndicator?: boolean;
  /** Accepted MIME types (e.g. `["image/png", "image/jpeg"]`). */
  acceptedFileTypes?: string[];
  /** Whether multiple files can be selected. */
  allowsMultiple?: boolean;
  /** Whether a file is currently uploading — shows a spinner inside the input. */
  isLoading?: boolean;
  /** Handler called when the user selects files. */
  onSelect?: (files: FileList | null) => void;
  /** Additional CSS class names for the root `InputGroup` wrapper. */
  className?: string;
  /**
   * Text label for the upload button.
   * @default "Upload"
   */
  buttonText?: string;
}

// ── Spinner (internal) ────────────────────────────────────────────────────────

function Spinner({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn("size-4", className)}>
      <circle className="stroke-current opacity-30" cx="8" cy="8" r="6.5" strokeWidth="1.5" />
      <circle
        className="origin-center animate-spin stroke-current"
        cx="8"
        cy="8"
        r="6.5"
        strokeWidth="1.5"
        strokeDasharray="10 40"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Component ──────────────────────────────────────────────────────────────────

/**
 * Accessible file input built on React Aria `FileTrigger`.
 * Renders a read-only text input showing the selected file name(s) alongside
 * a flat Upload button as a trailing addon — matching the Untitled UI
 * "input with trailing button" pattern.
 *
 * Clicking anywhere on the text area also opens the file picker.
 * Supports `md` and `lg` sizes, single/multiple file selection,
 * MIME type filtering, and a loading spinner while an upload is in progress.
 *
 * @example
 * ```tsx
 * <InputFile
 *   label="Resume"
 *   hint="PDF or DOCX, max 5 MB."
 *   acceptedFileTypes={["application/pdf"]}
 *   onSelect={(files) => uploadFile(files?.[0])}
 * />
 * ```
 */
export function InputFile({
  size = "md",
  label,
  hint,
  placeholder = "No file chosen",
  isDisabled,
  isInvalid,
  isRequired,
  hideRequiredIndicator,
  isLoading,
  acceptedFileTypes,
  allowsMultiple,
  onSelect,
  className,
  buttonText = "Upload",
}: InputFileProps): React.JSX.Element {
  const [fileNames, setFileNames] = useState("");
  const fileTriggerRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    setFileNames(
      files && files.length > 0
        ? Array.from(files)
            .map((f) => f.name)
            .join(", ")
        : ""
    );
    onSelect?.(files);
    // Reset so the same file can be re-selected
    e.target.value = "";
  };

  const openPicker = (): void => {
    if (!isDisabled && !isLoading) fileTriggerRef.current?.click();
  };

  return (
    <InputGroup
      size={size}
      label={label}
      hint={hint}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      isRequired={isRequired}
      hideRequiredIndicator={hideRequiredIndicator}
      className={className}
      trailingAddon={
        <PrimitiveButton
          isDisabled={Boolean(isDisabled ?? isLoading)}
          onPress={openPicker}
          className={inputFileButtonVariants()}
        >
          {buttonText}
        </PrimitiveButton>
      }
    >
      {/* Hidden native file input — owned entirely by us, no React Aria intermediary */}
      <input
        ref={fileTriggerRef}
        type="file"
        tabIndex={-1}
        aria-hidden="true"
        accept={acceptedFileTypes?.join(",")}
        multiple={allowsMultiple}
        onChange={handleChange}
        className="sr-only"
      />

      <div
        role="presentation"
        className="relative flex min-w-0 flex-1 items-center"
        onClick={openPicker}
      >
        <input
          readOnly
          disabled={isDisabled}
          required={isRequired}
          placeholder={placeholder}
          value={fileNames}
          className={cn(
            inputFileDisplayVariants(),
            inputFileDisplayPadding[size],
            isLoading && "pr-9"
          )}
        />
        {isLoading && (
          <span className={inputFileSpinnerVariants()}>
            <Spinner />
          </span>
        )}
      </div>
    </InputGroup>
  );
}

InputFile.displayName = "InputFile";
