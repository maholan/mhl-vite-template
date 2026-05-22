"use client";

import { type JSX, type ReactNode } from "react";

import { cn } from "@/libs/utils";

import { Avatar, type AvatarProps } from "../avatar";

interface ProfilePackProps extends AvatarProps {
  size: "sm" | "md" | "lg";
  rounded?: boolean;
  title: string | ReactNode;
  subtitle: string | ReactNode;
  avatarClassName?: string;
}

export const ProfilePack = ({
  title,
  subtitle,
  className,
  rounded,
  avatarClassName,
  ...props
}: ProfilePackProps): JSX.Element => {
  return (
    <figure className={cn("group flex min-w-0 flex-1 items-center gap-2", className)}>
      <Avatar border rounded={rounded} className={avatarClassName} {...props} />
      <figcaption className="min-w-0 flex-1">
        <p
          className={cn(
            "text-primary font-semibold",
            props.size === "sm" && "text-sm",
            props.size === "md" && "text-sm",
            props.size === "lg" && "text-md"
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            "text-tertiary truncate",
            props.size === "sm" && "text-xs",
            props.size === "md" && "text-sm",
            props.size === "lg" && "text-md"
          )}
        >
          {subtitle}
        </p>
      </figcaption>
    </figure>
  );
};

ProfilePack.displayName = "ProfilePack";
