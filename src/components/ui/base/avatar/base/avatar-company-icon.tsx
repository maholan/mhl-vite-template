"use client";

import { type JSX } from "react";

import { cn } from "@/libs/utils";

const sizes = {
  xs: "size-2",
  sm: "size-3",
  md: "size-3.5",
  lg: "size-4",
  xl: "size-4.5",
  "2xl": "size-5 ring-[1.67px]",
};

interface AvatarCompanyIconProps {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  src: string;
  alt?: string;
}

export const AvatarCompanyIcon = ({ size, src, alt }: AvatarCompanyIconProps): JSX.Element => (
  <img
    src={src}
    alt={alt}
    className={cn(
      "bg-brand-50 ring-bg-primary absolute -right-0.5 -bottom-0.5 rounded-full object-cover ring-[1.5px]",
      sizes[size]
    )}
  />
);

AvatarCompanyIcon.displayName = "AvatarCompanyIcon";
