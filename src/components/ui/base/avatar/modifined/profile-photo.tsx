"use client";

import { type JSX, type ReactNode, useState } from "react";

import { User01 } from "@/components/ui/assets";
import { cn } from "@/libs/utils";

import { type AvatarProps } from "../avatar";
import { AvatarOnlineIndicator, VerifiedTick } from "../base";

const tickSizeMap = {
  sm: "2xl",
  md: "3xl",
  lg: "4xl",
} as const;

interface AvatarProfilePhotoProps extends AvatarProps {
  size: "sm" | "md" | "lg";
}

export const AvatarProfilePhoto = ({
  size = "md",
  src,
  alt,
  initials,
  placeholder,
  placeholderIcon: PlaceholderIcon,
  verified,
  badge,
  status,
  className,
}: AvatarProfilePhotoProps): JSX.Element => {
  const [isFailed, setIsFailed] = useState(false);

  const renderMainContent = (): JSX.Element => {
    if (src && !isFailed) {
      return (
        <div
          className={cn(
            "relative size-full overflow-hidden rounded-full outline-black/16 before:absolute before:inset-0 before:rounded-full before:border-white/32 before:mask-[linear-gradient(to_bottom,black_0%,transparent_25%,transparent_75%,black_100%)]",
            size === "sm" && "outline-[0.5px] -outline-offset-[0.5px] before:border",
            size === "md" &&
              "shadow-xl outline-[0.75px] -outline-offset-[0.75px] before:border-[1.5px]",
            size === "lg" &&
              "shadow-2xl outline-[0.75px] -outline-offset-[0.75px] before:border-[1.5px]"
          )}
        >
          <img
            src={src}
            alt={alt}
            onError={() => setIsFailed(true)}
            className="size-full object-cover"
          />
        </div>
      );
    }

    if (initials) {
      return (
        <div className="bg-tertiary ring-secondary-alt flex size-full items-center justify-center rounded-full ring-1 outline-transparent before:hidden">
          <span
            className={cn(
              "text-quaternary",
              size === "sm" && "text-display-sm font-semibold",
              size === "md" && "text-display-md font-semibold",
              size === "lg" && "text-display-xl font-semibold"
            )}
          >
            {initials}
          </span>
        </div>
      );
    }

    if (PlaceholderIcon) {
      return (
        <div className="bg-tertiary ring-secondary-alt flex size-full items-center justify-center rounded-full ring-1 outline-transparent before:hidden">
          <PlaceholderIcon
            className={cn(
              "text-icon-quaternary",
              size === "sm" && "size-9",
              size === "md" && "size-12",
              size === "lg" && "size-20"
            )}
          />
        </div>
      );
    }

    return (
      <div className="bg-tertiary ring-secondary-alt flex size-full items-center justify-center rounded-full ring-1 outline-transparent before:hidden">
        {placeholder ?? (
          <User01
            className={cn(
              "text-icon-quaternary",
              size === "sm" && "size-9",
              size === "md" && "size-12",
              size === "lg" && "size-20"
            )}
          />
        )}
      </div>
    );
  };

  const badgePositionClass = cn(
    "absolute",
    size === "sm" && "bottom-0.5 right-0.5",
    size === "md" && "bottom-1 right-1",
    size === "lg" && "bottom-2 right-2"
  );

  const renderBadgeContent = (): JSX.Element | ReactNode => {
    if (status) {
      return (
        <AvatarOnlineIndicator
          status={status}
          size={tickSizeMap[size]}
          className={badgePositionClass}
        />
      );
    }

    if (verified) {
      return <VerifiedTick size={tickSizeMap[size]} className={badgePositionClass} />;
    }

    return badge;
  };

  const paddingClass =
    src && !isFailed
      ? cn(size === "sm" && "p-0.75", size === "md" && "p-1", size === "lg" && "p-1.5")
      : cn(size === "sm" && "p-1", size === "md" && "p-1.25", size === "lg" && "p-1.75");

  return (
    <div
      className={cn(
        "bg-primary ring-secondary-alt relative flex shrink-0 items-center justify-center rounded-full ring-1",
        size === "sm" && "size-18",
        size === "md" && "size-24",
        size === "lg" && "size-40",
        paddingClass,
        className
      )}
    >
      {renderMainContent()}
      {renderBadgeContent()}
    </div>
  );
};

AvatarProfilePhoto.displayName = "AvatarProfilePhoto";
