"use client";

import { type JSX } from "react";

import { cn } from "@/libs/utils";

interface AvatarCountProps {
  count: number;
  className?: string;
}

export const AvatarCount = ({ count, className }: AvatarCountProps): JSX.Element => (
  <div className={cn("absolute right-0 bottom-0 p-px", className)}>
    <div className="bg-error-solid flex size-3.5 items-center justify-center rounded-full text-center text-[10px] leading-[13px] font-bold text-white">
      {count}
    </div>
  </div>
);

AvatarCount.displayName = "AvatarCount";
