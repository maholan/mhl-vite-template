"use client";

import { type FC, type JSX, type ReactNode, useState } from "react";

import { User01 } from "@/components/ui/assets";
import { cn } from "@/libs/utils";

import {
  avatarContentVariants,
  avatarIconVariants,
  avatarInitialsVariants,
  avatarRootVariants,
} from "./avatar.variants";
import { AvatarCount, AvatarOnlineIndicator, VerifiedTick } from "./base";

export interface AvatarProps {
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  /**
   * The class name for the inner content wrapper.
   */
  contentClassName?: string;
  src?: string | null;
  alt?: string;
  /**
   * Whether the avatar should be fully rounded (circle).
   * @default true
   */
  rounded?: boolean;
  /**
   * Display an outer border ring around the avatar.
   */
  border?: boolean;
  /**
   * Display a badge (e.g. company logo, custom element).
   */
  badge?: ReactNode;
  /**
   * Display an online/offline status indicator.
   */
  status?: "online" | "offline";
  /**
   * Display a verified tick badge.
   * @default false
   */
  verified?: boolean;
  /**
   * Display a numeric count badge (e.g. unread notifications).
   */
  count?: number;
  /**
   * Initials to display when no image is available.
   */
  initials?: string;
  /**
   * Icon component to display when no image is available.
   */
  placeholderIcon?: FC<{ className?: string }>;
  /**
   * Custom placeholder node to display when no image is available.
   */
  placeholder?: ReactNode;
  /**
   * Show a focus ring when the parent group element receives keyboard focus.
   * Useful when the avatar is nested inside a focusable link or button.
   * @default false
   */
  focusable?: boolean;
}

export const Avatar = ({
  size = "md",
  src,
  alt,
  initials,
  placeholder,
  placeholderIcon: PlaceholderIcon,
  border,
  badge,
  status,
  verified,
  count,
  focusable = false,
  rounded = true,
  className,
  contentClassName,
}: AvatarProps): JSX.Element => {
  const [isFailed, setIsFailed] = useState(false);

  const canShowImage = src !== null && src !== undefined && !isFailed;
  const showContrastBorder = canShowImage && size !== "xs" && size !== "xxs";

  const renderContent = (): JSX.Element | ReactNode => {
    if (canShowImage) {
      return (
        <img
          data-avatar-img
          className="size-full object-cover"
          src={src ?? undefined}
          alt={alt}
          onError={() => setIsFailed(true)}
        />
      );
    }

    if (initials) {
      return <span className={avatarInitialsVariants({ size })}>{initials}</span>;
    }

    if (PlaceholderIcon) {
      return <PlaceholderIcon className={avatarIconVariants({ size })} />;
    }

    return placeholder ?? <User01 className={avatarIconVariants({ size })} />;
  };

  const renderBadge = (): JSX.Element | ReactNode => {
    if (status) {
      return <AvatarOnlineIndicator status={status} size={size} />;
    }

    if (verified) {
      return (
        <VerifiedTick
          size={size}
          className={cn("absolute right-0 bottom-0", size === "xs" && "-right-px -bottom-px")}
        />
      );
    }

    if (count) {
      return <AvatarCount count={count} />;
    }

    return badge ?? null;
  };

  return (
    <div
      data-avatar
      className={cn(avatarRootVariants({ size, rounded, border: !!border, focusable }), className)}
    >
      <div
        className={cn(
          avatarContentVariants({ rounded, withImage: showContrastBorder }),
          contentClassName
        )}
      >
        {renderContent()}
      </div>
      {renderBadge()}
    </div>
  );
};

Avatar.displayName = "Avatar";
