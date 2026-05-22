// ── Payment card brand icons ──────────────────────────────────────────────────
// Simplified SVG mock icons for Visa, Mastercard, Amex, Discover, UnionPay,
// and a generic card fallback.
//
// These are NOT official brand assets — they are design-system mock icons
// intended to be replaced with licensed assets in production.
//
// All icons accept the full HTMLAttributes<HTMLOrSVGElement> interface so they
// are compatible with InputBase's `icon` prop type.
//
// viewBox="0 0 34 24": standard payment logo crop ratio (34 × 24 px).

import React from "react";

// ── Visa ──────────────────────────────────────────────────────────────────────

export function VisaIcon({
  className,
  ...props
}: React.HTMLAttributes<HTMLOrSVGElement>): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 34 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Visa"
      className={className}
      {...(props as React.SVGProps<SVGSVGElement>)}
    >
      {/* Card background */}
      <rect width="34" height="24" rx="4" fill="#1A1F71" />
      {/* "VISA" logotype — simplified italic letterforms */}
      <text
        x="17"
        y="16"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontStyle="italic"
        fontSize="10"
        fill="#FFFFFF"
        letterSpacing="0.5"
      >
        VISA
      </text>
    </svg>
  );
}

VisaIcon.displayName = "VisaIcon";

// ── Mastercard ────────────────────────────────────────────────────────────────

export function MastercardIcon({
  className,
  ...props
}: React.HTMLAttributes<HTMLOrSVGElement>): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 34 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Mastercard"
      className={className}
      {...(props as React.SVGProps<SVGSVGElement>)}
    >
      {/* Card background */}
      <rect width="34" height="24" rx="4" fill="#F9F9F9" />
      <rect width="34" height="24" rx="4" stroke="#E5E5E5" strokeWidth="0.5" />
      {/* Left circle — red */}
      <circle cx="13" cy="12" r="7" fill="#EB001B" />
      {/* Right circle — orange/yellow */}
      <circle cx="21" cy="12" r="7" fill="#F79E1B" />
      {/* Overlap — blend into orange */}
      <path
        d="M17 6.8A7 7 0 0 1 21 12a7 7 0 0 1-4 5.2A7 7 0 0 1 13 12a7 7 0 0 1 4-5.2z"
        fill="#FF5F00"
      />
    </svg>
  );
}

MastercardIcon.displayName = "MastercardIcon";

// ── American Express ──────────────────────────────────────────────────────────

export function AmexIcon({
  className,
  ...props
}: React.HTMLAttributes<HTMLOrSVGElement>): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 34 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="American Express"
      className={className}
      {...(props as React.SVGProps<SVGSVGElement>)}
    >
      {/* Card background */}
      <rect width="34" height="24" rx="4" fill="#2E77BC" />
      {/* "AMEX" text */}
      <text
        x="17"
        y="15"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="7.5"
        fill="#FFFFFF"
        letterSpacing="0.8"
      >
        AMEX
      </text>
    </svg>
  );
}

AmexIcon.displayName = "AmexIcon";

// ── Discover ──────────────────────────────────────────────────────────────────

export function DiscoverIcon({
  className,
  ...props
}: React.HTMLAttributes<HTMLOrSVGElement>): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 34 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Discover"
      className={className}
      {...(props as React.SVGProps<SVGSVGElement>)}
    >
      {/* Card background */}
      <rect width="34" height="24" rx="4" fill="#FFFFFF" />
      <rect width="34" height="24" rx="4" stroke="#E5E5E5" strokeWidth="0.5" />
      {/* Orange sun/circle mark */}
      <circle cx="23" cy="12" r="6" fill="#FF6600" />
      {/* "DISCOVER" text */}
      <text
        x="5"
        y="15"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="5"
        fill="#231F20"
        letterSpacing="0.2"
      >
        DISCOVER
      </text>
    </svg>
  );
}

DiscoverIcon.displayName = "DiscoverIcon";

// ── UnionPay ──────────────────────────────────────────────────────────────────

export function UnionPayIcon({
  className,
  ...props
}: React.HTMLAttributes<HTMLOrSVGElement>): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 34 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="UnionPay"
      className={className}
      {...(props as React.SVGProps<SVGSVGElement>)}
    >
      {/* Three-stripe background: red, red, green */}
      <rect width="34" height="24" rx="4" fill="#E21836" />
      {/* Middle red band */}
      <rect x="10" width="14" height="24" fill="#E21836" />
      {/* Right green band */}
      <rect x="20" width="14" height="24" rx="4" fill="#007B40" />
      {/* "UP" monogram */}
      <text
        x="17"
        y="15"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="8"
        fill="#FFFFFF"
        letterSpacing="0.5"
      >
        UP
      </text>
    </svg>
  );
}

UnionPayIcon.displayName = "UnionPayIcon";

// ── Generic card (unknown/default) ────────────────────────────────────────────

export function GenericCardIcon({
  className,
  ...props
}: React.HTMLAttributes<HTMLOrSVGElement>): React.JSX.Element {
  return (
    <svg
      viewBox="0 0 34 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Card"
      className={className}
      {...(props as React.SVGProps<SVGSVGElement>)}
    >
      {/* Card outline */}
      <rect
        x="1"
        y="1"
        width="32"
        height="22"
        rx="3"
        fill="currentColor"
        fillOpacity="0.05"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
      {/* Magnetic stripe top bar */}
      <rect x="1" y="5" width="32" height="5" fill="currentColor" fillOpacity="0.12" />
      {/* Chip placeholder */}
      <rect x="4" y="13" width="8" height="6" rx="1" fill="currentColor" fillOpacity="0.2" />
      {/* Dots — card number placeholder */}
      <circle cx="18" cy="16" r="1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="22" cy="16" r="1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="26" cy="16" r="1" fill="currentColor" fillOpacity="0.3" />
      <circle cx="30" cy="16" r="1" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

GenericCardIcon.displayName = "GenericCardIcon";
